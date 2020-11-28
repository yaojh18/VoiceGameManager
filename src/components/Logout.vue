<template>
  <el-dialog style="text-align: center" title="登录" :visible.sync="dialogVisible" :show-close=false width="80%">
    <el-card>你确定要登出吗？</el-card>
    <span slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('logoutfunc'),dialogVisible=false" type="primary" :enabled="true">确 定</el-button>
        <el-button v-on:click="$emit('closeLogout',''),dialogVisible=false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default{
  name: "Logout",
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => true
    },
  },
  data(){
    return {
      Logout:{
        dialogVisible:true,
      },
    }
  },
}
</script>