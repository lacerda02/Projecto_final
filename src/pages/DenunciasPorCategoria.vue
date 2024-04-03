<template>
  <div class="denuncia-form-container">
    <h2>Fazer Denúncia</h2>
    <form @submit.prevent="submitDenuncia" class="denuncia-form">
      <!-- Campos do formulário -->
      <div class="form-group">
        <label for="denuncia">Podes ver as denuncias com filtro</label>
        <select v-model="denuncia.denunciaId" @change="updateDescricao" required>
          <option v-for="denuncia in denuncias" :key="denuncia.id" :value="denuncia.id">
            {{ denuncia.tipo }}
          </option>
        </select>
      </div>

      <!-- Exibir o campo de descrição apenas se houver uma descrição disponível -->
      <div class="form-group" v-if="denuncia.descricao !== null">
        <label for="descricao">Descrição</label>
        <textarea v-model="denuncia.descricao" disabled></textarea>
      </div>


    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      denuncia: {
        denunciaId: '',
        descricao: null, // Inicialmente configurado como nulo
        numero: '',
        anexo: '',
      },
      denuncias: [],
    };
  },
  methods: {
    async fetchdenuncias() {
      try {
        const response = await axios.get('http://localhost:3000/api/denuncias');
        this.denuncias = response.data;
        console.log('denuncias:', this.denuncias);
      } catch (error) {
        console.error('Erro ao buscar denuncias:', error);
      }
    },
    updateDescricao() {
      // Encontre a denúncia correspondente ao ID selecionado
      const denunciaSelecionada = this.denuncias.find(d => d.id === this.denuncia.denunciaId);

      // Atualize a descrição
      this.denuncia.descricao = denunciaSelecionada ? denunciaSelecionada.descricao : null;
    },
    submitDenuncia() {
      // Se desejar, você pode usar this.denuncia.descricao no envio da denúncia
    },
  },
  mounted() {
    this.fetchdenuncias();
    console.log('Componente montado. denuncias:', this.denuncias);
  },
};
</script>

<style scoped>
/* Estilos específicos para o componente DenunciaForm.vue */

.denuncia-form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.denuncia-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

select,
textarea,
input,
button {
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
