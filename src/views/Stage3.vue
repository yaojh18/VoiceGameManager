<template>
  <div id="stage3">
    <!--修改下方的MessageList和PostDialog-->
    <MessageList v-bind:messageList="messageList"/>
    <PostDialog  v-on:postmsg="messageList.push($event)"/>
  </div>
</template>

<script>
import MessageList from "@/components/MessageList.vue"
import PostDialog from "@/components/PostDialog.vue"

export default {
  name: 'Stage3',
  components: {
    MessageList,
    PostDialog
  },
  // 请在下方设计自己的数据结构和响应函数
  data(){
    return {
      messageList: [],
      dialogVisible: true,
    }
  },
  methods: {
  }
}
</script>