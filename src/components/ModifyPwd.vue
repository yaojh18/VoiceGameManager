<template>
  <el-dialog style="text-align: center" title="修改密码" :visible.sync="dialogVisible" :show-close=false width="80%">
    <el-form label-width="100px">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" v-model="username" @input="changeName()">{{ username }}</el-input>
      </el-form-item>
      <el-form-item label="原密码">
        <el-input placeholder="请输入密码" v-model="password" @input="changePwd()">{{ password }}</el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input placeholder="请输入新密码" v-model="password2" @input="changePwd2()">{{ password2 }}</el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input placeholder="请再次输入新密码" v-model="password3" @input="changePwd3()">{{ password3 }}</el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('cancelModifyPwd',''),dialogVisible=false">取 消</el-button>
        <el-button v-on:click="$emit('modifypwd',{username:username,password:password,password2:password2,password3:password3}),dialogVisible=false" type="primary" :disabled="state.username_valid===false" :enabled="state.username_valid===true">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "ModifyPwd",
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => true
    },
    state: {
      type: Object,
      default: () => {
        return {
          username_valid: false
        }
      }
    },
    username: {
      type: String,
      default: () => ""
    },
    password: {
      type: String,
      default: () => ""
    },
    password2: {
      type: String,
      default: () => ""
    },
    password3: {
      type: String,
      default: () => ""
    },

  },
  data(){
    return {
      ModifyPwd:{
        dialogVisible:true,
        form:{
          username:this.username,
          password:this.password,
          password2:this.password2,
          password3:this.password3,
        }
      },
    }
  },
  methods: {
    changeName(e) {
      this.$forceUpdate(e);
      this.state.username_valid = true;
    },
    changePwd(e) {
      this.$forceUpdate(e);
      this.state.username_valid = true;
    },
    changePwd2(e) {
      this.$forceUpdate(e);
      this.state.username_valid = true;
    },
    changePwd3(e) {
      this.$forceUpdate(e);
      this.state.username_valid = true;
    },
    modifypwd(username,password,password2,password3){
       console.log("modifypwd");
       console.log(username,password,password2,password3);
    },
  },
  watch: { // 用于实时检测username是否合法
  }
}
</script>