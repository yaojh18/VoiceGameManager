<template>
  <div id="login">
    <Modify v-on:logincalled="usernameLogged=title"/>
  </div>
</template>

<script>
import Modify from "@/components/Modify.vue"

export default {
  name: 'Modify',
  components: {
    Modify,
  },
  // 请在下方设计自己的数据结构和响应函数
  data(){
    return {
        modifyvisible: true,
        title: "",
        content: "",
        audiofile: "",
        videofile: ""
    }
  },
  methods: {
  }
}
</script>