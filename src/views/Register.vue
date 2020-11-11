<template>
  <div id="register">
    <!--修改下方的MessageList和PostDialog-->
    <Register v-on:registercalled="usernameLogged=usernameRegister"/>
  </div>
</template>

<script>
import Register from "@/components/Register.vue"

export default {
  name: 'Register',
  components: {
    Register,
  },
  // 请在下方设计自己的数据结构和响应函数
  data(){
    return {
        vvvisible: true,
        username: "",
        password: ""
    }
  },
  methods: {
  }
}
</script>