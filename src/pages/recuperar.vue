<template>
     <img src="~assets/img/2.jpg" class="wave" alt="login-wave">
 <div class="centered-container">
  <div class="row justify-center items-center" style="height: 100vh " >
    <div class="col-12 col-md-15" style="text-align: center;">
      <q-card v-bind:style="$q.screen.lt.sm ? {'width': '110%'} : {'width': '110%'}">
        <q-card-section>
          <q-avatar size="150px" >
            <img src="~assets/img/1.png" alt="avatar" >
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h5 text-uppercase q-my-none text-weight-regular">Recuperar senha</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="flex flex-center">
          <q-form class="q-gutter-md" @submit.prevent="submitForm">
            <q-input label="Email"  v-model="email"></q-input>
            <div class="q-mt-md">
              <q-btn class="full-width" color="primary" label="Recuperar" type="submit" rounded></q-btn>
              <div class="text-center q-mt-sm q-gutter-lg">
                <router-link class="text-weight-regular" to="/login">Voltar para o login</router-link>
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
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000' // Substitua pelo endereço do seu backend
})

export default {
  data () {
    return {
      email: ''
    }
  },
  methods: {
    async submitForm () {
      if (!this.email) {
        this.$q.notify({
          type: 'negative',
          message: 'Por favor, preencha o campo de email.'
        })
        return
      }

      try {
        await instance.post('/api/password-recovery', {
          email: this.email
        })

        this.$q.notify({
          type: 'positive',
          message: 'Um email foi enviado com instruções para redefinir sua senha.'
        })

        // Redirecionar para a página de redefinição de senha com o email na URL
        this.$router.push({
          name: 'ResetPassword',
          params: { email: this.email }
        })
      } catch (err) {
        if (err.response.data.detail) {
          this.$q.notify({
            type: 'negative',
            message: err.response.data.detail
          })
        }
      }
    }
  }
}
</script>

<style>
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
}</style>
