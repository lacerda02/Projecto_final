<template>
  <div class="report-form-container">
    <h2>Fazer Denúncia</h2>
    <form @submit.prevent="submitreport" class="report-form">
      <!-- Campos do formulário -->
      <div class="form-group">
        <label for="type">Que tipo de Denúncia É</label>
        <input type="text" v-model="report.type" required placeholder="Ex: Crime, Assedio, Roubo...">
      </div>

      <div class="form-group">
        <label for="description">Fale mais sobre o que aconteceu...</label>
        <textarea v-model="report.description" required></textarea>
      </div>

      <div class="form-group">
        <label for="number">Número:</label>
        <input type="text" v-model="report.number" required>
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
      report: {
        type: '',
        description: '',
        number: '',
        anexo: null, // Use null para representar nenhum arquivo selecionado
      },
    };
  },
  methods: {
    async submitreport() {
      try {
        if (!this.isValidreport()) {
          console.error('Por favor, preencha todos os campos corretamente.');
          return;
        }

        const formData = new FormData();
        Object.keys(this.report).forEach((key) => {
          formData.append(key, this.report[key]);
        });

        const response = await axios.post('http://localhost:3001/api/reports', formData);

        console.log('Denúncia criada com sucesso:', response.data);
        this.$q.notify({
          type: 'positive',
          message: 'A sua Denúncia esta sendo processada.'
        })

        this.cancelAddreport();
      } catch (error) {
        console.error('Erro ao criar denúncia:', error);
      }
    },
    handleFileUpload(event) {
      // Atribua o primeiro arquivo do evento ao campo 'anexo'
      this.report.anexo = event.target.files[0];
    },
    cancelAddreport() {
      this.report = { type: '', description: '', number: '', anexo: '' };
    },
    isValidreport() {
      return (
        this.report.type.trim() &&
        this.report.description.trim() &&
        this.report.number.trim() 
      );
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para o componente reportForm.vue */

.report-form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.report-form {
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
