<template>

  <q-page padding>
    <p>
      Obrigado pelo registro!
    </p>
    <P>
      confirme para completar o registro: <Strong>{{ $route.query.email }}</Strong>
    </P>
  </q-page>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
