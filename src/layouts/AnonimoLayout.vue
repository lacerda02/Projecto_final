<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
     DenunciaFacil
        </q-toolbar-title>
        <!-- <div class="text-subtitle1">{{ formattedDateTime }}</div> -->
        <div class="q-pa-md">
    <div class="row no-wrap">
      <q-separator vertical inset class="" />

      <div class="column items-center">
        <q-btn
          color="primary"
          label="Sair"
          icon="logout"
          push
          size="sm"
          @click="showLogoutConfirmation = true"
        />
      </div>
    </div>
    <q-dialog v-model="showLogoutConfirmation">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Confirmar Saida
          </div>
        </q-card-section>
        <q-card-section>
          Tem certeza que deseja sair?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="negative"
            label="Cancelar"
            size="sm"
            @click="showLogoutConfirmation = false"
          />
          <q-btn
            color="primary"
            label="Confirmar"
            size="sm"
            @click="logout"
            to="/login"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
   <!-- <p>Usuário logado: {{ user.name }}</p> -->
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model=" leftDrawerOpen "
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item
            to="/index2" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Inicio
              </q-item-section>
            </q-item>

            <q-item
            to="/AnonymousForm"
             a clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="anonymous-form" />
              </q-item-section>

              <q-item-section>

                Fazer Denuncias Anonimas
              </q-item-section>
            </q-item>

            

            <q-item
            to="/EmergencyReports2" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="warning" />
              </q-item-section>

              <q-item-section>
                Denúncias de Emergência
              </q-item-section>
            </q-item>

            <q-item
            to="SupportResources2"
            clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Recursos de Apoio
              </q-item-section>
            </q-item>
            <q-item
            to="/EducationESensitivity2" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="book" />
              </q-item-section>

              <q-item-section>
                Educação e Sensibilização
              </q-item-section>
            </q-item>

           
            <q-item
            to="/FeedbackImprovements2" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="feedback" />
              </q-item-section>

              <q-item-section>
                Feedback e Melhorias
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">

            </q-avatar>
            <div class="text-weight-bold">Leonardo Luís</div>
            <div>@dinhoLacerda</div>
          </div>
        </q-img>
      </q-drawer>
      <q-footer bordered class="bg-grey-3 text-primary">
    <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey-8" v-model="tab">
      <q-route-tab
        name="Casa"
        icon="home"
        label="Início"
        to="/Index2"
      />
      <q-route-tab
        name="Denuncia "
        icon="warning"
        label="Denúncia Anonima"
        to="/AnonymousForm"
      />
     
      <q-route-tab
        name="Apoio"
        icon="help"
        label="Apoio"
        to="/SupportResources"
      />
    </q-tabs>
  </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  data () {
    return {
      tab: 'Casa',
      imagesTabIcon: 'heartbeat',
      showLogoutConfirmation: false,
      leftDrawerOpen: false,
      formattedDateTime: '',
      search: '',
      // Adicione uma lista fictícia para a pesquisa
      itens: [
        { nome: 'Item 1', descricao: 'Descrição do Item 1' },
        { nome: 'Item 2', descricao: 'Descrição do Item 2' }
        // Adicione mais itens conforme necessário
      ]
    }
  },
  methods: {
    performSearch () {
      // Suponha que você tenha uma lista de itens em 'itens'
      const termoPesquisa = this.search.toLowerCase()

      // Filtrar os itens que contêm o termo de pesquisa
      const resultados = this.itens.filter(item => {
        // Neste exemplo, estamos realizando uma pesquisa case-insensitive
        // Você pode ajustar a lógica da pesquisa conforme necessário
        return item.nome.toLowerCase().includes(termoPesquisa) || item.descricao.toLowerCase().includes(termoPesquisa)
      })

      // Agora 'resultados' contém os itens que correspondem à pesquisa
      console.log('Resultados da pesquisa:', resultados)
    },
    logout () {
      // Coloque aqui a lógica para efetuar o logout
      // Por exemplo, dispatch para um método que efetua o logout.
      // this.$store.dispatch('auth/logout')
      this.showLogoutConfirmation = false
    },
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    updateDateTime () {
      const now = new Date()
      // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      this.formattedDateTime = now.toLocaleDateString(undefined, options)
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapState('auth', ['isAuthenticated', 'user'])
  },
  mounted () {
    this.updateDateTime()
    setInterval(this.updateDateTime, 1000) // Atualize a cada segundo
  }
})
</script>
