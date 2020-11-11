<template>
  <div id="message-board">
    <el-dialog style="text-align: center" title="修改密码" :visible.sync="dialogVisible" :show-close=false width="80%">
      <el-form label-width="100px">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="username" >{{ username }}</el-input>
        </el-form-item>
        <el-form-item label="请输入电子邮箱地址">
          <el-input placeholder="请输入电子邮箱" v-model="email">{{ email }}</el-input>
        </el-form-item>
        <el-form-item label="请输入姓名">
          <el-input placeholder="请输入姓名" v-model="name" >{{ name }}</el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('cancelModifyPerson',''),dialogVisible=false">取 消</el-button>
        <el-button v-on:click="editUser();dialogVisible=false" type="primary" enabled>确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog style="text-align: center" :title="alertDialog.text" :visible.sync="alertDialog.dialogVisible" width="40%">
    </el-dialog>
  </div>
</template>

<script>
import { editUserMsgWithoutPwd } from "@/utils/communication";
export default {
  name: "ModifyPerson",
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => true
    },
    username: {
      type: String,
      default: () => ""
    },
    email:{
      type:String,
      default: () => ""
    },
    name:{
      type:String,
      default: () => ""
    }
  },
  data(){
    return {
      ModifyPerson:{
        dialogVisible:true,
        form:{
          username:this.username,
          email:this.email,
          name:this.name,
        }
      },
      alertDialog:{
        dialogVisible:false,
        text:"输入信息有误",
      }
    }
  },
  methods: {
    changeName(e) {
      this.$forceUpdate(e);
    },
    changeemail(e) {
      this.$forceUpdate(e);
    },
    changename(e) {
      this.$forceUpdate(e);
    },
    changePersonModify:function(name,email,username){
      console.log(name);
      console.log(email);
      console.log(username);
      this.name=name;
      this.email=email;
      this.username=username;
    },
    editUser(){
        if(!this.email)
          this.email = "Unknown";
        if(!this.name)
          this.name = "Unknown";
        if(!this.username)
          this.alertDialog.dialogVisible = true;
        editUserMsgWithoutPwd(this.username,this.email,this.name);
    }
  },
  watch: { // 用于实时检测username是否合法
  },
}
</script>
<style scoped>
#message-board{
  height: calc(100vh - 16px);
}
</style>