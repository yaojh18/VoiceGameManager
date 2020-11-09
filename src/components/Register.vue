<template>
<el-dialog :visible.sync="dialogVisible" title="注册" style="text-align: center" :show-close=false width="80%">
    <el-form label-width="80px">
        <el-form-item label="用户名">
             <el-input placeholder="请输入用户名" v-model="username" @input="changeRegisterName()">{{ username }}</el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input placeholder="请输入密码" v-model="password" @input="changeRegisterPassword()">{{ password }}</el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input placeholder="请输入确认密码" v-model="password2" @input="changeRegisterPassword2()">{{ password2 }}</el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button  v-on:click="$emit('closeRegister',''),dialogVisible=false">取 消</el-button>
        <el-button  v-on:click="$emit('register',{usernameRegister:username,password:password,password2:password2}),dialogVisible=false" type="primary"
                            :disabled="state.username_valid===false"
                            :enabled="state.username_valid===true"
                            >确 定</el-button>
    </span>
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
    state: {
      type: Object,
      default: () => {
          return {
          username: "",
          username_valid: false
        }
      }
    },
    username:{
        type:String,
        default:() => ""
    },
    password: {
      type: String,
      default: () => ""
    },
          password2: {
            type: String,
            default: () => ""
          }
    },
  // 请在下方设计自己的数据结构以及事件函数
    data(){
    return {
            //dialogVisible:true,
            form:{
                username:this.username,
                password:this.password,
                password2:this.password2
                    },
            }
    },
    methods: {
      post(){
        var msg=this;
        this.dialogVisible = false;
				//获取密码
        return msg;
      },
      changeRegisterName(e){
        this.$forceUpdate(e);
        this.state.username_valid = true;
      },
      changeRegisterPassword(e){
        this.$forceUpdate(e);
        this.state.username_valid = true;
      },
      changeRegisterPassword2(e){
        this.$forceUpdate(e);
        this.state.username_valid = true;
      },
  },
  watch: { // 用于实时检测username是否合法
    "state.username": {
      handler(newName) {
        this.state.username_valid = /^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(newName)
      }
    }
  }
}
</script>