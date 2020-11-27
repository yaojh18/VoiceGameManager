<template>
<div id="message-board" style="overflow:scroll;overflow-y:hidden">
    <el-container style="height:100%; border: 0 solid #eee">
        <el-header style="text-align:right;background-color:#87CEFA">
            <el-button style="margin-right: 15px" v-on:click="this.$router.push({path:'/data'})">
                <router-link style="text-decoration:None" to='/data' >数据统计</router-link>
            </el-button>
            <el-dropdown style="text-align:right; margin-right:3px" class="avatar-container" trigger="click" >
                <div class="avatar-wrapper">
                    <el-button type="primary" v-model="usernameLogged"
                         v-on:updateName="console.log('updateMsg');this.usernameLogged=localStorage.getItem('token');">
                        <i class="el-icon-s-custom"/>
                            {{usernameLogged}}
                        <i class="el-icon-caret-bottom" />
                    </el-button>
                    <el-dropdown-menu slot="dropdown" class="user-dropdown">
                        <el-dropdown-item :disabled="usernameLogged==='unknown'"
                                          :enabled="usernameLogged!=='unknown'">
                            <span style="display:block;" @click="PersonModify" ><i class="el-icon-edit"/>个人信息修改</span>
                        </el-dropdown-item>
                        <el-dropdown-item divided :disabled="usernameLogged==='unknown'"
                                          :enabled="usernameLogged!=='unknown'">
                            <span style="display:block;" @click="PwdModify" ><i class="el-icon-s-data"/>个人密码修改</span>
                        </el-dropdown-item>
                        <el-dropdown-item divided :disabled="usernameLogged!=='unknown'"
                                                :enabled="usernameLogged==='unknown'">
                            <span style="display:block;" v-on:click="changeLogin()" ><i class="el-icon-login">登录</i></span>
                        </el-dropdown-item>
                        <el-dropdown-item divided :disabled="usernameLogged!=='unknown'"
                                                :enabled="usernameLogged==='unknown'">
                            <span style="display:block;" v-on:click="changeRegister()"><i class="el-icon-add">注册</i></span>
                        </el-dropdown-item>
                        <el-dropdown-item divided :disabled="usernameLogged==='unknown'"
                                                :enabled="usernameLogged!=='unknown'">
                            <span style="display:block;" v-on:click="Logout.dialogVisible=true"><i class="el-icon-add">登出</i></span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </div>
            </el-dropdown>
        </el-header>
        <el-main >
            <el-form :inline="true" style="text-align:left;">
                <el-form-item style="float:right;margin: 0 0 10px 0">
                    <el-button style="margin-right: 15px;" v-on:click="getListMsg()">
                        <i class="el-icon-refresh">拉取所有数据</i>
                    </el-button>
                    <el-button v-on:click="Add.dialogVisible=true">
                        <i class="el-icon-plus">增加</i>
                    </el-button>
                </el-form-item>
                <el-form-item style="display: block;margin: 0 0 10px 0">
                    <el-input style="vertical-align:middle;width:318px;margin-right:15px" v-model="searchTmp" placeholder="输入搜索信息">
                        <template slot="prepend">标题关键词</template>
                    </el-input>
                    <el-input style="vertical-align:middle;width:318px;margin-right:15px" v-model="searchTmpLevelId" placeholder="输入搜索信息">
                        <template slot="prepend">关卡号</template>
                    </el-input>
                </el-form-item>
                <el-form-item style="display: block;margin: 0 0 10px 0">
                    <div class="el-input-group__prepend" style="display:inline-table">搜索类型</div>
                    <el-select v-model="selectValue" placeholder="请选择" style="margin-right: 15px;">
                        <el-option label="所有类型关卡" value=-1></el-option>
                        <el-option label="男性角色关卡" value=1></el-option>
                        <el-option label="女性角色关卡" value=2></el-option>
                        <el-option label="其他关卡" value=0></el-option>
                    </el-select>
                    <el-button style="vertical-align:middle;margin-right:15px;color:white;background-color:#87CEFA" v-on:click="clickSearch()">
                        <i class="el-icon-zoom-in">搜索</i>
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="c-content">
                <div class="c-search-table beauty-Scroll">
                    <el-scrollbar>
                        <template>
                            <el-tabs style="margin-top:30px;font-size:12px" v-model="choiceTypeId" type="card">
                            <el-tab-pane size="mini" label="男性角色关卡" name='1'>
                                <MessageList
                                        v-bind:messageList="messageListMalePart"
                                        v-on:RefreshMsg="this.$forceUpdate()"
                                        @modifySucceed="getListMsg"
                                />
                                <el-pagination
                                    id="pag1"
                                    background
                                    layout="prev, pager, next"
                                    :page-size="8"
                                    @current-change="handleCurrentChangepag1"
                                    :total="listMaleCnt">
                                </el-pagination>
                            </el-tab-pane>
                            <el-tab-pane size="mini" label="女性角色关卡" name='2'>
                                <MessageList
                                        v-bind:messageList="messageListFemalePart"
                                        v-on:RefreshMsg="this.$forceUpdate()"
                                        @modifySucceed="getListMsg"
                                />
                                <el-pagination
                                    id="pag2"
                                    background
                                    layout="prev, pager, next"
                                    :page-size="8"
                                    @current-change="handleCurrentChangepag2"
                                    :total="listFemaleCnt">
                                </el-pagination>
                            </el-tab-pane>
                            <el-tab-pane size="mini" label="其他关卡" name='0'>
                                <MessageList
                                        v-bind:messageList="messageListUnknownPart"
                                        v-on:RefreshMsg="this.$forceUpdate()"
                                        @modifySucceed="getListMsg"
                                />
                                <el-pagination
                                    id="pag3"
                                    background
                                    layout="prev, pager, next"
                                    :page-size="8"
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
                  :username="usernameLogged"
    />
    <ModifyPwd v-bind:dialog-visible="ModifyPwd.dialogVisible"
               v-on:cancelModifyPwd="ModifyPwd.dialogVisible=false"
               :username="usernameLogged"
    />
    <Login v-bind:dialog-visible="Login.dialogVisible"
           v-on:cancelLogin="Login.dialogVisible=false"
           v-on:login="({usernameLogin,password})=>{
                loginCalled(usernameLogin,password);
            }" />
    <Register v-bind:dialog-visible="Register.dialogVisible"
              v-on:closeRegister="Register.dialogVisible=false"
              v-on:register="({usernameRegister,password,password2})=>{
                registerCalled(usernameRegister,password,password2);
            }" />
    <Add v-bind:dialog-visible="Add.dialogVisible"
         v-on:closeAdd="Add.dialogVisible=false"
         @addSucceed="getListMsg"
    />
    <Logout v-bind:dialog-visible="Logout.dialogVisible"
            v-on:closeLogout="Logout.dialogVisible=false"
            v-on:logoutfunc="Logout.dialogVisible=false;logoutFuncCalled()"
            />
</div>
</template>
<script>
import MessageList from "@/components/MessageList"
import Login from "@/components/Login"
import Register from "@/components/Register"
import Logout from "@/components/Logout"
import ModifyPwd from "@/components/ModifyPwd"
import ModifyPerson from "@/components/ModifyPerson"
import Add from "@/components/Add"
import {
    login,
    registerBack,
    searchBack,
    getList,
} from "@/utils/communication"
export default {
    name: "MessageBoard",
    components: {
        MessageList,
        Register,
        Login,
        Logout,
        ModifyPwd,
        ModifyPerson,
        Add
    },
    props:{
        searchTmp:{
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
            type:String,
            default :()=>'1'
      }
    },
    data() {
        return {
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
            },
            ModifyPerson:{
                dialogVisible: false,
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
            Register: {
                dialogVisible: false,
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
                    audio_path: "",
                    video_path: "",
                }
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
            selectValue: '所有类型关卡',
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
        loginCalled: function(usernameLogin, password) {
            this.Login.dialogVisible = false;
            let that = this
            login(usernameLogin, password).then((res)=> {
                if (res.status === 200) {
                    this.$message({
                        message: '登陆成功',
                        type: "info",
                        duration: 1000,
                    });
                    res.json().then(function (data) {
                        console.log(data)
                        localStorage.setItem('token',data.token);
                        console.log(localStorage)
                        that.usernameLogged = usernameLogin;
                        console.log('usernamelogin')
                        localStorage.setItem('name',usernameLogin);
                        that.getListMsg();
                        console.log(localStorage)
                    });
                } else {
                    this.$message({
                        message: '登录失败',
                        type: "warning",
                        duration: 1000,
                    });
                }
            })
        },
        initData(){
              this.messageListMalePart = [];
              this.messageListFemalePart = [];
              this.messageListUnknownPart = [];
              this.messageListMale = [];
              this.messageListFemale = [];
              this.messageListUnknown = [];
              this.listMaleCnt = 0;
              this.listFemaleCnt = 0;
              this.listUnknownCnt = 0;
        },
        registerCalled: function(usernameRegister, password, password2)  {
            this.Register.dialogVisible = false;
            let that = this
            registerBack(usernameRegister, password, password2).then((res) => {
                if (res.status === 201) {
                    this.$message({
                        message: '注册成功',
                        type: "info",
                        duration: 1000,
                    });
                    res.json().then(function (data) {
                        localStorage.setItem('token',data.token);
                        that.usernameLogged = usernameRegister;
                        localStorage.setItem('name',usernameRegister);
                        that.getListMsg();
                    });
                } else {
                    this.$message({
                        message: '注册失败',
                        type: "warning",
                        duration: 1000,
                    });
                }
            })
        },
        changeAdd(){
            this.Add.dialogVisible=true;
        },
        changeRegister(){
            this.Register.dialogVisible = true;
        },
        changeLogin() {
            this.Login.dialogVisible = true;
        },
        clickSearch(){
            this.initData();
            let that = this
            let r = "?";
            if(this.selectValue >= 0){
                r += "type_id=" + String(this.selectValue) + "&&";
            }
            if(this.searchTmp !== ''&&this.searchTmp!==undefined)
                r += 'title=' + this.searchTmp +"&&";
            if(this.searchTmpLevelId!==''&&this.searchTmpLevelId!==undefined)
                r += 'level_id=' + String(this.searchTmpLevelId - 1) +"&&";
            if(r==='?') {
                this.$message("输入错误");
            }else {
                r = r.slice(0,-2);
                console.log(r)
                searchBack(r).then((response)=>{
                    if(response.status === 200 || response.status === 201){
                        this.$message("查询成功");
                    }else{
                        this.$message("查询失败");
                    }
                    return response.json();
                }).then((res)=>{
                    res = res.results;
                    for ( const item of res){
                        this.listUnknownCnt += 1;
                        if(item.type_id === 0){
                            this.messageListUnknown.push({
                              'level_id': item.level_id,
                              'title': item.title,
                              'id':item.id,
                              'type_id':item.type_id,
                              'content':item.content,
                              'timestamp':new Date().getTime(),
                            });
                            this.messageListUnknownPart = this.messageListUnknown.slice(0,4);
                        }else if(item.type_id === 1){
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
                        }else if(item.type_id === 2){
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
                    if (that.selectValue >= 0)
                        that.choiceTypeId = String(that.selectValue)
                });
            }
        },
        logoutFuncCalled(){
            this.usernameLogged = "unknown";
            localStorage.setItem('token','');
            localStorage.setItem('name','unknown');
            this.initData()
            this.$message('登出成功')
        },
        getListMsg(){
            this.messageListMale = [];
            this.messageListFemale = [];
            this.messageListUnknown = [];
            getList(1).then((res)=>{
                if(res !== undefined){
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
              return res;
            }).then((itemList)=>{
                itemList = itemList["results"];
                this.listMaleCnt = 0;
                for (const Item of itemList) {
                    this.listMaleCnt += 1;
                    this.messageListMale.push({
                        "title": Item['title'],
                        "id": Item['id'],
                        "level_id": Item["level_id"],
                        "content":Item["content"],
                        "timestamp": new Date().getTime()
                });
              }
              this.messageListMalePart = this.messageListMale.slice(0,8);
            });
            getList(2).then((res)=>{
                return res;
            }).then((itemList)=>{
                itemList = itemList["results"];
                this.listFemaleCnt = 0;
                for (const Item of itemList) {
                    this.listFemaleCnt += 1;
                    this.messageListFemale.push({
                        "title": Item['title'],
                        "id": Item['id'],
                        "level_id": Item["level_id"],
                        "content":Item["content"],
                        "timestamp": new Date().getTime()
                });
              }
              this.messageListFemalePart = this.messageListFemale.slice(0,8);
            })
            getList(0).then((res)=>{
                return res;
            }).then((itemList)=> {
                itemList = itemList["results"];
                this.listUnknownCnt = 0;
                for (const Item of itemList) {
                    this.listUnknownCnt += 1;
                    this.messageListUnknown.push({
                        "title": Item['title'],
                        "id": Item['id'],
                        "level_id": Item["level_id"],
                        "content":Item["content"],
                        "timestamp": new Date().getTime()
                    });
                }
                this.messageListUnknownPart = this.messageListUnknown.slice(0,8);
            });
        },
        handleCurrentChangepag1(val){
            this.messageListMalePart = this.messageListMale.slice((val-1)*8,val*8);
        },
        handleCurrentChangepag2(val){
            this.messageListFemalePart = this.messageListFemale.slice((val-1)*8,val*8);
        },
        handleCurrentChangepag3(val){
            this.messageListUnknownPart = this.messageListUnknown.slice((val-1)*8,val*8);
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
.el-pagination{
    margin-top: 20px;
}
</style>
