<template>
  <div id="message-list">
    <!--请修改这两行注释中间的代码，达到用多个MessageBlock来展示messageList数据的效果-->
    <ul v-for="message in messageList" :key="message.id" @posttext="modify($msg)" style="margin:0px;border-radius:50px">
      <MessageBlock v-bind:title="message.title"
                    v-bind:level_id="message.level_id"
                    v-bind:id="message.id"
                    v-bind:content="message.content"
                    v-on:closeclicked="uploadMsgtoBoard('close')"
                    v-on:editclicked="uploadMsgtoBoard('edit')"
                    v-on:detailclicked="uploadMsgtoBoard('detail')"
                    @modifySucceed="modifySucess"
      />
    </ul>
    <!--请修改这两行注释中间的代码，达到用多个MessageBlock来展示messageList数据的效果-->
  </div>
</template>

<script>
import MessageBlock from "@/components/MessageBlock"

export default {
  name: "MessageList",
  components: {
      MessageBlock
  },
  props: {
      messageList: {
          type: Array,
          default: () => new Array(5).fill(
          {
              "title":"unknown",
              "level_id":0,
              "id":0,
              "type_id":0,
              "content": "",
              "timestamp":new Date().getTime(),
          }
      )
      }
  },
  methods:{
      uploadMsgtoBoard(choice){
          this.$emit('uploadMsgTB',{'content':this.content,'choice':choice,'title':this.title,'level_id':this.level_id,'id':this.id});
      },
      modifySucess(){
          this.$emit('modifySucceed')
      },
  }
}
</script>
