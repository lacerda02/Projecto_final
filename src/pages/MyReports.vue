<template>
  <div class="minhas-denuncias-container">
    <h2>Minhas Denúncias</h2>

    <!-- Adicionado campo de filtro por tipo de denúncia -->
    <div class="filter-container">
      <label for="filtroTipo">Filtrar por Tipo:</label>
      <select v-model="filtroTipo">
        <option value="">Todos</option>
        <option v-for="tipo in tiposDenuncia" :key="tipo">{{ tipo }}</option>
      </select>
    </div>

    <div v-if="denunciasFiltradas.length > 0">
      <table>
        <thead>
          <tr>
            <th>Tipo de Denúncia</th>
            <th>Descrição</th>
            <th>Imagem</th>
            <th>Ações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="denuncia in denunciasFiltradas" :key="denuncia.id">
            <td>{{ denuncia.type }}</td>
            <td>{{ denuncia.description }}</td>
            <td>
              <img
                v-if="denuncia.anexo"
                :src="denuncia.anexo[0]"
                alt="Imagem da Denúncia"
                style="max-width: 100px; max-height: 100px;"
              />
              <span v-else>Nenhuma imagem</span>
            </td>
            <td>
              <button @click="deleteDenuncia(denuncia.id)">Excluir</button>
              <button v-if="denuncia.anexo" @click="downloadImage(denuncia.anexo[0])">Baixar</button>
            </td>
            <td>
              <button @click="showDenunciaDetails(denuncia)" class="button-andamento">Andamento</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Nenhuma denúncia correspondente aos filtros selecionados.</p>
    </div>

    <!-- Modal de Detalhes da Denúncia -->
   <q-dialog v-model="modalVisible" persistent>
  <q-card>
    <q-card-section>
      <div class="modal-title">{{ modalDenuncia.type }}</div>
      <div class="modal-description">{{ modalDenuncia.description }}</div>
      <div class="modal-inputs">
        <q-input filled label="Adicionar Comentário" v-model="comentario" />
      </div>
      <!-- Adicione mais campos conforme necessário -->
      <div v-if="modalDenuncia.progressDetails">
        <h3>Detalhes de Andamento:</h3>
        <ul>
          <li v-for="(detail, index) in modalDenuncia.progressDetails" :key="index">{{ detail }}</li>
        </ul>
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn label="Fechar" color="primary" @click="modalVisible = false" />
      <q-btn label="Salvar" color="primary" @click="saveDetails" />
    </q-card-actions>
  </q-card>
</q-dialog>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      denuncias: [],
      tiposDenuncia: [],
      filtroTipo: '',
      modalVisible: false,
      modalDenuncia: {},
      comentario: '',
    
    };
  },
  computed: {
    denunciasFiltradas() {
      return this.denuncias.filter(denuncia => {
        if (this.filtroTipo && denuncia.tipo !== this.filtroTipo) {
          return false;
        }
        return true;
      });
    },
  },
  mounted() {
    this.fetchDenuncias();
  },
  methods: {
    async fetchDenuncias() {
      try {
        const response = await axios.get('http://localhost:3001/api/reports');
        this.denuncias = response.data.map(denuncia => {
          denuncia.anexo = denuncia.anexo ? [denuncia.anexo] : [];
          return denuncia;
        });

        this.tiposDenuncia = [...new Set(this.denuncias.map(denuncia => denuncia.tipo))];
      } catch (error) {
        console.error('Erro ao buscar denúncias:', error);
      }
    },
    
    async deleteDenuncia(id) {
      // Lógica para excluir denúncia
    },
    async downloadImage(id) {
      // Lógica para baixar imagem
    },
    showDenunciaDetails(denuncia) {
      this.modalDenuncia = denuncia;
      this.modalVisible = true;
    },
    async saveDetails() {
      try {
        // Enviar os detalhes para o servidor
        await axios.post('http://localhost:3001/api/progress_details', {
          report_id: this.modalDenuncia.id,
          comment: this.comentario,
          
        });

        // Fechar o modal após salvar
        this.modalVisible = false;
        // Limpar os campos do modal
        this.comentario = '';
     
      } catch (error) {
        console.error('Erro ao salvar detalhes de andamento:', error);
      }
    },
    
  },
};
</script>


<style scoped>
.minhas-denuncias-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.button-andamento {
  background-color: #28a745;
}

.button-andamento:hover {
  background-color: #218838;
}

.modal-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-description {
  margin-bottom: 20px;
}

.modal-inputs {
  margin-bottom: 20px;
}

</style>
