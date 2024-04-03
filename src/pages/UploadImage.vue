<template>
  <div>
    <div v-for="(upload, index) in uploads" :key="index">
      <img :src="getImageUrl(upload.file_path)" :alt="'Uploaded Image ' + index">
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Importe o Axios corretamente

export default {
  data() {
    return {
      uploads: []
    };
  },
  mounted() {
    this.fetchDataFromBackend();
  },
  methods: {
    async fetchDataFromBackend() {
      try {
        const response = await axios.get('/api/uploads');
        this.uploads = response.data; // Atribua os dados à variável uploads
      } catch (error) {
        console.error('Erro ao buscar dados do backend:', error);
        // Adicione uma mensagem de erro para o usuário, se necessário
      }
    },
    getImageUrl(filePath) {
      return `${window.location.origin}/uploads/${fil_ePath}`;
    }
  },
};
</script>
