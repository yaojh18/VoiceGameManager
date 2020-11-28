<template>
<div id="message-board">
    <el-dialog style="text-align: center" title="修改密码"
             :visible.sync="dialogVisible"
             :show-close=false
             @close="$emit('cancelModifyPwd','')"
             width="80%">
        <el-form label-width="120px">
            <el-form-item label="用户名">
                <el-input placeholder="请输入用户名" v-model="username" @input="changeName()" readonly="true" style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="原密码">
                <el-input placeholder="请输入密码" v-model="password" @input="changePwd()" show-password style="width:80%"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input placeholder="请输入新密码" v-model="password2" @input="changePwd2()" show-password style="width:80%"></el-input>
            </el-form-item>
                <el-form-item label="确认新密码">
            <el-input placeholder="请再次输入新密码" v-model="password3" @input="changePwd3()" show-password style="width:80%"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button v-on:click="editUser();dialogVisible=false" type="primary" :disabled="username===''||password===''||password2===''||password3===''" :enabled="username!==''&&password!==''&&password2!==''&&password3!==''">确 定</el-button>
            <el-button v-on:click="$emit('cancelModifyPwd','');dialogVisible=false">取 消</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import {editUserMsg, getUserMsg} from "@/utils/communication";
export default {
    name: "ModifyPwd",
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
            }
        }
    },
    methods: {
        changeName(e) {
            this.$forceUpdate(e);
        },
        changePwd(e) {
            this.$forceUpdate(e);
        },
        changePwd2(e) {
            this.$forceUpdate(e);
        },
        changePwd3(e) {
            this.$forceUpdate(e);
        },
        editUser(){
            let that = this
            if(this.password2===this.password3){
                editUserMsg(this.username,this.password2,this.password).then(function (res) {
                    if (res.status === 200)
                        that.$message('修改成功')
                    else
                        that.$message('修改失败')
            })}
            else{
                this.$message('两次输入的密码不一致')
            }
        }
    },
    watch: { // 用于实时检测username是否合法
        dialogVisible: {
            handler(newval, oldval) {
            let that = this
            if (newval === true && oldval === false)
                this.$nextTick(() => {
                getUserMsg().then((msg)=>{
                    msg.json().then((res)=>{
                        if (res instanceof Array){
                            let idx = res.findIndex(function (item) {
                            return item.usernam = that.username
                        })
                        res = res[idx]
                        }
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