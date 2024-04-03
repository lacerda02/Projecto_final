<!-- FeedbackMelhorias.vue -->
<template>
  <div class="feedback-melhorias-container">
    <h2>Feedback e Melhorias</h2>
    <form @submit.prevent="enviarFeedback">
      <label for="feedback">Dê seu feedback:</label>
      <textarea v-model="feedback" id="feedback" rows="4"></textarea>

      <label for="sugestoes">Sugestões de Melhoria:</label>
      <textarea v-model="sugestoes" id="sugestoes" rows="4"></textarea>

      <button type="submit">Enviar Feedback e Sugestões</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedback: '',
      sugestoes: '',
    };
  },
  methods: {
    enviarFeedback() {
      // Lógica para enviar feedback e sugestões ao servidor
      console.log('Feedback enviado:', this.feedback);
      console.log('Sugestões enviadas:', this.sugestoes);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para o componente FeedbackMelhorias.vue */

.feedback-melhorias-container {
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

textarea {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
}

button {
  background-color: #5bc0de; /* Cor azul para indicar enviar feedback */
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #46b8da;
}
</style>
