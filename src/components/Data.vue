<template>
<div id="message-board" style="overflow:scroll;overflow-y:hidden">
    <el-container class="app" style="height:100%; border: 0 solid #eee" >
        <el-header style="padding: 0">
            <el-menu mode="horizontal"
                     background-color="#87cefa"
                     text-color="#fff">
                <el-menu-item index="1" v-on:click="$router.push({ path: '/home' })" style="float:right">
                    管理页面
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <el-tabs v-model="activeTabName" type="card" @tab-click="handleClick">
                <el-tab-pane label="整体数据统计" name="first">
                    <el-divider>用户数据</el-divider>
                    <el-row>
                        <el-col :span="10" :offset="2">
                            <div style="height:280px" id="userBarBase" class="userBarBase" ref="userBarBase"></div>
                        </el-col>
                        <el-col :span="12">
                            <div style="height:280px;" id="userBarBase2" class="userBarBase2" ref="userBarBase2"></div>
                        </el-col>
                    </el-row>
                    <el-divider>用户音频数据</el-divider>
                    <el-row>
                        <el-col :span="10" :offset="2">
                            <div style="height:280px" id="userBase" class="userBase" ref="audioBase"></div>
                        </el-col>
                        <el-col :span="12">
                            <div style="height:280px" id="scoreBase" class="scoreBase" ref="audioBase2"></div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="用户数据查询" name="second">
                    <el-col :offset="1" :span="18">
                        <el-form :inline="true" style="text-align:left;">
                            <el-form-item style="display: block;margin: 0 0 10px 0">
                                <div class="el-input-group__prepend" style="display:inline-table">用户性别</div>
                                <el-select v-model="userGenderDic[this.userGender]" placeholder="请选择" style="margin-right: 15px;" @change="userGenderChange">
                                    <el-option label="所有性别" value=3></el-option>
                                    <el-option label="男性" value=1></el-option>
                                    <el-option label="女性" value=2></el-option>
                                    <el-option label="未知性别" value=0></el-option>
                                </el-select>
                                <div class="el-input-group__prepend" style="display:inline-table">排序方式</div>
                                <el-select v-model="userSortDic[this.userSort]" placeholder="请选择" style="margin-right: 15px;" @change="userSortChange">
                                    <el-option label="按用户注册顺序排序" value=0></el-option>
                                    <el-option label="按用户通过关卡数排序" value=1></el-option>
                                </el-select>
                                <el-button style="color:white;background-color:#87CEFA" v-on:click="userSearch">
                                    <i class="el-icon-zoom-in">搜索</i>
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <el-table
                                :data="userList">
                            <el-table-column
                                    prop="user"
                                    label="用户名">
                            </el-table-column>
                            <el-table-column
                                    prop="level"
                                    label="用户通关数">
                            </el-table-column>
                            <el-table-column
                                    prop="gender"
                                    label="用户性别">
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="用户音频数据查询" name="third">
                    <el-col :offset="1" :span="18">
                        <el-form :inline="true" style="text-align:left;">
                            <el-form-item style="display: block;margin: 0 0 10px 0">
                                <div class="el-input-group__prepend" style="display:inline-table">关卡类型</div>
                                <el-select v-model="audioGenderDic[this.audioGender]" placeholder="请选择" style="margin-right: 15px;" @change="audioGenderChange">
                                    <el-option label="所有类型关卡" value=3></el-option>
                                    <el-option label="男性角色关卡" value=1></el-option>
                                    <el-option label="女性角色关卡" value=2></el-option>
                                    <el-option label="其他关卡" value=0></el-option>
                                </el-select>
                                <el-input style="vertical-align:middle;width:350px;margin-right:15px" v-model="audioLevelId" placeholder="输入搜索信息">
                                    <template slot="prepend">关卡号</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item style="display: block;margin: 0 0 10px 0">
                                <div class="el-input-group__prepend" style="display:inline-table">排序方式</div>
                                <el-select v-model="audioSortDic[this.audioSort]" placeholder="请选择" style="margin-right: 15px;" @change="audioSortChange">
                                    <el-option label="按录制时间排序" value=0></el-option>
                                    <el-option label="按分数排序" value=1></el-option>
                                    <el-option label="按关卡号排序" value=2></el-option>
                                </el-select>
                                <el-date-picker
                                        v-model="audioTime"
                                        value-format="yyyy-MM-dd"
                                        type="daterange"
                                        clearable
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        style="margin-right:10px">
                                </el-date-picker>
                                <el-button style="color:white;background-color:#87CEFA" v-on:click="audioSearch">
                                    <i class="el-icon-zoom-in">搜索</i>
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <el-table
                                :data="audioList">
                            <el-table-column
                                    prop="user"
                                    label="用户名">
                            </el-table-column>
                            <el-table-column
                                    prop="level"
                                    label="关卡号">
                            </el-table-column>
                            <el-table-column
                                    prop="timestamp"
                                    label="录制时间">
                            </el-table-column>
                            <el-table-column
                                    prop="score"
                                    label="得分">
                            </el-table-column>
                            <el-table-column
                                    label="录音"
                                    width="320px">
                                <template slot-scope="scope">
                                    <audio controls="controls"
                                           class="audio"
                                           loop="loop"
                                           ref="audio"
                                           :src="scope.row.audio"
                                           style="border-radius:10px;margin-top:10px">
                                    </audio>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-tab-pane>
            </el-tabs>
            <el-divider content-position="left"></el-divider>
            <p style="margin:5px;vertical-align:center;font-size:12px">
                <br>@DIJKSTRA
            </p>
        </el-main>
    </el-container>
</div>
</template>
<script>
import echarts from 'echarts'
import {DataAudioSearch, DataUserSearch} from '@/utils/communication'
export default {
    name: 'Data',
    data() {
        return {
            activeTabName: 'first',
            levelCount: [],
            femaleNum: 0,
            maleNum: 0,
            unknownNum: 0,
            userNum: 0,
            timeCount: [],
            femaleAudioNum: 0,
            maleAudioNum: 0,
            unknownAudioNum: 0,
            userAudioNum: 0,
            userGender: 3,
            userGenderDic: [
                '未知性别',
                '男性',
                '女性',
                '所有性别'
            ],
            userSort: 0,
            userSortDic: [
                '按用户注册顺序排序',
                '按用户通过关卡数排序',
            ],
            userList: [],
            audioGender: 3,
            audioGenderDic: [
                "其他关卡",
                "男性角色关卡",
                "女性角色关卡",
                "所有类型关卡"
            ],
            audioLevelId: '',
            audioSort: 0,
            audioSortDic: [
                "按录制时间排序",
                "按分数排序",
                "按关卡号排序",
            ],
            audioTime:[
                '',
                ''
            ],
            audioList: []
        }
    },
    methods: {
        userGenderChange(val){
            this.userGender = val
        },
        userSortChange(val){
            this.userSort = val
        },
        audioGenderChange(val){
            this.audioGender = val
        },
        audioSortChange(val){
            this.audioSort = val
        },
        userSearch(){
            let r = '/?'
            let that = this
            if(this.userGender < 3)
                r += "gender=" + String(this.userGender) + '&&'
            if(this.userSort > 0)
                r += 'sort=level&&'
            if(r==='?')
                r = '/'
            else
                r = r.slice(0,-2)
            DataUserSearch(r).then((resp) => {
                if (resp.status === 200)
                    resp.json().then(function (res) {
                        res = res['results']
                        that.userList = []
                        for (let i = 0; i < res.length; i += 1)
                            that.userList.push({
                                'user': res[i].user,
                                'gender': that.userGenderDic[res[i].gender],
                                'level': res[i].level
                            })
                    })
            })
        },
        audioSearch(){
            let r = '/?'
            let that = this
            if(this.audioGender < 3)
                r += "gender=" + String(this.audioGender) + '&&'
            if(this.audioLevelId != '')
                r += 'level=' + String(Number(this.audioLevelId - 1)) + '&&'
            if(this.audioSort == 0)
                r += 'sort=time&&'
            else if (this.audioSort == 1)
                r += 'sort=score&&'
            else
                r += 'sort=level&&'
            if(this.audioTime[0] !== '' && this.audioTime[1] !== '')
                r += 'start_time=' + this.audioTime[0] + '&&end_time=' + this.audioTime[1] + '&&'
            if(r==='?')
                r = '/'
            else
                r = r.slice(0,-2)
            console.log(r)
            DataAudioSearch(r).then((resp) => {
                if (resp.status === 200)
                    resp.json().then(function (res) {
                        res = res['results']
                        that.audioList = []
                        for (let i = 0; i < res.length; i += 1)
                            that.audioList.push({
                                'user': res[i].user,
                                'level': res[i].level_id + 1,
                                'score': res[i].score.toFixed(2),
                                'audio': res[i].audio,
                                'timestamp': res[i].timestamp.split('T')[0]
                            })
                        console.log(that.audioList)
                    })
            })
        },
        drawScore() {
            let myChart4 = echarts.init(document.getElementById("scoreBase"))
            let date = []
            let count = []
            for (let i in this.timeCount) {
                date.push(i)
                count.push(this.timeCount[i])
            }
            myChart4.setOption({
                title: {
                    text: '近日新增录音数'
                },
                tooltip: {},
                xAxis: {
                    name: '日期',
                    data: date
                },
                yAxis: {
                    name: '个数'
                },
                series: [{
                    type: 'line',
                    data: count,
                }],
            });
        },
        drawUser() {
            let myChart2 = echarts.init(document.getElementById("userBase"))
            myChart2.setOption({
                title: {
                    text: '玩家音频性别组成'
                },
                series: [{
                    type: 'pie',
                    radius: '60%',
                    hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果
                    data: [{name: "男性玩家", value: this.maleAudioNum},
                        {name: "女性玩家", value: this.femaleAudioNum},
                        {name: "未知性别玩家", value: this.unknownAudioNum}],
                }],
                tooltip: {
                    formatter: '{b} : {c}',
                },
                legend: {
                    y: 'bottom',
                    x: 'center',
                    data: ['男性玩家', '女性玩家', '未知性别玩家']
                },
            });
        },
        drawUserBase2() {
            let myChart4 = echarts.init(document.getElementById("userBarBase2"))
            let len = []
            for (let i = 0; i < this.levelCount.length; i += 1)
                len.push(i)
            myChart4.setOption({
                title: {
                    text: '玩家过关情况'
                },
                tooltip: {},
                xAxis: {
                    name: '已过关数',
                    data: len
                },
                yAxis: {
                    name: '人数'
                },
                series: [{
                    type: 'line',
                    data: this.levelCount,
                }],
            });
        },
        drawUserBase() {
            let myChart2 = echarts.init(document.getElementById("userBarBase"))
            myChart2.setOption({
                title: {
                    text: '玩家性别组成'
                },
                series: [{
                    type: 'pie',
                    radius: '60%',
                    hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果
                    data: [{name: "男性玩家", value: this.maleNum},
                        {name: "女性玩家", value: this.femaleNum},
                        {name: "未知性别玩家", value: this.unknownNum}],
                }],
                tooltip: {
                    formatter: '{b} : {c}',
                },
                legend: {
                    y: 'bottom',
                    x: 'center',
                    data: ['男性玩家', '女性玩家', '未知性别玩家']
                },
            });
        },
        dataOrigin() {
            let that = this;
            DataUserSearch("/chart").then((res) => {
                return res.json();
            }).then((r) => {
                that.femaleNum = r.female_num
                that.maleNum = r.male_num
                that.unknownNum = r.unknown_num
                that.userNum = r.num
                that.levelCount = r.level_count
            }).then(() => {
                that.drawUserBase();
                that.drawUserBase2();
            });
            DataAudioSearch("/chart").then((res) => {
                return res.json();
            }).then((r) => {
                that.femaleAudioNum = r.female_num
                that.maleAudioNum = r.male_num
                that.unknownAudioNum = r.unknown_num
                that.userAudioNum = r.num
                that.timeCount = r.time_count
            }).then(() => {
                that.drawUser();
                that.drawScore();
            });
        },
    },
    created: function() {
        this.$nextTick(() => {
            this.dataOrigin();
        });
    },
}
</script>

<style>
    #message-board {
        height: calc(100vh - 16px);
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
</style>
