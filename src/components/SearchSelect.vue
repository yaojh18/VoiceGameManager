<template>
  <el-dialog :visible.sync="dialogVisible" @close="close" >
    <el-button  v-on:click="$emit('chooseSearchSelect',{arg:'0'}),dialogVisible=false">关键字搜索</el-button>
    <el-button  v-on:click="$emit('chooseSearchSelect',{arg:'1'}),dialogVisible=false">关  卡搜索</el-button>
    <el-button  v-on:click="$emit('chooseSearchSelect',{arg:'2'}),dialogVisible=false">数  据搜索</el-button>
  </el-dialog>

</template>
<script>
export default {
  name: "SearchSelect",
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
    close(){
      this.$emit("closeSearchSelect");
    },
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