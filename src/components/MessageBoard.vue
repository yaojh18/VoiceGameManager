<template>
<div id="message-board" style="overflow:-Scroll;overflow-y:hidden">
    <el-container style="height:100%; border: 0px solid #eee">
        <el-header style="align:right;text-align:right;height:55px;font-size:10px;background-color:#87CEFA">
              <el-button size="mini" style="color:black;display:inline-block;margin-right: 15px;" v-on:click="getListMsg()">
            <i class="el-icon-refresh">拉取所有数据</i>
          </el-button>
          <el-button size="mini" style="color:black;display: inline-block;margin-right: 15px;text-decoration:None" v-on:click="this.$router.push({path:'/data'})">
                <router-link style="text-decoration:None" to='/data' >数据界面</router-link>
            </el-button>
          <el-dropdown style="align:right;display: inline-block; text-align:right; margin-right:3px; " class="avatar-container" trigger="click" >
            <div class="avatar-wrapper">
              <el-button size="mini" type="primary" v-model="usernameLogged"  v-bind="usernameLogged"
                         v-on:updateName="console.log('updateMsg');this.usernameLogged=localStorage.getItem('token');">
                <i class="el-icon-s-custom"/>
                {{usernameLogged}}
                <i class="el-icon-caret-bottom" />
              </el-button>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <el-dropdown-item :disabled="usernameLogged=='unknown'"
                                  :enabled="usernameLogged!='unknown'">
                  <span style="display:block;" @click="PersonModify()" ><i class="el-icon-edit"/>个人信息修改</span>
                </el-dropdown-item>
                <el-dropdown-item divided :disabled="usernameLogged=='unknown'"
                                  :enabled="usernameLogged!='unknown'">
                  <span style="display:block;" @click="PwdModify()" ><i class="el-icon-s-data"/>个人密码修改</span>
                </el-dropdown-item>
                <el-dropdown-item divided :disabled="usernameLogged!='unknown'"
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
              </el-dropdown-menu>
            </div>
          </el-dropdown>
        </el-header>
        <el-main >
            <el-form :inline="true" align="left" style="margin:1px auto;padding:0px">
              <el-button size="mini" style="vertical-align:middle;margin-left:15px;" v-on:click="clickSearch()" inline-block><i class="el-icon-zoom-in">搜索</i></el-button>
              <el-form-item>
                  <el-button style="vertical-align:top;height:40px;display:block;margin-left:5px" disabled >关键词搜索</el-button>
                  <el-input size="mini" style="vertical-align:middle;width:200px;margin-left:15px;" inline-block v-model="searchTmp" placeholder="输入搜索信息"></el-input>
              </el-form-item><el-form-item>
                  <el-button style="vertical-align:top;height:40px;display:block;" disabled>关卡搜索</el-button>
                  <el-input size="mini" style="vertical-align:middle;width:200px;margin-left:15px;" inline-block v-model="searchTmpLevelId" placeholder="输入搜索信息"></el-input>
            </el-form-item>
              <el-radio size="mini" style="margin-left:1px;" v-model="radioTypeId" label="1" border>在全部类型中搜索</el-radio>
              <el-radio size="mini" v-model="radioTypeId" label="2" border>选定类型中搜索</el-radio>
              <el-button size="mini" style="margin-left:15px;align:right" v-on:click="Add.dialogVisible=true"><i class="el-icon-plus">增加</i></el-button>
            </el-form>
          <div class="c-content">
            <div class="c-search-table beauty-Scroll">
              <el-scrollbar>
                <template>
                  <el-tabs style="margin-top:3px;font-size:12px" v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane size="mini" label="男性角色关卡" name="first">
                      <MessageList v-bind:messageList="messageListMalePart" v-on:RefreshMsg="this.$forceUpdate()"/>
                      <el-pagination
                          id="pag1"
                          small
                          layout="prev, pager, next"
                          :page-size="4"
                          @current-change="handleCurrentChangepag1"
                          :total="listMaleCnt">
                      </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane size="mini" label="女性角色关卡" name="second">
                          <MessageList v-bind:messageList="messageListFemalePart" v-on:RefreshMsg="this.$forceUpdate()"/>
                      <el-pagination
                          id="pag2"
                          small
                          layout="prev, pager, next"
                          :page-size="4"
                          @current-change="handleCurrentChangepag2"
                          :total="listFemaleCnt">
                      </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane size="mini" label="未知关卡" name="third">
                      <MessageList v-bind:messageList="messageListUnknownPart" v-on:RefreshMsg="this.$forceUpdate()"/>
                      <el-pagination
                          id="pag3"
                          small
                          layout="prev, pager, next"
                          :page-size="4"
                          @current-change="handleCurrentChangepag3"
                          :total="listUnknownCnt">
                      </el-pagination>
                    </el-tab-pane>
                  </el-tabs>
                </template>
              </el-scrollbar>
            </div>
          </div>
        </el-main>
        <el-footer style="margin:5px;vertical-align:center;background-color:#87CEFA;height:37px;font-size:12px">
          <br>@DIJKSTRA
        </el-footer>
    </el-container>
    <ModifyPerson v-bind:dialog-visible="ModifyPerson.dialogVisible"
                  v-on:cancelModifyPerson="ModifyPerson.dialogVisible=false"
                  v-bind:name="ModifyPerson.name"
                  v-bind:email="ModifyPerson.email"
                  v-bind:username="ModifyPerson.username"
    />
    <ModifyPwd v-bind:dialog-visible="ModifyPwd.dialogVisible"
               v-on:cancelModifyPwd="ModifyPwd.dialogVisible=false"/>
    <Login v-bind:dialog-visible="Login.dialogVisible"
           v-on:cancelLogin="Login.dialogVisible=false"
           v-on:login="({usernameLogin,password})=>{
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
    <Logout v-bind:dialog-visible="Logout.dialogVisible"
            v-on:closeLogout="Logout.dialogVisible=false"
            v-on:logoutfunc="Logout.dialogVisible=false;logoutFuncCalled()"
            />
    <Delete v-bind:dialog-visible="Delete.dialogVisible"
            v-on:DeleteCalledAgain="({data_id})=>DeleteFuncCalled(data_id)"
            v-on:closeDelete="Delete.dialogVisible=false"/>
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
import Login from "@/components/Login"
import Register from "@/components/Register"
import Delete from "@/components/Delete"
import Logout from "@/components/Logout"
import ModifyPwd from "@/components/ModifyPwd"
import ModifyPerson from "@/components/ModifyPerson"
import Add from "@/components/Add"
import infoPerson from "@/components/infoPerson"
import {
    addmsg,
    login,
    registerBack,
    searchBack,
    deleteMsg,
    getList,
} from "@/utils/communication"
export default {
    name: "MessageBoard",
    components: {
        MessageList,
        Register,
        Login,
        infoPerson,
        Delete,
        Logout,
        ModifyPwd,
        ModifyPerson,
        Add
    },
    props:{
      searchTmp:{
        type:String,
      },
      searchTmpId:{
        type:String,
      },
      searchTmpLevelId:{
        type:String,
      },
      searchKey:{
        type:String,
        default:()=>"关键词搜索"
      },
      choiceTypeId:{
        type:Number,
        default :()=>1
      }
    },
    data() {
        return {
            activeName: 'first',
            Login: {
                dialogVisible: false,
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
                  password3: "",
                }
            },
          ModifyPerson:{
            dialogVisible: false,
            form:{
              username:this.username,
              name:this.name,
              email:this.email,
            }
          },
            Add:{
               dialogVisible: false,
               form: {
                title: this.title,
                content: this.content,
                 level_id:this.level_id,
                 type_id:this.type_id,
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
            messageListMale: [],
            messageListFemale: [],
            messageListUnknown: [],
            messageListMalePart: [],
            messageListFemalePart: [],
            messageListUnknownPart: [],
            infoList: [],
            usernameLogged: "unknown",
            searchSelection: 1,
            listMaleCnt:0,
            listFemaleCnt:0,
            listUnknownCnt:0,
            radioTypeId:'1',
          data:[{
            id: 1,
            label: "1",
          },{
            id:2,
            label: "2",
          },{
            id:3,
            label: "3",
          },{
            id:4,
            label: "4",
          },{
            id:5,
            label: "5",
          },{
            id:6,
            label: "6",
          }],
          defaultProps: {
            label: 'label'
          },
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
      loginCalled: function(usernameLogin, password) {
            document.cookie = `user=${usernameLogin}`;
            login(usernameLogin, password).then((res)=> {
                  if (res.status == 200) {
                    this.$message({
                        message: '已登录',
                        type: "info",
                        duration: 3000,
                    });
                  } else {
                    this.$message({
                        message: '登录失败',
                        type: "warning",
                        duration: 3000,
                    });
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
              this.getListMsg();
              this.Login.dialogVisible = false;
        },
        initData(){
              this.messageListMalePart = [],
              this.messageListFemalePart = [],
                  this.messageListUnknownPart = [],
                  this.messageListMale = [],
                  this.messageListFemale = [],
                  this.messageListUnknown = [],
                  this.listMaleCnt = 0;
                  this.listFemaleCnt = 0;
                  this.listUnknownCnt = 0;
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
        changeDialog() {
            this.postDialog.dialogVisible = true;
        },
        changeRegister(){
            this.Register.dialogVisible = true;
        },
        changeLogin() {
            this.Login.dialogVisible = true;
        },
        clickSearch(){
            this.initData();
            let r = "?";
            if(this.radioTypeId==2){
              r += "type_id=" + String(this.choiceTypeId%3) + "&&";
            }
            if(this.searchTmp!=''&&this.searchTmp!=undefined)
              r += 'title=' + this.searchTmp +"&&";
            if(this.searchTmpId!=''&&this.searchTmpId!=undefined)
              r += 'id=' + String(this.searchTmpId) + "&&";
            if(this.searchTmpLevelId!=''&&this.searchTmpLevelId!=undefined)
              r += 'level_id=' + String(this.searchTmpLevelId) +"&&";
            if(r=='?') {
              this.$message("输入错误");
            }else {
              r = r.slice(0,-2);
              console.log(r);
              this.$message("输入合法");
              searchBack(r).then((res)=>{
                console.log(res);
                if(res.status==200 || res.status == 201){
                  this.$message("查询成功");
                }else{
                  this.$message("查询失败");
                }
                return res.json();
              }).then((r)=>{
                console.log(r);
                r = r.results;
                for ( const item of r){
                  this.listUnknownCnt += 1;
                  if(item.type_id == 0){
                    this.messageListUnknown.push({
                      'level_id': item.level_id,
                      'title': item.title,
                      'id':item.id,
                      'type_id':item.type_id,
                      'content':item.content,
                      'timestamp':new Date().getTime(),
                    });
                    this.messageListUnknownPart = this.messageListUnknown.slice(0,4);
                  }else if(item.type_id == 1){
                    this.listMaleCnt += 1;
                    this.messageListMale.push({
                      'level_id': item.level_id,
                      'title': item.title,
                      'id':item.id,
                      'type_id':item.type_id,
                      'content':item.content,
                      'timestamp':new Date().getTime(),
                    });
                    this.messageListMalePart = this.messageListMale.slice(0,4);
                  }else if(item.type_id == 2){
                    this.listFemaleCnt += 1;
                    this.messageListFemale.push({
                      'level_id': item.level_id,
                      'title': item.title,
                      'id':item.id,
                      'type_id':item.type_id,
                      'content':item.content,
                      'timestamp':new Date().getTime(),
                    });
                    this.messageListFemalePart = this.messageListFemale.slice(0,4);
                  }
                }
              });
            }
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
        handleClick(tab, event) {
          console.log(event);
          if(tab.name=='first'){
            this.choiceTypeId=2;
          }else if(tab.name=='second'){
            this.choiceTypeId=3;
          }else if(tab.name=='third'){
            this.choiceTypeId=1;
          }
        },
        getListMsg(){
            this.messageListMale = [];
            this.messageListFemale = [];
            this.messageListUnknown = [];
            console.log("getListMsg");
            getList(1).then((res)=>{
              if(res != undefined){
                this.$message(
                    {
                      message: "拉取数据成功",
                      duration: 2000,
                    }
               );
              }else{
                this.$message({
                  message: "拉取数据失败",
                  duration: 2000,

              });}
              console.log(res);
              return res;
            }).then((itemList)=>{
              itemList = itemList["results"];
              this.listMaleCnt = 0;
              for (const Item of itemList) {
                console.log(Item["content"]);
                this.listMaleCnt += 1;
                this.messageListMale.push({
                  "title": Item['title'],
                  "id": Item['id'],
                  "level_id": Item["level_id"],
                  "content":Item["content"],
                  "timestamp": new Date().getTime()
                });
              }
              console.log(this.listMaleCnt);
              this.messageListMalePart = this.messageListMale.slice(0,4);
            });
            getList(2).then((res)=>{
              return res;
            }).then((itemList)=>{
              itemList = itemList["results"];
              this.listFemaleCnt = 0;
              for (const Item of itemList) {
                console.log(Item["content"]);
                this.listFemaleCnt += 1;
                this.messageListFemale.push({
                  "title": Item['title'],
                  "id": Item['id'],
                  "level_id": Item["level_id"],
                  "content":Item["content"],
                  "timestamp": new Date().getTime()
                });
              }
              this.messageListFemalePart = this.messageListFemale.slice(0,4);
            })
            getList(0).then((res)=>{
                return res;
            }).then((itemList)=> {
              itemList = itemList["results"];
              this.listUnknownCnt = 0;
              for (const Item of itemList) {
                console.log(Item["content"]);
                  this.listUnknownCnt += 1;
                  this.messageListUnknown.push({
                    "title": Item['title'],
                    "id": Item['id'],
                    "level_id": Item["level_id"],
                    "content":Item["content"],
                    "timestamp": new Date().getTime()
                  });
                }
              this.messageListUnknownPart = this.messageListUnknown.slice(0,4);
            });
            console.log(this.messageListMalePart);
        },
        handleCurrentChangepag1(val){
            this.messageListMalePart = this.messageListMale.slice((val-1)*4,val*4);
        },
        handleCurrentChangepag2(val){
            this.messageListFemalePart = this.messageListFemale.slice((val-1)*4,val*4);
        },
        handleCurrentChangepag3(val){
            this.messageListUnknownPart = this.messageListUnknown.slice((val-1)*4,val*4);
        },
        PwdModify(){
            this.ModifyPwd.dialogVisible = true;
        },
        PersonModify(){
            this.ModifyPerson.dialogVisible = true;
        },

    },
    mounted(){
      this.$nextTick(() => {
        this.getListMsg();
      });
    },
    created(){
      let r = localStorage.getItem('name');
      console.log(r);
      if(r){
        this.usernameLogged = localStorage.getItem('name');
      }
  }
}
</script>

<style scoped>
#message-board {
    height: calc(100vh - 16px);
}

.message-tab {
    display: block;
    padding: 3px;
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
        margin: 2px auto;
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
