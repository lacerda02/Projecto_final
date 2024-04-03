<!-- Sair.vue -->
<template>
  <div class="sair-container">
    <h2>Sair do Aplicativo</h2>
    <p>Tem certeza de que deseja sair do aplicativo?</p>
    <button @click="sair">Sair</button>
  </div>
</template>

<script>
export default {
  methods: {
    sair() {
      // Lógica para fechar o aplicativo (pode variar dependendo do ambiente)
      console.log('Fechando o aplicativo...');
      // Exemplo para fechar a janela em um ambiente de navegador:
      window.close();
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para o componente Sair.vue */

.sair-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

button {
  background-color: #d9534f; /* Cor vermelha para indicar ação de sair */
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #c9302c;
}
</style>
