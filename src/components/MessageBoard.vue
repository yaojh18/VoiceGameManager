<template>
<div id="message-board">
    <el-container style="height:100%; border: 1px solid #eee">
        <el-header style="text-align: right; font-size: 10px">
            <el-button style="display: inline-block; text-align:right; margin-left:15px;" v-model="usernameLogged" v-on:click="gotoPerson()">
                用户名:{{usernameLogged='unknown'}} </el-button>
            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="postDialog.dialogVisible=true">
                <i class="el-icon-edit">增加</i>
            </el-button>

            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="this.$router.push({path:'/data'})">
                <router-link to='/data'>数据界面</router-link>
            </el-button>
            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="this.$router.push({path:'/data'})">
                <router-link to='/person'>个人界面</router-link>
            </el-button>

            <!--请修改这两行注释中间的代码完成"刷新"功能-->
            <el-button style="display:inline-block;margin-right: 15px;">
                <!--请修改这两行注释中间的代码完成"刷新"功能-->
                <i class="el-icon-refresh" style="object-fit: fill">刷新</i>
            </el-button>
            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="Login.dialogVisible=true">
                <i class="el-icon-edit">注册</i>
            </el-button>
            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="changeLogin()">
                <i class="el-icon-edit">登录</i>
            </el-button>
            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="Login.loginvisible=true">
                <i class="el-icon-edit">修改密码</i>
            </el-button>
            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="Login.loginvisible=true">
                <i class="el-icon-edit">登出</i>
            </el-button>
        </el-header>
        <el-main>
            <MessageList v-bind:messageList="messageList" ></MessageList>
        </el-main>

        <el-footer>@DIJKSTRA</el-footer>
    </el-container>
    <Login v-bind:dialog-visible="Login.DialogVisible" v-on:cancelLogin="Login.loginvisible=false" v-on:login="({usernameLogin,password})=>{
                Login.DialogVisible = false;
                loginCalled(usernameLogin,password);
            }" />
    <Register v-bind:dialog-visible="Register.registervisible" v-on:cancelRegister="Register.registervisible=false" v-on:register="({usernameRegister,password,password2})=>{
                register.registervisible = false;
                registerCalled(usernameRegister,password,password2);s
            }" />
    <PostDialog v-on:postmsg="({title,content,username})=>{
            messageList.push({
                title,
                content,
                user:username,
                timestamp:new Date().valueOf(),
            });
            $emit('refresh','');
            postDialog.dialogVisible = false;
            post(title,content,username);
        }" v-bind:dialog-visible="postDialog.dialogVisible" v-on:cancel="postDialog.dialogVisible=false" />
    <!--请补全这两行注释中间的PostDialog-->
    <el-dialog style="text-align: center" :title="alertDialog.text" :visible.sync="alertDialog.dialogVisible" width="40%">
    </el-dialog>
</div>
</template>

<script>
import MessageList from "@/components/MessageList"
import PostDialog from "@/components/PostDialog"
import Login from "@/components/Login"
import Register from "@/components/Register"
import {
    addmsg,
    login,
    register
} from "@/utils/communication"
export default {
    name: "MessageBoard",
    components: {
        MessageList,
        PostDialog,
        Register,
        Login
    },
    // 请在下方设计自己的数据结构及函数来完成最终的留言板功能
    data() {
        return {
            Login: {
                dialogVisible: true,
                form: {
                    usernameLogin: "",
                    password: ""
                }
            },
            Register: {
                registervisible: false,
                form: {
                    usernameRegister: "",
                    password: "",
                    password2: ""
                }
            },
            postDialog: {
                dialogVisible: false,
                form: {
                    title: "",
                    content: "",
                    audiofile: "",
                    videofile: "",
                }
            },
            alertDialog: {
                "text": "发帖成功",
                dialogVisible: false
            },
            state: {
                username: "",
                username_valid: false
            },
            messageList: [],
            usernameLogged: ""
        }
    },
    methods: {
        post: (title, content, username) => {
            console.log(username);
            document.cookie = `user=${username}`;
            addmsg(title, content, username).then((res) => {
                if (res.status == 201)
                    this.alertDialog.dialogVisible = true;
                else
                    this.alertDialog.dialogVisible = false;
            });
        },
        loginCalled: (usernameLogin, password) => {
            console.log(usernameLogin);
            document.cookie = `user=${usernameLogin}`;
            login(usernameLogin, password).then((res) => {
                if (res.status === 200) {
                    this.alertDialog.dialogVisible = true;
                    this.usernameLogged = usernameLogin;
                } else {
                    this.alertDialog.dialogVisible = false;
                    this.usernameLogged = "unknown";
                }
            });
        },
        registerCalled: (usernameRegister, password, password2) => {
            console.log(usernameRegister);
            document.cookie = `user=${usernameRegister}`;
            register(usernameRegister, password, password2).then((res) => {
                if (res.status === 200) {
                    this.alertDialog.dialogVisible = true;
                    this.usernameLogged = usernameRegister;
                } else {
                    this.alertDialog.dialogVisible = false;
                    this.usernameLogged = "unknown";
                }
            });
        },
        add(msg) {
            this.messageList.append(msg);
            console.log(msg);
        },
        changeDialog() {
            this.postDialog.dialogVisible = true;
        },
        changeLogin() {
            this.Login.dialogVisible = true;
        },
        gotoPerson(){
            this.$router.go('/stage1');
        }
    },
}
</script>

<style scoped>
#message-board {
    height: calc(100vh - 16px);
}

.message-tab {
    display: block;
    padding: 10px;
    text-align: left;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}

a {
    text-decoration: none;
}

.router-link-active {
    text-decoration: none;
}
</style>
