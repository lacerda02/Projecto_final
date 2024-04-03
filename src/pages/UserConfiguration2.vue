<!-- Configuracoes.vue -->
<template>
  <div class="configuracoes-container">
    <h2>Configurações</h2>
    <form @submit.prevent="salvarConfiguracoes">
      <div class="campo-foto">
        <label for="fotoPerfil">Foto de Perfil:</label>
        <input type="file" id="fotoPerfil" @change="handleFotoChange" accept="image/*">
        <img v-if="configuracoes.fotoPerfil" :src="configuracoes.fotoPerfil" alt="Foto de Perfil" class="img-foto-perfil">
      </div>

      <label for="nome">Nome:</label>
      <input type="text" v-model="configuracoes.nome" id="nome">

      <label for="email">E-mail:</label>
      <input type="email" v-model="configuracoes.email" id="email">

      <div class="campo-tema">
      <label>Tema:</label>
      <select v-model="configuracoes.tema" @change="alterarTema">
        <option value="claro">Claro</option>
        <option value="escuro">Escuro</option>
      </select>
    </div>

      <!-- Adicione mais campos conforme necessário -->

      <button type="submit">Salvar Configurações</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      configuracoes: {
        fotoPerfil: '', // URL da foto de perfil
        nome: '',
        email: '',
        tema: 'claro', // Pode ser 'claro' ou 'escuro'
        // Adicione mais campos conforme necessário
      },
    };
  },
  methods: {
    salvarConfiguracoes() {
      // Lógica para salvar as configurações no servidor ou em algum armazenamento local
      console.log('Configurações salvas:', this.configuracoes);
    },
    handleFotoChange(event) {
      // Lógica para lidar com a mudança da foto de perfil
      const file = event.target.files[0];
      if (file) {
        // Realize o upload da foto para o servidor ou converta para base64 e atribua à propriedade 'fotoPerfil'
        // Exemplo: this.configuracoes.fotoPerfil = URL.createObjectURL(file);
      }
    },
    alterarTema() {
      const body = document.body;

      // Remova a classe existente (se houver)
      body.classList.remove('tema-claro', 'tema-escuro');

      // Adicione a classe do tema selecionado
      body.classList.add(`tema-${this.configuracoes.tema}`);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para o componente Configuracoes.vue */

.configuracoes-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.img-foto-perfil {
  max-width: 100%;
  max-height: auto;
  border-radius: 50%;
  margin-top: 10px;
}

button {
  background-color: #5bc0de; /* Cor azul para indicar salvar configurações */
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #46b8da;
}

.campo-foto {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.campo-foto img {
  margin-top: 10px;
  border-radius: 50%;
}

.campo-tema {
  display: flex;
  align-items: center;
}

@media (max-width: 480px) {
  /* Estilos específicos para telas menores que 480px */
  .configuracoes-container {
    padding: 10px;
  }

  input,
  select {
    width: 100%;
  }
}
</style>
