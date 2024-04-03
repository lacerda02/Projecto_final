<!-- RecursosDeApoio.vue -->
<template>
  <div class="recursos-de-apoio-container">
    <h2>Recursos de Apoio</h2>
    <div>
      <h3>Linhas Diretas</h3>
      <ul class="lista-grande">
        <li>Linha Nacional de Apoio a Vítimas de Violência: 123456789</li>
        <li>Centro de Ajuda Psicológica 24 Horas: 987654321</li>
        <li>Linha de Apoio a Crianças Desaparecidas: 555444333</li>
        <li>Linha de Prevenção ao Suicídio: 800123456</li>
        <li>Linha de Apoio a Vítimas de Discriminação: 111222333</li>
        <!-- Adicione mais linhas diretas conforme necessário -->
      </ul>
    </div>
    <div>
      <h3>Organizações de Ajuda</h3>
      <ul class="lista-grande">
        <li>Associação de Apoio a Vítimas de Abuso: Oferece apoio jurídico e psicológico.</li>
        <li>Centro de Assistência Social da Comunidade: Fornece suporte alimentar e habitacional.</li>
        <li>Instituto de Proteção à Infância: Protege os direitos das crianças em situações vulneráveis.</li>
        <li>ONG de Apoio a Mulheres Vítimas de Violência: Oferece abrigo e acompanhamento psicológico.</li>
        <li>Rede de Apoio a LGBTQ+: Proporciona suporte para a comunidade LGBTQ+.</li>
        <!-- Adicione mais organizações conforme necessário -->
      </ul>
    </div>
    <div>
      <h3>Serviços de Aconselhamento</h3>
      <ul class="lista-grande">
        <li>Serviço de Aconselhamento Familiar: Auxilia em questões familiares e de relacionamento.</li>
        <li>Centro de Aconselhamento para Jovens: Especializado em orientação para adolescentes.</li>
        <li>Serviço de Aconselhamento de Carreira: Ajuda na escolha profissional e desenvolvimento profissional.</li>
        <li>Clínica de Aconselhamento Psicológico: Oferece sessões individuais e em grupo.</li>
        <li>Centro de Aconselhamento de Dependência Química: Suporte para superar vícios.</li>
        <!-- Adicione mais serviços conforme necessário -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // Adicione lógica ou dados necessários aqui
};
</script>

<style scoped>
/* Estilos específicos para o componente RecursosDeApoio.vue */

.recursos-de-apoio-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

h3 {
  margin-top: 15px;
}

.lista-grande {
  font-size: 16px; /* Ajuste o tamanho da fonte conforme necessário */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
