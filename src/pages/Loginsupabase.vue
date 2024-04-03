<template>
   <!-- <img src="~assets/img/2.jpg" class="wave" alt="login-wave"> -->
 <div class="centered-container" >
  <div class="row justify-center items-center" style="height: 100vh " >
    <div class="col-12 col-md-15" style="text-align: center;">
      <q-card v-bind:style="$q.screen.lt.sm ? {'width': '100%'} : {'width': '115%'}">
        <q-card-section>
          <q-avatar size="150px" >
            <img src="~assets/img/12.png" alt="avatar" >
          </q-avatar>
        </q-card-section>
        <q-card-section >
          <div class="q-pt-lg" ic>
            <div class="col text-h6 ellipsis flex justify-center">
              <h4 class="text-h4 q-my-none text-weight-regular" >Bem-Vindo</h4>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="handleLogin">
            <q-input label="Email" v-model="form.email" >
            </q-input>
            <q-input label="Password" type="password" v-model="form.password">
            </q-input>
            <div>
              <q-btn class="full-width" color="primary"   label="Login"    type="submit" rounded></q-btn>
              <q-btn class="full-width q-mt-md" color="grey-8" label="Entrar como anônimo" to="/AnonymousForm" @click="loginAnonimo" rounded></q-btn>
              <div class="text-center q-mt-sm q-gutter-lg">
                <router-link class="text-weight-regular
                " to="/recuperar">Esqueceu a senha?</router-link>
                <router-link class="text-weight-regular
                " to="/register">Criar conta</router-link>
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
import { ref } from 'vue'
import axios from 'axios'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginPage',



  data () {
    const router = useRouter()

    const { login } = useAuthUser ()

    const form = ref({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        router.push({name: 'Index'})
      } catch (error) {
        alert  (error.message)
      }
    }


    return {
    form,
    handleLogin
    }
  },
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
