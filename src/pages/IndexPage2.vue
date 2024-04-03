<template>
  
<div class="q-pa-md q-gutter-sm">
    <q-btn label="Guia de Uso" color="primary" @click="basic = true" />

    <q-dialog v-model="basic" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-card-section>
          <div class="text-h6 q-mb-md">Guia de Uso do Aplicativo de Denúncias</div>
        </q-card-section>

        <q-card-section class="q-pt-none">


<div class="q-gutter-md">
  <div class="text-subtitle2 text-weight-bold q-mb-sm">1. Realizar Denúncias</div>
  <div>
    Para relatar incidentes, clique em "Fazer Denúncias" no menu. Preencha o formulário de denúncia com informações precisas e relevantes.
  </div>

  <div class="text-subtitle2 text-weight-bold q-mt-md q-mb-sm">2. Minhas Denúncias</div>
  <div>
    Acesse "Minhas Denúncias" para visualizar o histórico das denúncias que você fez. Você pode acompanhar o status e as respostas relacionadas a cada denúncia.
  </div>

  <div class="text-subtitle2 text-weight-bold q-mt-md q-mb-sm">3. Denúncias de Emergência</div>
  <div>
    Caso haja uma situação de emergência, clique em "Denúncias de Emergência". Esteja ciente de que este recurso é destinado apenas para casos urgentes.
  </div>

  <div class="text-subtitle2 text-weight-bold q-mt-md q-mb-sm">4. Recursos de Apoio</div>
  <div>
    Explore "Recursos de Apoio" para obter informações adicionais, orientações e suporte relacionados ao processo de denúncia e outras questões pertinentes.
  </div>

  <div class="text-subtitle2 text-weight-bold q-mt-md q-mb-sm">5. Educação e Sensibilização</div>
  <div>
    A seção "Educação e Sensibilização" oferece materiais educativos relacionados a questões abordadas pelo aplicativo. Explore para aumentar sua compreensão.
  </div>

  <div class="text-subtitle2 text-weight-bold q-mt-md q-mb-sm">6. Configurações da Conta</div>
  <div>
    Personalize suas configurações de conta em "Configurações da Conta". Isso inclui informações de perfil, opções de segurança e outras preferências pessoais.
  </div>

  <div class="text-subtitle2 text-weight-bold q-mt-md q-mb-sm">7. Feedback e Melhorias</div>
  <div>
    Contribua para melhorias fornecendo feedback em "Feedback e Melhorias". Sua opinião é valiosa para aprimorar a experiência no aplicativo.
  </div>

  <div class="text-subtitle2 text-weight-bold q-mt-md q-mb-sm">8. Termos e Condições</div>
  <div>
    Antes de utilizar o aplicativo, leia e aceite os "Termos e Condições". Eles fornecem informações importantes sobre o uso adequado do sistema.
  </div>
</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Recusar" color="primary" v-close-popup />
          <q-btn flat label="Aceitar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <div class="q-pa-md">
    <q-linear-progress indeterminate />

    <q-linear-progress indeterminate color="warning" class="q-mt-sm" />

    <q-linear-progress indeterminate color="secondary" class="q-mt-sm" />

    <q-linear-progress indeterminate rounded color="accent" class="q-mt-sm" />

    <q-linear-progress indeterminate rounded track-color="orange" color="purple" class="q-mt-sm" />

    <q-linear-progress indeterminate rounded color="negative" class="q-mt-sm" />
  </div>

  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <img src="~src/assets/img/Errar.jpeg">

      <q-card-section>
        <div class="text-h6">Errar é humano, exceto para pessoas negras, porquê?</div>
        <div class="text-subtitle2">Leonardo Luís</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- {{ lorem }} -->
      </q-card-section>
    </q-card>

    <q-card class="my-card" flat bordered>
      <img src="~src/assets/img/menina.jpeg">

      <q-card-actions align="right">
        <q-btn flat round color="red" icon="favorite" />
        <q-btn flat round color="teal" icon="bookmark" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>
      <q-card-section class="q-pt-none">
        {{ lorem }}
      </q-card-section>
    </q-card>


  </div>
  <div class="q-pa-md">
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <!-- <q-carousel-slide :name="1" img-src="src/assets/img/1233.jpg" /> -->
      <q-carousel-slide :name="2" img-src="~src/assets/img/megafone-denuncia.png" />
      <q-carousel-slide :name="3" img-src="~src/assets/img/materia-4.jpeg" />
      <q-carousel-slide :name="4" img-src="~src/assets/img/123.png" />
    </q-carousel>
  </div>

</template>

<script>
import { ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const { user } = useAuthUser ()

    return {
      user,
      lorem: '"Crianças inocentes sofrem, sem culpa ou compreensão. Ajude compartilhando amor e solidariedade.".',
      basic: ref(false),
      dialog: ref(false),
      maximizedToggle: ref(true),
      slide: ref(1),
      autoplay: ref(true)
    }
  }
}
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

  .my-card
  width: 100%
  max-width: 250px
</style>
