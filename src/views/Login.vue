<template>
  <div id="login">
    <Login
        v-on:loginfunc="usernameLogged=this.username"
        v-on:cancellogin="usernameLogged='unknown'"
    />
  </div>
</template>

<script>
import Login from "@/components/Login.vue"

export default {
  name: 'Login',
  components: {
    Login,
  },
  // 请在下方设计自己的数据结构和响应函数
  data(){
    return {
        loginvisible: true,
        username: "",
        password: "",
    }
  },
  methods: {
  }
}
</script>