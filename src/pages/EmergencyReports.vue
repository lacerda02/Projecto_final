<!-- DenunciasDeEmergencia.vue -->
<template>
  <div class="denuncias-de-emergencia-container">
    <h2>Denúncias de Emergência</h2>
    <form @submit.prevent="submitDenunciaDeEmergencia">
      <!-- Campos do formulário -->
      <label for="categoria">Que tipo de Denúncia É:</label>
      <input type="text" v-model="denuncia.categoria" required>

      <label for="descricao">Descrição:</label>
      <textarea v-model="denuncia.descricao" required></textarea>

      <label for="localizacao">Localização:</label>
      <input type="text" v-model="denuncia.localizacao" required>

      <button type="submit">Enviar Denúncia de Emergência</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      denuncia: {
        categoria: '',
        descricao: '',
        localizacao: '',
      },
    };
  },
  methods: {
    submitDenunciaDeEmergencia() {
      // Lógica para enviar denúncia de emergência ao servidor
      console.log('Denúncia de Emergência enviada:', this.denuncia);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para o componente DenunciasDeEmergencia.vue */

.denuncias-de-emergencia-container {
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
textarea,
button {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

button {
  background-color: #d9534f; /* Cor vermelha para indicar emergência */
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #c9302c;
}
</style>
