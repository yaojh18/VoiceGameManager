<template>
  <el-container height="100px">
    <el-button v-on:click="handleModify()" style="display: inline-block;margin-right: 15px;">
      <i class="el-icon-edit">个人信息修改</i>
    </el-button>
    <el-button v-on:click="this.$router.push({path:'/'})" style="display: inline-block;margin-right: 15px;">
      <router-link to='/'><i class="el-icon-s-home">回到主页</i></router-link>
    </el-button>
    <ModifyPwd v-bind:dialog-visible="ModifyPwd.dialogVisible"/>
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