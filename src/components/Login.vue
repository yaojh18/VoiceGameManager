<template>
    <el-dialog style="text-align: center" title="登录"
               v-on:close="$emit('cancelLogin','')"
               :visible.sync="dialogVisible" :show-close=false width="80%">
        <el-form label-width="80px">
            <el-form-item label="用户名">
                <el-input placeholder="请输入用户名" v-model="username" @input="changeName()">{{ username }}</el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button v-on:click="$emit('cancelLogin','');dialogVisible=false">取 消</el-button>
            <el-button v-on:click="$emit('login',{usernameLogin:username,password:password});dialogVisible=false" type="primary" :disabled="username===''||password===''" :enabled="username!==''&&password!==''">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "Login",
    props: {
        dialogVisible: {
            type: Boolean,
            default: () => true
        },
        username: {
            type: String,
            default: () => ""
        },
        password: {
            type: String,
            default: () => ""
        },
        
    },
  data(){
    return {
      Login:{
        dialogVisible:true,
        form:{
          username:this.username,
          password:this.password,
        }
      },
    }
  },
    methods: {
        changeName(e) {
            this.$forceUpdate(e);
        },
        changePwd(e) {
            this.$forceUpdate(e);
        }
    },
    watch: { // 用于实时检测username是否合法
    }
}
</script>

<style scoped>
.messageblock-content {
    display: flex;
    color: #090607;
    padding-bottom: 10px;
    font-size: large
}
</style>
