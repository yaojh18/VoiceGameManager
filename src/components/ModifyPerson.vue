<template>
    <div id="message-board">
        <el-dialog style="text-align: center" title="修改个人信息"
               :visible.sync="dialogVisible"
               :show-close=false width="80%"
               @close="$emit('cancelModifyPerson','')">
            <el-form label-width="100px">
                <el-form-item label="用户名">
                <el-input placeholder="请输入用户名" v-model="username" readonly="true">{{ username }}</el-input>
            </el-form-item>
            <el-form-item label="电子邮箱">
                <el-input placeholder="请输入电子邮箱" v-model="email">{{ email }}</el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input placeholder="请输入姓名" v-model="name" >{{ name }}</el-input>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button v-on:click="$emit('cancelModifyPerson',''),dialogVisible=false">取 消</el-button>
                <el-button v-on:click="editUser();dialogVisible=false" type="primary" enabled>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {editUserMsgWithoutPwd, getUserMsg} from "@/utils/communication";
export default {
  name: "ModifyPerson",
  props: {
      dialogVisible: {
          type: Boolean,
          default: () => false
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
          this.name=name;
          this.email=email;
          this.username=username;
      },
      editUser(){
          if(!this.username)
            this.$message('输入信息有误')
          editUserMsgWithoutPwd(this.username,this.password2,this.password).then(function (res) {
              if (res.status === 200)
                  this.$message('修改成功')
              else
                  this.$message('修改失败')
          })
    }
  },
  watch: { // 用于实时检测username是否合法
      dialogVisible: {
          handler(newval, oldval) {
              let that = this
          if (newval === true && oldval === false)
              this.$nextTick(() => {
                  getUserMsg().then((res)=>{
                      res.json().then((res)=>{
                          if (res instanceof Array){
                              let idx = res.findIndex(function (item) {
                                  return item.usernam = that.username
                              })
                              res = res[idx]
                          }
                          this.name=res.name;
                          this.email=res.email;
                          this.username=res.username;
                      })
                  })
              })
          }
      }
  },
}
</script>
<style scoped>
#message-board{
    height: calc(100vh - 16px);
}
</style>