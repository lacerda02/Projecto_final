<template>
     <img src="~assets/img/2.jpg" class="wave" alt="login-wave">
<div class="centered-container">
  <div class="row justify-center items-center" style="height: 100vh " >
    <div class="col-12 col-md-15" style="text-align: center;">
      <q-card v-bind:style="$q.screen.lt.sm ? {'width': '100%'} : {'width': '100%'}">
        <q-card-section>
          <q-avatar size="150px" >
            <img src="~assets/img/1.png" alt="avatar" >
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">Logout</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="submitForm">
            <div>

              <div class="text-center q-mt-sm q-gutter-lg">
                <h5>Volte sempre</h5>
                <router-link class="text-weight-regular" to="/login">Fazer Login</router-link>
                <router-link class="text-weight-regular" to="/register">Criar conta</router-link>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { mapActions } from 'vuex'

let $q

export default {
  name: 'LoginPage',
  data () {
    return {
      login: {
        username: 'Joabson',
        password: 'a2d4g6j8'
      }
    }
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    async submitForm () {
      if (!this.login.username || !this.login.password) {
        $q.notify({
          type: 'negative',
          message: 'Os dados informados são inválidos.'
        })
      } else if (this.login.password.length < 6) {
        $q.notify({
          type: 'negative',
          message: 'A senha deve ter 6 ou mais caracteres.'
        })
      } else {
        try {
          await this.doLogin(this.login)
          const toPath = this.$route.query.to || '/admin'
          this.$router.push(toPath)
        } catch (err) {
          if (err.response.data.detail) {
            $q.notify({
              type: 'negative',
              message: err.response.data.detail
            })
          }
        }
      }
    }
  },
  mounted () {
    $q = useQuasar()
  }
}
</script>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
width: 100%;
opacity: 40%;
}
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
