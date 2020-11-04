<template>
<div id="message-board">
    <el-container style="height:100%; border: 1px solid #eee">
        <el-header style="text-align: right; font-size: 10px">
            <el-dropdown style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; " class="avatar-container" trigger="click" >
              <div class="avatar-wrapper">
                <el-button type="primary" size="medium" v-model="usernameLogged"  v-bind="usernameLogged">
                  {{usernameLogged}}
                  <i class="el-icon-caret-bottom" />
                </el-button>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                  <el-dropdown-item>
                  <span style="display:block;" @click="gotoPerson()">个人信息修改</span>
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    <span style="display:block;" @click="personShow()">个人信息展示</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </div>
            </el-dropdown>
              <el-dropdown style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; " class="avatar-container" trigger="click" >
                <div class="avatar-wrapper">
                  <el-button type="default" size="medium"  >
                    搜索
                    <i class="el-icon-caret-bottom" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item>
                      <span style="display:block;" v-on:click="changeSearchId()" >根据关卡搜索</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                      <span style="display:block;" v-on:click="changeSearchWord()">根据关键词搜索</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </div>
              </el-dropdown>
          <el-dropdown style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; " class="avatar-container" trigger="click" >
            <div class="avatar-wrapper">
              <el-button type="default" size="medium"  >
                数据操作
                <i class="el-icon-caret-bottom" />
              </el-button>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <el-dropdown-item>
                  <span style="display:block;" v-on:click="postDialog.dialogVisible=true" ><i class="el-icon-add">增加</i></span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span style="display:block;" v-on:click="changeModify()"><i class="el-icon-add">修改</i></span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span style="display:block;" v-on:click="changeSearch()"><i class="el-icon-add">查询</i></span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </div>
          </el-dropdown>
          <el-button style="display: inline-block;margin-right: 15px;" v-on:click="getListMsg()">
            <i class="el-icon-edit">数据列表</i>
          </el-button>
          <el-button style="display: inline-block;margin-right: 15px;" v-on:click="this.$router.push({path:'/data'})">
                <router-link to='/data'>数据界面</router-link>
            </el-button>
            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="this.$router.push({path:'/person'})">
                <router-link to='/person'>个人界面</router-link>
            </el-button>

            <!--请修改这两行注释中间的代码完成"刷新"功能-->
            <el-button style="display:inline-block;margin-right: 15px;">
                <!--请修改这两行注释中间的代码完成"刷新"功能-->
                <i class="el-icon-refresh" style="object-fit: fill">刷新</i>
            </el-button>
            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="changeRegister()">
                <i class="el-icon-edit">注册</i>
            </el-button>
            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="changeLogin()">
                <i class="el-icon-edit">登录</i>
            </el-button>
            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="ModifyPwd.dialogVisible=true">
                <i class="el-icon-edit">修改密码</i>
            </el-button>
            <el-button style="display: inline-block;margin-right: 15px;" v-on:click="Logout.dialogVisible=true">
                <i class="el-icon-edit">登出</i>
            </el-button>
        </el-header>
        <el-main>
            <div>
              <ul v-for="info in infoList" :key="info">
              </ul>
            </div>
            <MessageList v-bind="messageList" ></MessageList>
        </el-main>

        <el-footer>@DIJKSTRA</el-footer>
    </el-container>
    <ModifyPwd v-bind:dialog-visible="ModifyPwd.dialogVisible" v-on:cancelModifyPwd="ModifyPwd.dialogVisible=false"/>
    <Login v-bind:dialog-visible="Login.dialogVisible" v-on:cancelLogin="Login.dialogVisible=false" v-on:login="({usernameLogin,password})=>{
                Login.dialogVisible = false;
                loginCalled(usernameLogin,password);
            }" />
    <Register v-bind:dialog-visible="Register.dialogVisible" v-on:cancelRegister="Register.dialogVisible=false" v-on:register="({usernameRegister,password,password2})=>{
                Register.dialogVisible = false;
                registerCalled(usernameRegister,password,password2);
            }" />
    <PostDialog v-on:postmsg="({title,content,audio_path,video_path})=>{
            postDialog.dialogVisible = false;
            post(title,content,audio_path,video_path);
        }" v-bind:dialog-visible="postDialog.dialogVisible" v-on:cancel="postDialog.dialogVisible=false" />
    <Logout v-bind:dialog-visible="Logout.dialogVisible" v-on:cancelLogout="Logout.dialogVisible=false"/>
    <Modify v-on:postModify="({title,content,audio_path,video_path})=>{
            messageList.push({
                title,
                content,
                audio:audio_path,
                video:video_path
            });
            $emit('refresh','');
            Modify.dialogVisible = false;
            postModify(title,content,audio_path,video_path);
        }" v-bind:dialog-visible="Modify.dialogVisible" v-on:cancel="Modify.dialogVisible=false" />
    <Search v-on:searchCalled="({keyword})=>{
            Search.dialogVisible = false;
            postSearch(keyword);
        }" v-bind:dialog-visible="Search.dialogVisible" v-on:cancel="Search.dialogVisible=false" />
          <SearchId v-on:searchIdCalled="({level_id})=>{
            SearchId.dialogVisible = false;
            postSearchId(level_id);
        }" v-bind:dialog-visible="SearchId.dialogVisible" v-on:cancel="SearchId.dialogVisible=false" />
    <SearchSelect v-on:chooseSearchSelect="({arg})=>{changeSelect(arg)}" v-bind:dialog-visible="SearchSelect.dialogVisible"/>

    <el-dialog style="text-align: center" :title="alertDialog.text" :visible.sync="alertDialog.dialogVisible" width="40%">
    </el-dialog>
    <el-dialog style="text-align: center" :title="alertRegisterDialog.text" :visible.sync="alertRegisterDialog.dialogVisible" width="40%">
    </el-dialog>


</div>
</template>

<script>
import MessageList from "@/components/MessageList"
import PostDialog from "@/components/PostDialog"
import Login from "@/components/Login"
import Register from "@/components/Register"
import Modify from "@/components/Modify"
import Search from "@/components/Search"
import SearchId from "@/components/SearchId"
import SearchSelect from "@/components/SearchSelect"
import Logout from "@/components/Logout"
import ModifyPwd from "@/components/ModifyPwd"
import {
    addmsg,
    login,
    registerBack,
    searchBack,
    searchBackId,
    getList,
    getUserMsg,
} from "@/utils/communication"
export default {
    name: "MessageBoard",
    components: {
        MessageList,
        PostDialog,
        Register,
        Login,
        Search,
        SearchId,
        SearchSelect,
        Modify,
        Logout,
        ModifyPwd
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
            Logout: {
                dialogVisible: false,
            },
            ModifyPwd:{
                dialogVisible: false,
                form:{
                  username :"",
                  password: "",
                  password2: "",
                  password3: ""
                }
            },
            Register: {
                dialogVisible: false,
                form: {
                    usernameRegister: "",
                    password: "",
                    password2: ""
                }
            },
            Search: {
                dialogVisible:false,
                form:{
                  keyword: "",
                }
            },
            SearchId:{
              dialogVisible:false,
              form:{
                level_id:"",
              }
            },
            SearchSelect:{
              dialogVisible:false,
            },
            Modify: {
                dialogVisible:false,
                form:{
                    title: "",
                    content: "",
                    audio_path: "",
                    video_path: "",
                }
            },
            postDialog: {
                dialogVisible: false,
                form: {
                    title: "",
                    content: "",
                    audio_path: "",
                    video_path: "",
                }
            },
            alertDialog: {
                "text": "登录成功",
                dialogVisible: false
            },
            alertRegisterDialog:{
                "text" : "注册成功",
                dialogVisible: false
            },
            state: {
                username: "",
                username_valid: false
            },
            messageList: [],
            infoList: [],
            usernameLogged: "unknown"
        }
    },
    methods: {
        post: function(title, content, audio_path, video_path) {
            console.log(title);
            console.log(content);
            //document.cookie = `user=${title}`;
            addmsg(title, content, audio_path, video_path).then((res) => {
                if (res.status == 201)
                    this.alertDialog.dialogVisible = true;
                else
                    this.alertDialog.dialogVisible = false;
            });
        },
        refreshList:()=> {
           getList().then((res)=>{
               console.log(res);

           });
        },
        postModify:(title,content,audio_path,video_path) => {
          console.log(title);
          console.log(content);
          console.log(audio_path);
          console.log(video_path);
        },
        postSearch:(keyword) => {
          console.log(keyword);
          searchBack(keyword).then((res)=>{
            console.log(res);
            for (var k = 0; k < res.length; k++) {
                this.messageList.push(res[k]);}
          });
        },
        postSearchId:(level_id) =>{
          console.log(level_id);
          const self=this;
          searchBackId(level_id).then((res)=>{
            console.log(this.messageList);
            this.messageList.push({
              'level_id': res['level_id'],
              'title': res['title'],
              'id':res['id'],
              'timestamp':new Date().getTime(),
            });
            console.log(self.messageList);
          });
        },
        loginCalled: function(usernameLogin, password) {
            window.console.log(usernameLogin);
            window.console.log(password);
            document.cookie = `user=${usernameLogin}`;
            login(usernameLogin, password).then((res)=> {
                  if (res.status == 200) {
                    this.alertDialog.dialogVisible = true;
                  } else {
                    this.alertDialog.dialogVisible = false;
                  }
                  return res.json();
                }
             ).then((r)=>{
               localStorage.setItem('token',r.token);
            });
              let Token = localStorage.getItem('token');
              console.log(Token);

            this.usernameLogged = usernameLogin;
        },
        registerCalled: (usernameRegister, password, password2) => {
            console.log(usernameRegister);
            document.cookie = `user=${usernameRegister}`;
            registerBack(usernameRegister, password, password2).then((res) => {
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
        changeRegister(){
            this.Register.dialogVisible = true;
        },
        changeLogin() {
            this.Login.dialogVisible = true;
        },
        changeSearchId(){
          this.SearchId.dialogVisible = true;
        },
        changeSearchWord(){
          this.Search.dialogVisible = true;
        },
        changeSearch(){
          this.SearchSelect.dialogVisible = true;
        },
        changeModify(){
          this.Modify.dialogVisible = true;
        },
        personShow(){
           getUserMsg().then((res)=>{
             console.log(res);
             console.log(typeof(res));
           });
        },
        getListMsg(){
            getList().then((res)=>{
              console.log(res);
              return res;
            }).then((itemList)=>{
              for(const Item of itemList ){
                console.log(Item['title']);
                console.log(Item['id']);
                console.log(Item['level_id']);
                this.messageList.push({
                  "title":Item['title'],
                  "id":Item['id'],
                  "level_id":Item["level_id"],
                  "timestamp":new Date().getTime()
                });
              }
            });
        },
        gotoPerson(){
          if(this.usernameLogged=="unknown") {
            this.$router.push({path: '/'});
            this.$router.go({path: '/'});
          } else
            this.$router.push({path:'/person'});
        },
        changeSelect(arg){
          if(arg=='0'){
            Search.dialogVisible = true;
          }else{
            SearchId.dialogVisible = true;
          }
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
