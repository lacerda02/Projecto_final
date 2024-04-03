<template>
  <div>
    <!-- <img src="~assets/img/2.jpg" class="wave" alt="login-wave"> -->
    <div class="centered-container">
      <div class="row justify-center items-center" style="height: 100vh ">
        <div class="col-12 col-md-15" style="text-align: center;">
          <q-card v-bind:style="$q.screen.lt.sm ? {'width': '100%'} : {'width': '100%'}">
            <q-card-section>
              <q-avatar size="150px">
                <img src="~assets/img/12.png" alt="avatar">
              </q-avatar>
            </q-card-section>
            <q-card-section>
              <div class="q-pt-lg">
                <div class="col text-h6 ellipsis flex justify-center">
                  <h4 class="text-h4 q-my-none text-weight-regular">Cadastro</h4>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <q-form class="q-gutter-md" @submit.prevent="handleRegister">
                <q-input label="Nome de usuário" v-model="registration.username"></q-input>
                <q-input label="Nome completo" v-model="registration.name"></q-input>
                <q-input label="Email" v-model="registration.email" type="email"></q-input>
                <q-input label="Senha" type="password" v-model="registration.password"></q-input>
                <div>
                  <q-btn class="full-width" color="primary" label="Registro" type="submit" rounded></q-btn>
                  <div class="text-center q-mt-sm q-gutter-lg">
                    <router-link class="text-weight-regular" to="/login">Já possui uma conta? Faça login</router-link>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Modal de Termos e Condições -->
    <q-dialog v-model="showTermsModal" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Termos e Condições</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <!-- Adicione aqui o conteúdo dos seus Termos e Condições -->
          <p v-for="n in 1" :key="n">

Bem-vindo ao Aplicativo de Denúncias. <br><br>Por favor, leia atentamente os seguintes termos antes de utilizar nossos serviços. Ao acessar ou utilizar o sistema, você concorda com estes termos. Se não concordar com qualquer parte destes termos, por favor, não utilize o sistema. <br>

<br>Uso do Sistema: <br>
1.1. O Sistema de Denúncias é destinado apenas para o propósito de relatar incidentes, não devendo ser utilizado para outros fins.

<br>1.2. Você concorda em fornecer informações precisas e verdadeiras ao registrar uma denúncia. <br>

<br>Responsabilidades: <br>
2.1. Ao utilizar o sistema, você é responsável por manter a confidencialidade de suas credenciais de acesso.

<br>2.2. Você é responsável por qualquer conteúdo ou informação fornecida por meio do sistema. <br>

<br>Denúncias e Conteúdo: <br>
3.1. Todo conteúdo de denúncias deve ser apropriado e relevante para o propósito do sistema.

<br>3.2. Reservamo-nos o direito de remover qualquer denúncia que viole estes termos ou que seja considerada inadequada. <br>

<br>Privacidade: <br>
4.1. O tratamento de informações pessoais está sujeito à nossa Política de Privacidade, disponível para consulta [inserir link para a política de privacidade].

<br><br>Atualizações e Modificações: <br>
5.1. Reservamos o direito de modificar estes Termos a qualquer momento. As alterações serão comunicadas por meio de notificações no sistema. <br>

5.2. O uso contínuo do sistema após alterações implica na aceitação dessas modificações.</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Recusar" color="primary" @click="rejectTerms" />
          <q-btn flat label="Aceitar" color="primary" @click="acceptTerms" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default {
  name: 'RegistroPage',



  setup () {
    const router = useRouter()

const { register } = useAuthUser ()

    const registration = ref({

      name: '',
      username: '',
      email: '',
      password:''
     })

     const handleRegister = async () => {
      try {
        await register(registration.value)
        router.push({name: 'EmailConfirmation',
                    query: {email: registration.value.email}
                  })
      } catch (error) {
        alert  (error.message)
      }
    }


    return {
      registration,
    handleRegister
    }
  },

}
</script>



<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.wave {
  position: fixed;
  height: 100%;
  width: 100%;
  opacity: 40%;
}
</style>
