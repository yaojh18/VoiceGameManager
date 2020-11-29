<template>
  <el-container height="100px">
    <el-header style="background-color:#87CEFA;text-align:center">
      <el-button v-on:click="handlelogin()" style="display: inline-block;margin-top:10px;margin-right: 15px;">
        <i class="el-icon-edit">登录</i>
      </el-button>
      <el-button v-on:click="handleregister()" style="display: inline-block;margin-top:10px;margin-right: 15px;">
        <i class="el-icon-edit">注册</i>
      </el-button>
    </el-header>
    <Login v-bind:dialog-visible="Login.dialogVisible"
           v-on:cancelLogin="Login.dialogVisible=false"
           v-on:login="({usernameLogin,password})=>{
                Login.dialogVisible = false;
                loginCalled(usernameLogin,password);
            }"/>
    <Register v-bind:dialog-visible="Register.dialogVisible"
              v-on:closeRegister="Register.dialogVisible=false"
              v-on:register="({usernameRegister,password,password2})=>{
                Register.dialogVisible = false;
                registerCalled(usernameRegister,password,password2);
            }"/>
  </el-container>
</template>
<script>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import {login, registerBack} from "@/utils/communication";

export default {
  name: "Person",
  components: {
    Login,
    Register,
  },
  data(){
    return{
      Login : {
        dialogVisible: true,
        form: {
          username:this.username,
          password:this.password,
        },
      },
      Register:{
        dialogVisible:false,
        form:{
          username:this.username,
          password:this.password,
          password2:this.password2,
        }
      }
    }
  },
  methods:{
    handlelogin(){
      this.Login.dialogVisible = true;
    },
    handleregister(){
      this.Register.dialogVisible = true;
    },
    registerCalled: function(usernameRegister, password, password2)  {
      registerBack(usernameRegister, password, password2).then((res) => {
        if (res.status === 201 || res.status === 200) {
          this.$message("注册成功");
          this.$router.push({path:'home'});
        } else {
          this.$message("注册失败");
        }
        return res.json();
      }).then((r)=>{
        localStorage.setItem('token',r.token);
      });
      this.usernameLogged = usernameRegister;
      localStorage.setItem('name',usernameRegister);
    },
    loginCalled: function(usernameLogin, password) {
      login(usernameLogin, password).then((res)=> {
            if (res.status === 200 || res.status === 201) {
              this.$message({
                message:'已登录',
                duration:2000,
              });
              this.$router.push({path:'home'});
            } else {
              this.$message(
                  {
                    message: '登录失败',
                    duration: 2000,
                  });
            }
            return res.json();
          }
      ).then((r)=>{
        localStorage.setItem('token',r.token);
      });
      this.usernameLogged = usernameLogin;
      localStorage.setItem('name',usernameLogin);
      this.Login.dialogVisible = false;
    },
  }
}
</script>