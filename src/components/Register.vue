<template visible.sync="vvvisible">
<el-dialog dialogVisible=true>
    <el-form label-width="80px">
        <el-form-item label="用户名">
             <el-input placeholder="请输入用户名" v-model="username" @input="change()">{{ username }}</el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input placeholder="请输入密码" v-model="password" @input="change()">{{ username }}</el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input placeholder="请输入确认密码" v-model="password" @input="change()">{{ username }}</el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button  v-on:click="$emit('cancelregister',''),loginvisible=false">取 消</el-button>
        <el-button  v-on:click="$emit('logincalled',{username:username,password:password}),loginvisible=false" type="primary"
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
        registervisible: {
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
    password:{
        type:String,
        default:() => ""
    },
    },
  // 请在下方设计自己的数据结构以及事件函数
    data(){
    return {
            form:{
                username:this.username,
                password:this.password
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
      change(e){
        this.$forceUpdate(e);
      },
      changename(e){
        this.$forceUpdate(e);
        this.setState({username_valid : true});
        console.log(this.state.username_valid);
      }
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