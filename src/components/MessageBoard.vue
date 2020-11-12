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
              <el-button style="display: inline-block;margin-right: 15px;" v-on:click="getListMsg()">
            <i class="el-icon-refresh">刷新</i>
          </el-button>
          <el-button style="display: inline-block;margin-right: 15px;text-decoration:None" v-on:click="this.$router.push({path:'/data'})">
                <router-link style="text-decoration:None" to='/data' >数据界面</router-link>
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
        <el-main>
            <el-form :inline="true" align="left" class="padding-10-0">
              <el-button style="vertical-align:middle;margin-left:15px;" v-on:click="clickSearch()" inline-block><i class="el-icon-zoom-in">搜索</i></el-button>
              <span style="vertical-align:middle" inline-block>
                <el-input style="vertical-align:middle;width:200px;margin-left:15px;" inline-block v-model="searchTmp" placeholder="输入搜索信息"></el-input>
              </span>
              <span inline-block>
                <el-dropdown style="vertical-align:middle;display: inline-block; text-align:right; margin-left:15px; margin-right:15px; " class="avatar-container" trigger="click" >
                  <div class="avatar-wrapper">
                    <el-button size="medium" v-model="searchKey">搜索类型:{{searchKey}}<i class="el-icon-caret-bottom" />
                    </el-button>
                    <el-dropdown-menu slot="dropdown" class="user-dropdown">
                      <el-dropdown-item>
                        <span style="display:block;" @click="searchSelection=1;searchKey='关键词搜索'">关键词搜索</span>
                      </el-dropdown-item>
                      <el-dropdown-item divided>
                        <span style="display:block;" @click="searchSelection=2;searchKey='数据搜索'">数据搜索</span>
                      </el-dropdown-item>
                      <el-dropdown-item divided>
                        <span style="display:block;" @click="searchSelection=3;searchKey='关卡搜索'">关卡搜索</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </span>
              <el-button style="align:right" v-on:click="Add.dialogVisible=true"><i class="el-icon-plus">增加</i></el-button>
            </el-form>
          <div class="c-content">
            <div class="c-search-table beauty-Scroll">
              <el-scrollbar>
                <template>
                  <el-tabs style="margin-top:15px;" v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="男性角色关卡" name="first">
                      <MessageList v-bind:messageList="messageListMale" v-on:RefreshMsg="this.$forceUpdate()"/>
                      <el-tree
                          :data="data"
                          node-key="id"
                          default-expand-all
                          @node-drag-start="handleDragStart"
                          @node-drag-enter="handleDragEnter"
                          @node-drag-leave="handleDragLeave"
                          @node-drag-over="handleDragOver"
                          @node-drag-end="handleDragEnd"
                          @node-drop="handleDrop"
                          draggable
                          :allow-drop="allowDrop"
                          :allow-drag="allowDrag">
                      </el-tree>
                    </el-tab-pane>
                    <el-tab-pane label="女性角色关卡" name="second">
                          <MessageList v-bind:messageList="messageListFemale" v-on:RefreshMsg="this.$forceUpdate()"/>
                     </el-tab-pane>
                    <el-tab-pane label="未知关卡" name="third">
                      <MessageList v-bind:messageList="messageListUnknown" v-on:RefreshMsg="this.$forceUpdate()"/>
                    </el-tab-pane>
                  </el-tabs>
                </template>
              </el-scrollbar>
            </div>
          </div>
        </el-main>
        <el-footer style="background-color:#87CEFA">@DIJKSTRA</el-footer>
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
    <Modify v-bind:dialog-visible="Modify.dialogVisible"
            v-on:closeModify="Modify.dialogVisible = false;"/>
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
import PostDialog from "@/components/PostDialog"
import Login from "@/components/Login"
import Register from "@/components/Register"
import Modify from "@/components/Modify"
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
        Modify,
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
      searchKey:{
        type:String,
        default:()=>"关键词搜索"
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
            messageListMale: [],
            messageListFemale: [],
            messageListUnknown: [],
            infoList: [],
            usernameLogged: "unknown",
            searchSelection: 1,
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
                    this.$message('已登录');
                  } else {
                    this.$message('登录失败');
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
            if(this.searchSelection == 1){
              searchBack(this.searchTmp).then((res)=>{
                console.log(res);
                if(res.status==200 || res.status == 201){
                  this.$message("查询成功");
                  for (var k = 0; k < res.length; k++) {
                    this.messageList.push(res[k]);}
                }else{
                  this.$message("查询失败");
                }
              });
            }else if(this.searchSelection == 2){
              searchBackId(Number(this.searchTmp)).then((res)=>{
                console.log(res);
                if(res.status==200 || res.status == 201){
                  this.$message("查询成功");
                  this.messageList.push({
                    'level_id': res.data.level_id,
                    'title': res.data.title,
                    'id':res.data.id,
                    'timestamp':new Date().getTime(),
                  });
                }else{
                  this.$message("查询失败");
                }
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
            }else if(this.searchSelection == 3){
                searchBackIdLevel(Number(this.searchTmp)).then((res)=>{
                  console.log(res);
                  if(res.status==200 || res.status == 201) {
                    this.$message("查询成功");
                    this.messageList.push({
                      'level_id': res['level_id'],
                      'title': res['title'],
                      'id': res['id'],
                      'timestamp': new Date().getTime(),
                    });
                  }else{
                    this.$message("查询失败");
                  }
                return res.json();
              }).then((r)=>{
                this.messageList.push({
                  'level_id': r['level_id'],
                  'title': r['title'],
                  'id':r['id'],
                  'timestamp':new Date().getTime(),
                });
              });
            }
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
        handleClick(tab, event) {
          console.log(tab, event);
        },
        getListMsg(){
            console.log("getListMsg");
            getList(1).then((res)=>{
              if(res != undefined){
                this.$message("拉取数据成功");
              }else{
                this.$message("拉取数据失败");
              }
              console.log(res);
              return res;
            }).then((itemList)=>{
              itemList = itemList["results"];
              for (const Item of itemList) {
                this.messageListMale.push({
                  "title": Item['title'],
                  "id": Item['id'],
                  "level_id": Item["level_id"],
                  "timestamp": new Date().getTime()
                });
              }
            });
            getList(2).then((res)=>{
              if(res != undefined){
                this.$message("拉取数据成功");
              }else{
                this.$message("拉取数据失败");
              }
              return res;
            }).then((itemList)=>{
              itemList = itemList["results"];
              console.log(itemList);
              for (const Item of itemList) {
                this.messageListFemale.push({
                  "title": Item['title'],
                  "id": Item['id'],
                  "level_id": Item["level_id"],
                  "timestamp": new Date().getTime()
                });
              }
              })
            getList(0).then((res)=>{
              if(res != undefined){
                this.$message("拉取数据成功");
              }else{
                this.$message("拉取数据失败");
              }
                return res;
            }).then((itemList)=> {
              itemList = itemList["results"];
              console.log(itemList);
              for (const Item of itemList) {
                  this.messageListUnknown.push({
                    "title": Item['title'],
                    "id": Item['id'],
                    "level_id": Item["level_id"],
                    "timestamp": new Date().getTime()
                  });
                }
            });
        },
        PwdModify(){
            this.ModifyPwd.dialogVisible = true;
        },
        PersonModify(){
            this.ModifyPerson.dialogVisible = true;
            getUserMsg().then((res)=>{
            if(res.status==200 || res.status == 201){
              this.$message("拉取信息成功");
            }else{
              this.$message("拉取信息失败");
            }
            return res.json();
          }).then((r)=>{
            console.log(r[0]);
            console.log(typeof(this.ModifyPerson.form.name));
            this.ModifyPerson.name=r[0].name;
            this.$emit("changePersonModify",{
              name:r[0].name,
              email:r[0].email,
              username:r[0].username,
            });
            })
        },
      handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      },

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
