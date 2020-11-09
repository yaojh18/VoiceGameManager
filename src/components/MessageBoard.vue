<template>
<div id="message-board">
    <el-container style="height:100%; border: 0px solid #eee">
        <el-header style="font-size: 10px;background-color:#87CEFA">
              <el-dropdown style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; " class="avatar-container" trigger="click" >
                <div class="avatar-wrapper">
                  <el-button type="default" size="medium"  >
                    <i class="el-icon-search" />
                    搜索
                  </el-button>
                  <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item>
                      <span style="display:block;" v-on:click="changeSearchId()" >根据关卡搜索</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                      <span style="display:block;" v-on:click="changeSearchWord()">根据关键词搜索</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                      <span style="display:block;" v-on:click="changeSearchData()">根据数据搜索</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </div>
              </el-dropdown>
          <el-dropdown style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; " class="avatar-container" trigger="click" >
            <div class="avatar-wrapper">
              <el-button type="default" size="medium"  >
                <i class="el-icon-data-analysis" />
                数据操作
              </el-button>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <el-dropdown-item>
                  <span style="display:block;" v-on:click="changeAdd()" ><i class="el-icon-edit">增加</i></span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span style="display:block;" v-on:click="changeModify()"><i class="el-icon-edit">修改</i></span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span style="display:block;" v-on:click="changeSearch()"><i class="el-icon-search">查询</i></span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span style="display:block;" v-on:click="changeDelete()"><i class="el-icon-delete">删除</i></span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </div>
          </el-dropdown>
              <el-dropdown style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; " class="avatar-container" trigger="click" >
                <div class="avatar-wrapper">
                  <el-button type="default" size="medium"  >
                    <i class="el-icon-user" />
                    个人信息操作
                  </el-button>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <el-dropdown-item :disabled="usernameLogged!='unknown'"
                                  :enabled="usernameLogged=='unknown'">
                  <span style="display:block;" v-on:click="changeLogin()" ><i class="el-icon-login">登录</i></span>
                </el-dropdown-item>
                <el-dropdown-item divided :disabled="usernameLogged!='unknown'"
                                  :enabled="usernameLogged=='unknown'">
                  <span style="display:block;" v-on:click="changeRegister()"><i class="el-icon-add">注册</i></span>
                </el-dropdown-item>
                <el-dropdown-item divided :disabled="usernameLogged=='unknown'"
                                  :enabled="usernameLogged!='unknown'">
                  <span style="display:block;" v-on:click="Logout.dialogVisible=true"><i class="el-icon-add">登出</i></span>
                </el-dropdown-item>
                <el-dropdown-item divided :disabled="usernameLogged=='unknown'"
                                  :enabled="usernameLogged!='unknown'">
                  <span style="display:block;" v-on:click="ModifyPwd.dialogVisible=true"><i class="el-icon-edit">修改密码</i></span>
                </el-dropdown-item>

              </el-dropdown-menu>
            </div>
          </el-dropdown>
          <el-button style="display: inline-block;margin-right: 15px;" v-on:click="getListMsg()">
            <i class="el-icon-edit">数据列表</i>
          </el-button>
          <el-button style="display: inline-block;margin-right: 15px;text-decoration:None" v-on:click="this.$router.push({path:'/data'})">
                <router-link style="text-decoration:None" to='/data' >数据界面</router-link>
            </el-button>
            <el-button style="display: inline-block;margin-right: 15px;text-decoration:None" v-on:click="this.$router.push({path:'/person'})">
                <router-link style="text-decoration:None" to='/person'>个人界面</router-link>
            </el-button>
          <el-dropdown style="align:right;display: inline-block; text-align:right; margin-right:3px; " class="avatar-container" trigger="click" >
            <div class="avatar-wrapper">
              <el-button type="primary" size="medium" v-model="usernameLogged"  v-bind="usernameLogged"
                         v-on:updateName="console.log('updateMsg');this.usernameLogged=localStorage.getItem('token');">
                <i class="el-icon-s-custom"/>
                {{usernameLogged}}
                <i class="el-icon-caret-bottom" />
              </el-button>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <el-dropdown-item>
                  <span style="display:block;" @click="gotoPerson()"><i class="el-icon-edit"/>个人信息修改</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span style="display:block;" @click="personShow()"><i class="el-icon-s-data"/>个人信息展示</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </div>
          </el-dropdown>
        </el-header>
        <el-main>
            <el-form :inline="true" align="left" class="padding-10-0">
              <span style="vertical-align:middle;margin-left:15px;" v-on:click="clickSearch()" inline-block><i class="el-icon-zoom-in">搜索</i></span>
              <span style="vertical-align:middle" inline-block>
                <el-input style="vertical-align:middle;width:200px;margin-left:15px;" inline-block placeholder="输入搜索信息"></el-input>
              </span>
              <span inline-block>
                <el-dropdown style="vertical-align:middle;display: inline-block; text-align:right; margin-left:15px; margin-right:15px; " class="avatar-container" trigger="click" >
                  <div class="avatar-wrapper">
                    <el-button size="medium">搜索类型<i class="el-icon-caret-bottom" />
                    </el-button>
                    <el-dropdown-menu slot="dropdown" class="user-dropdown">
                      <el-dropdown-item>
                        <span style="display:block;" @click="searchSelection=1">关键词搜索</span>
                      </el-dropdown-item>
                      <el-dropdown-item divided>
                        <span style="display:block;" @click="searchSelection=2">数据搜索</span>
                      </el-dropdown-item>
                      <el-dropdown-item divided>
                        <span style="display:block;" @click="searchSelection=3">关卡搜索</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </span>
            </el-form>
          <div class="c-content">
            <div class="c-search-table beauty-Scroll">
              <el-scrollbar>
                <MessageList v-bind:messageList="messageList" v-on:RefreshMsg="this.$forceUpdate()"
                v-on:uploadMsgTB="(choice,title,level_id,id)=>{
                  if(choice=='close'){
                     console.log(choice);
                  }else if(choice=='edit'){
                     console.log(choice);
                  }else if(choice=='detail'){
                     console.log(choice);
                  }
                  console.log(title,level_id,id);
                }">
                </MessageList>
              </el-scrollbar>
            </div>
          </div>
        </el-main>
        <el-footer style="background-color:#87CEFA">@DIJKSTRA</el-footer>
    </el-container>
    <ModifyPwd v-bind:dialog-visible="ModifyPwd.dialogVisible" v-on:cancelModifyPwd="ModifyPwd.dialogVisible=false"/>
    <Login v-bind:dialog-visible="Login.dialogVisible" v-on:cancelLogin="Login.dialogVisible=false" v-on:login="({usernameLogin,password})=>{
                Login.dialogVisible = false;
                loginCalled(usernameLogin,password);
            }" />
    <Register v-bind:dialog-visible="Register.dialogVisible"
              v-on:closeRegister="Register.dialogVisible=false"
              v-on:register="({usernameRegister,password,password2})=>{
                Register.dialogVisible = false;
                registerCalled(usernameRegister,password,password2);
            }" />
    <Add v-bind:dialog-visible="Add.dialogVisible"
         v-on:closeAdd="Add.dialogVisible=false"/>
    <PostDialog v-on:postmsg="({title,content,audio_path,video_path})=>{
            postDialog.dialogVisible = false;
            post(title,content,audio_path,video_path);
        }"
                v-bind:dialog-visible="postDialog.dialogVisible"
                v-on:cancelPostDialog="postDialog.dialogVisible=false" />
    <Logout v-bind:dialog-visible="Logout.dialogVisible"
            v-on:closeLogout="Logout.dialogVisible=false"
            v-on:logoutfunc="Logout.dialogVisible=false;logoutFuncCalled()"
            />
    <Modify v-bind:dialog-visible="Modify.dialogVisible"
            v-on:closeModify="Modify.dialogVisible = false;"/>
    <Delete v-bind:dialog-visible="Delete.dialogVisible"
            v-on:DeleteCalledAgain="({data_id})=>DeleteFuncCalled(data_id)"
            v-on:closeDelete="Delete.dialogVisible=false"/>
    <Search v-on:searchCalled="({keyword})=>{
            Search.dialogVisible = false;
            postSearch(keyword);
        }" v-bind:dialog-visible="Search.dialogVisible"
            v-on:closeSearch="Search.dialogVisible=false" />
   <SearchId v-on:searchIdCalled="({level_id})=>{
            SearchId.dialogVisible = false;
            postSearchIdLevel(level_id);
        }" v-bind:dialog-visible="SearchId.dialogVisible"
             v-on:cancel="SearchId.dialogVisible=false"
             v-on:closeSearchId="SearchId.dialogVisible=false"/>
   <SearchDataId v-on:searchDataIdCalled="({data_id})=>{
            SearchDataId.dialogVisible = false;
            postSearchId(data_id);
        }" v-bind:dialog-visible="SearchDataId.dialogVisible" v-on:closeSearchDataId="SearchDataId.dialogVisible=false" />

  <SearchSelect v-on:chooseSearchSelect="({arg})=>{SearchSelect.dialogVisible=false;changeSelect(arg)}"
                v-bind:dialog-visible="SearchSelect.dialogVisible"
                v-on:closeSearchSelect="SearchSelect.dialogVisible=false"/>
  <infoPerson   v-bind:dialog-visible="infoPerson.dialogVisible"
                v-on:closeinfoPerson="infoPerson.dialogVisible=false"
                v-bind:name="infoPerson.name"
                v-bind:last_login="infoPerson.last_login"
                v-bind:date_joined="infoPerson.date_joined"
                v-on:editinfoPerson="infoPerson.dialogVisible=false;this.$router.push({path:'/person'});"></infoPerson>
    <el-dialog style="text-align: center" :title="alertDialog.text" :visible.sync="alertDialog.dialogVisible" width="40%">
    </el-dialog>
    <el-dialog style="text-align: center" :title="alertRegisterDialog.text" :visible.sync="alertRegisterDialog.dialogVisible" width="40%">
    </el-dialog>
    <el-dialog style="text-align: center" :title="alertDeleteDialog.text" :visible.sync="alertDeleteDialog.dialogVisible" width="40%">
    </el-dialog>
</div>
</template>

<script>
import MessageList from "@/components/MessageList"
import PostDialog from "@/components/PostDialog"
import Login from "@/components/Login"
import Register from "@/components/Register"
import Modify from "@/components/Modify"
import Delete from "@/components/Delete"
import Search from "@/components/Search"
import SearchId from "@/components/SearchId"
import SearchDataId from "@/components/SearchDataId"
import SearchSelect from "@/components/SearchSelect"
import Logout from "@/components/Logout"
import ModifyPwd from "@/components/ModifyPwd"
import Add from "@/components/Add"
import infoPerson from "@/components/infoPerson"
import {
    addmsg,
    login,
    registerBack,
    searchBack,
    searchBackId,
    deleteMsg,
    searchBackIdLevel,
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
        SearchDataId,
        SearchSelect,
        Modify,
        infoPerson,
        Delete,
        Logout,
        ModifyPwd,
        Add
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
            Add:{
               dialogVisible: false,
               form: {
                title: this.title,
                content: this.content,
                 level_id:this.level_id,
              },
              formData: new FormData(),
            },
            infoPerson:{
                dialogVisible: false,
                form:{
                  name:this.name,
                  date_joined:this.date_joined,
                  last_login:this.last_login,
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
            SearchDataId:{
              dialogVisible:false,
              form:{
                data_id:"",
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
                    ID: 0,
                    dataId:0,
                }
            },
            Delete:{
                dialogVisible:false,
                form:{
                    data_id:"",
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
            alertDeleteDialog:{
                "text" : "删除成功",
                dialogVisible: false,
            },
            state: {
                username: "",
                username_valid: false
            },
            messageList: [],
            infoList: [],
            usernameLogged: "unknown",
            searchSelection: 0,
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
        postSearchIdLevel:(level_id)=>{
          console.log(level_id);
          searchBackIdLevel(level_id).then((res)=>{
            console.log(res);
            console.log(res);
            this.messageList.push({
              'level_id': res['level_id'],
              'title': res['title'],
              'id':res['id'],
              'timestamp':new Date().getTime(),
            });
            return res.json();
          }).then((r)=>{
            console.log(r);
            this.messageList.push({
              'level_id': r['level_id'],
              'title': r['title'],
              'id':r['id'],
              'timestamp':new Date().getTime(),
            });
          });
        },
      postSearchId : function(data_id) {
        console.log(data_id);
        searchBackId(data_id).then((res)=>{
          console.log(res);
          console.log(res.data);
          this.messageList.push({
            'level_id': res.data.level_id,
            'title': res.data.title,
            'id':res.data.id,
            'timestamp':new Date().getTime(),
          });
          return res.json();
        }).then((r)=>{
          console.log(r);
          console.log(typeof(r));
          this.messageList.push({
            'level_id': r['level_id'],
            'title': r['title'],
            'id':r['id'],
            'timestamp':new Date().getTime(),
          });
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
               console.log(r.token);
               localStorage.setItem('token',r.token);
            });
              let Token = localStorage.getItem('token');
              console.log(Token);
            this.usernameLogged = usernameLogin;
        localStorage.setItem('name',usernameLogin);
        },
        DeleteFuncCalled : (data_id)=>{
          deleteMsg(data_id).then((res)=>{
              console.log(res);
              if(res.status == 200){
                this.alertDeleteDialog.dialogVisible= true;
              }else{
                this.alertDeleteDialog.dialogVisible= false;
              }
          });
        },
        registerCalled: function(usernameRegister, password, password2)  {
            console.log(usernameRegister);
            document.cookie = `user=${usernameRegister}`;
            registerBack(usernameRegister, password, password2).then((res) => {
                console.log(res.status);
                console.log(typeof(res));
                if (res.status === 201) {
                   this.alertRegisterDialog.dialogVisible = true;
                } else {
                  this.alertRegisterDialog.dialogVisible = false;
                }
                return res.json();
            }).then((r)=>{
              localStorage.setItem('token',r.token);
            });
            let Token = localStorage.getItem('token');
            console.log(Token);
            console.log(usernameRegister);
            this.usernameLogged = usernameRegister;
            localStorage.setItem('name',usernameRegister);
        },
        changeAdd(){
        this.Add.dialogVisible=true;
        },
        add(msg) {
            this.messageList.push(msg);
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
        changeSearchData(){
          this.SearchDataId.dialogVisible = true;
        },
        changeSearch(){
          this.SearchSelect.dialogVisible = true;
        },
        changeModify(){
          this.Modify.dialogVisible = true;
        },
        changeDelete(){
          this.Delete.dialogVisible = true;
        },
        logoutFuncCalled(){
          console.log(this.usernameLogged);
          this.usernameLogged="unknown";
          localStorage.setItem('token','');
          localStorage.setItem('name','unknown');
          this.dialogVisible = false;
        },
        personShow(){
           getUserMsg().then((res)=>{
             console.log(res);
             console.log(typeof(res));
             return res.json();
           }).then((r)=>{
             console.log(r);
             console.log(r[0].username);
             console.log(r[0].last_login);
             console.log(r[0].date_joined);
             this.infoPerson.name=r[0].username;
             this.infoPerson.last_login=r[0].last_login;
             this.infoPerson.date_joined=r[0].date_joined;
             console.log(this.infoPerson.name);
             //this.$emit('infoPersonChange',{name:r[0].username,last_login:r[0].last_login,date_joined:r[0].date_joined});
             this.infoPerson.dialogVisible = true;
           });
        },
        getListMsg(){
            getList().then((res)=>{
              console.log(res);
              return res;
            }).then((itemList)=>{
              for(const Item of itemList ){
                this.messageList.push({
                  "title":Item['title'],
                  "id":Item['id'],
                  "level_id":Item["level_id"],
                  "timestamp":new Date().getTime()
                });
                console.log(this.messageList)
              }
              this.$emit("RefreshMsg");
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
            this.Search.dialogVisible = true;
            this.SearchSelect.dialogVisible = false;
          }else if(arg=='1'){
            this.SearchId.dialogVisible = true;
            this.SearchSelect.dialogVisible = false;
          }else{
            this.SearchDataId.dialogVisible = true;
            this.SearchSelect.dialogVisible = false;
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


.scroll {
  height: 100px;
  overflow-y: hidden;
}
.el-scrollbar{
  height: 100%;
}
/*.el-scrollbar__bar{
  &.is-vertical{
    width:100px;//滚动条宽度
  }
}*/
.el-scrollbar__wrap{
  overflow-y: auto;
  overflow-x:hidden;
}
.el-scrollbar__thumb {
    background-color: #e3e3e3;
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
.c-search-table{
  width: 100%;
}
.beauty-Scroll{
  .el-scrollbar{
    height: 100%; /*此处一定要设置高度，不然内层的计算属性不生效*/
  }
  .el-scrollbar__wrap {
  }
}
.el-dialog__wrapper{
  .el-dialog__body{
    padding: 20px 20px 10px;
    .deleteForm{
      .errorTip{
        color: red;
        font-size: 14px;
        line-height: 20px;
        margin: 5px auto;
      }
      .el-form-item{
        margin: 0;
        .el-form-item__label{
          width: 90px;
        }
        .el-select,.el-input{
          width: 250px;
        }
      }
    }
  }
  .el-dialog__footer{
    padding-bottom: 15px;
    padding-top: 5px;
  }
}
</style>
