const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Pasta onde os arquivos serão temporariamente armazenados
const fs = require('fs');
const mime = require('mime');
const path = require('path');


const app = express();
const port = 3001;
app.use(express.json()); // Para analisar dados JSON
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'denuncia',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ' + err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Defina a função queryDatabase
const queryDatabase = async (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

app.get('/api/users', async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const rows = await queryDatabase(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching user items:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new user
app.post('/api/users', (req, res) => {
  const { username, name, email, password } = req.body
  console.log('Received request to create user:', { username, name, email, password })

  const query = 'INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?)'
  db.query(query, [username, name, email, password], (err, result) => {
    if (err) {
      console.error('Error creating user:', err)
      res.status(500).send('Error creating user')
    } else {
      console.log('User created successfully:', { username, name, email })
      res.status(201).send('User created successfully')
    }
  })
})

// Delete a user item
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id
  const query = 'DELETE FROM users WHERE id = ?'
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err)
      res.status(500).send('Error deleting user')
    } else {
      res.send('User deleted successfully')
    }
  })
})

// Update a user item
app.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const { username, name, email, password } = req.body

  console.log('Received request to update user:', { id, username, name, email })

  const query = 'UPDATE users SET username = ?, name = ?, email = ?, password = ? WHERE id = ?'
  db.query(query, [username, name, email, password, id], (err, result) => {
    if (err) {
      console.error('Error updating user:', err)
      res.status(500).send('Error updating user')
    } else {
      console.log('User updated successfully:', { id, username, name, email })
      res.send('User updated successfully')
    }
  })
})

// Rota para autenticação (login)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // Consulta o banco de dados para verificar as credenciais
    const query = 'SELECT * FROM user2s WHERE username = ? AND password = ?'
    const result = await queryDatabase(query, [username, password])

    if (result.length > 0) {
      // Credenciais válidas, usuário autenticado
      res.json({ success: true, message: 'Login bem-sucedido' })
    } else {
      // Credenciais inválidas
      res.status(401).json({ success: false, message: 'Nome de usuário ou senha incorretos' })
    }
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ success: false, message: 'Erro durante o login' })
  }
})

// Rota para obter todas as categorias
app.get('/api/categorias', async (req, res) => {
  try {
    const query = 'SELECT id, nome FROM categorias'; // Seleciona id e nome
    const rows = await queryDatabase(query);
    res.json(rows); // Retorna todas as linhas da tabela de categorias
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).send('Erro ao buscar categorias');
  }
});

// Rota para obter todas as imagens carregadas
app.get('/api/images', async (req, res) => {
  try {
    const query = 'SELECT file_path FROM upload'; // Seleciona o caminho dos arquivos de imagem
    const rows = await queryDatabase(query);
    res.json(rows); // Retorna todos os caminhos dos arquivos de imagem
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    res.status(500).send('Erro ao buscar imagens');
  }
});


// Rota para obter todas as denúncias
app.get('/api/reports', async (req, res) => {
  try {
    const query = 'SELECT id, description, type, anexo FROM reports'; // Adicione 'anexo' à consulta
    const rows = await queryDatabase(query);

    // Adicione o cabeçalho Content-Type para indicar o type MIME da resposta
    res.setHeader('Content-Type', 'application/json');
    res.json(rows); // Retorna todas as linhas da tabela de denuncias
  } catch (error) {
    console.error('Erro ao buscar denuncias:', error);
    res.status(500).send('Erro ao buscar denuncias');
  }
});

// Rota para obter uma imagem específica
app.get('/api/reports', (req, res) => {
  try {
    const filePath = path.join(__dirname, req.params.filename);

    // Adicione o cabeçalho Content-Type para indicar o type MIME da resposta
    res.setHeader('Content-Type', mime.getType(filePath));

    // Envie o arquivo como resposta
    res.sendFile(filePath);
  } catch (error) {
    console.error('Erro ao buscar imagem:', error);
    res.status(500).send('Erro ao buscar imagem');
  }
});

// Endpoint para excluir denúncia
app.delete('/api/denuncias/:id', (req, res) => {
  const id = req.params.id;
  console.log('ID a ser excluído:', id);

  const sql = 'DELETE FROM reports WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Erro ao excluir denúncia:', err);
      res.status(500).send('Erro ao excluir denúncia');
      return;
    }

    if (result.affectedRows === 0) {
      console.log('Nenhuma linha afetada. ID não encontrado.');
      res.status(404).send('Denúncia não encontrada');
      return;
    }

    console.log('Denúncia excluída com sucesso!');
    res.send('Denúncia excluída com sucesso!');
  });
});



// app.post('/api/denuncias', async (req, res) => {
//   try {
//     console.log('Dados da solicitação:', req.body); // Adicione esta linha para depuração

//     const { type, description, number, anexo } = req.body;

//     if (!type || !description || !number || !anexo) {
//       return res.status(400).json({ success: false, error: 'Parâmetros incompletos' });
//     }

//     // Execute uma consulta SQL para inserir a denúncia na tabela
//     const result = await queryDatabase(
//       'INSERT INTO denuncias (type, description, number, anexo) VALUES (?, ?, ?, ?)',
//       [type, description, number, anexo]
//     );

//     // Envie uma resposta ao cliente
//     res.json({ success: true, id: result.insertId });
//   } catch (error) {
//     console.error('Erro ao criar denúncia:', error);
//     res.status(500).json({ success: false, error: 'Erro interno do servidor' });
//   }
// });

// Create a new denuncia
// app.post('/api/denuncias', (req, res) => {
//   const { type, description, number, anexo} = req.body
//   console.log('Received request to create user:', { type, description, number, anexo})

//   const query = 'INSERT INTO denuncias (type, description, number, anexo) VALUES (?, ?, ?, ?)'
//   db.query(query, [type, description, number, number], (err, result) => {
//     if (err) {
//       console.error('Error creating denuncia:', err)
//       res.status(500).send('Error creating denunicia')
//     } else {
//       console.log('User created successfully:', { type, description, number })
//       res.status(201).send('denuncia created successfully')
//     }
//   })
// })

// Rota de inserção
app.post('/api/reports', upload.single('anexo'), async (req, res) => {
  try {
    console.log('Dados da solicitação:', req.body);

    const { type, description, number } = req.body;
    const anexo = req.file ? req.file.path : null;

    // Verifique se os campos obrigatórios estão presentes
    if (!type || !description || !number) {
      return res.status(400).json({ success: false, error: 'Parâmetros incompletos' });
    }

    // Execute a consulta SQL para inserir a denúncia na tabela
    const result = await db.query(
      'INSERT INTO reports (type, description, number, anexo) VALUES (?, ?, ?, ?)',
      [type, description, number, anexo]
    );

    // Envie o caminho completo do arquivo como resposta ao cliente
    res.json({ success: true, id: result.insertId, imagePath: anexo });
  } catch (error) {
    console.error('Erro ao criar denúncia:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Rota para inserir detalhes de andamento
app.post('/api/progress_details', (req, res) => {
  try {
    // Extrair os dados dos detalhes de andamento do corpo da solicitação
    const { report_id, comment } = req.body;

    // Verificar se todos os campos obrigatórios estão presentes
    if (!report_id || !comment) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Execute a consulta SQL para inserir os detalhes de andamento na tabela
    const query = 'INSERT INTO progress_details (report_id, comment) VALUES (?, ?)';
    db.query(query, [report_id, comment], (err, result) => {
      if (err) {
        console.error('Error adding progress details:', err);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
      // Envie uma resposta de sucesso com o ID do detalhe de andamento recém-inserido
      res.status(201).json({ success: true, id: result.insertId });
    });
  } catch (error) {
    console.error('Error adding progress details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/progress_details/:id', (req, res) => {
  try {
    const id = req.params.id;

    const query = 'SELECT * FROM progress_details WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error fetching progress details:', err);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }

      // Aqui você deve buscar os detalhes do relatório (report) e do comentário (comment) com base no id retornado da consulta

      const progressDetails = {
        report:  '' , /* Detalhes do relatório */
        comment: '',/* Detalhes do comentário */
      };

      res.status(200).json({ success: true, progressDetails });
    });
  } catch (error) {
    console.error('Error fetching progress details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



app.post('/api/anonymous', upload.single('anexo'), async (req, res) => {
  try {
    console.log('Dados da solicitação:', req.body);

    const { type, description, } = req.body;
    const anexo = req.file ? req.file.path : null;

    // Execute a consulta SQL para inserir a denúncia na tabela
    const result = await db.query(
      'INSERT INTO anonymouses (type, description, anexo) VALUES (?, ?, ?)',
      [type, description, anexo]
    );

    // Envie uma resposta ao cliente
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Erro ao criar anonimos:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});



//


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
