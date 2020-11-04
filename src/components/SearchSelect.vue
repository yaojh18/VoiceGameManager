<template>
  <el-dialog :visible.sync="dialogVisible" >
    <el-button  v-on:click="$emit('chooseSearchSelect',{arg:'0'}),dialogVisible=false">关键字搜索</el-button>

    <el-button  v-on:click="$emit('chooseSearchSelect',{arg:'1'}),dialogVisible=false">关  卡搜索</el-button>
  </el-dialog>

</template>
<script>
export default {
  name: "Register",
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => true
    },

  },
  data(){
    return {
    }
  },
  methods: {
    post(){
      var msg=this;
      this.dialogVisible = false;
      //获取密码
      return msg;
    },
  },
  watch: {
  }
}
</script>