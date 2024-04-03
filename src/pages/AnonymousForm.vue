<template>
  <div class="anonymou-form-container">
    <h2>Fazer Denúncia Anônima</h2>
    <form @submit.prevent="submitanonymou" class="anonymou-form">
      <!-- Campos do formulário -->
      <div class="form-group">
        <label for="type">Que tipo de Denúncia É</label>
        <input type="text" v-model="anonymou.type" required placeholder="Ex: crime, roubo, violação">
      </div>

      <div class="form-group">
        <label for="description">Fale mais sobre o que aconteceu...</label>
        <textarea v-model="anonymou.description" required></textarea>
      </div>

      <!-- Remova a seção do anexo por enquanto -->
      <div class="form-group">
        <label for="anexo">Tens alguma foto? Envia aqui...</label>
        <br>
        <input type="file" @change="handleFileUpload">
      </div>

      <button type="submit" class="submit-button">Enviar Denúncia</button>
    </form>
   
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      anonymou: {
        type: '',
        description: '',
        anexo: null, // Use null para representar nenhum arquivo selecionado
      },
    };
  },
  methods: {
    async submitanonymou() {
      try {
        if (!this.isValidanonymou()) {
          console.error('Por favor, preencha todos os campos corretamente.');
          return;
        }

        const formData = new FormData();
        Object.keys(this.anonymou).forEach((key) => {
          formData.append(key, this.anonymou[key]);
        });

        const response = await axios.post('http://localhost:3001/api/anonymous', formData);

        console.log('Denúncia criada com sucesso:', response.data);
        this.$q.notify({
          type: 'positive',
          message: 'Denúncia feita.'
        })

        this.cancelAddanonymou();
      } catch (error) {
        console.error('Erro ao criar denúncia:', error);
      }
    },
    handleFileUpload(event) {
      // Atribua o primeiro arquivo do evento ao campo 'anexo'
      this.anonymou.anexo = event.target.files[0];
    },
    cancelAddanonymou() {
      this.anonymou = { type: '', description: '', number: '', anexo: '' };
    },
    isValidanonymou() {
      return (
        this.anonymou.type.trim() &&
        this.anonymou.description.trim()
      );
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para o componente anonymouForm.vue */

.anonymou-form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.anonymou-form {
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

button, router-link {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
}

button:hover, router-link:hover {
  background-color: #0056b3;
}
</style>
