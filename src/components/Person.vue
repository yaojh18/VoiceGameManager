<template>
  <el-container height="100px">
    <el-header style="background-color:#87CEFA;text-align:center">
    <el-button v-on:click="handleModify()" style="display: inline-block;margin-top:10px;margin-right: 15px;">
      <i class="el-icon-edit">个人信息修改</i>
    </el-button>
    <el-button v-on:click="this.$router.push({path:'/'});$emit('updateName','');" style="margin-top:10px;display: inline-block;margin-right: 15px;">
      <router-link to='/'><i class="el-icon-s-home">回到主页</i></router-link>
    </el-button>
    </el-header>

  </el-container>
</template>
<script>
import ModifyPwd from "@/components/ModifyPwd.vue";
export default {
    name: "Person",
    components: {
      ModifyPwd,
    },
    data(){
      return{
         ModifyPwd : {
           dialogVisible: true,
           form: {
             username:this.username,
             password:this.password,
             password2:this.password2,
             password3:this.password3,
           },
         }
      }
    },
    methods:{
      handleModify(){
        this.$router.go('/person');
        this.ModifyPwd.dialogVisible = true;
      },
    }
}
</script>