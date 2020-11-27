<template>
  <div class="app">
    <el-container>
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
         <div class="app-side-logo">
            <el-button v-on:click="changehtml()">
              返回主界面
          </el-button>
        </div>
        <div>
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span slot="title">数据处理</span>
          </template>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="音视频" name="1">
              <el-form>
                <el-form-item label="标题">
                  <el-input placeholder="请输入搜素关键词" v-model="VideoTitle" >{{ VideoTitle }}</el-input>
                </el-form-item>
                <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
                  <div style="width:300px !important;height:200px;" id="user" class="user"  ref="user"></div>
                  <div style="width:300px !important;height:200px;" id="score" class="score"  ref="score"></div>
                  <el-button v-on:click="dataVideoSearch()" slot="reference">展 示
                  </el-button>
                </el-popover>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="用户" name="2">
              <el-form>
                <el-form-item label="用户排序方式">
                  <el-input placeholder="请输入排序方式" v-model="UserSort" >{{ UserSort }}</el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-input placeholder="请输入性别筛选条件" v-model="UserGender" >{{ UserGender }}</el-input>
                </el-form-item>
                <el-popover
                    placement="right"
                    width="500"
                    trigger="click">
                  <div style="width:500px !important;height:200px" id="userbar" class="userbar" ref="userbar"></div>
                  <div style="width:500px !important;height:200px" id="userbar2" class="userbar2" ref="userbar2"></div>
                  <el-button v-on:click="dataUserSearch()" slot="reference">搜 索</el-button>
                </el-popover>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="音频" name="3">
              <el-form>
                <el-form-item label="性别筛选">
                  <el-input placeholder="请输入性别筛选信息" v-model="MediaGender" >{{ MediaGender }}</el-input>
                </el-form-item>
                <el-form-item label="媒体开始时间为: ">
                  <el-input placeholder="请输入媒体开始时间信息" v-model="MediaStartTime" >{{ MediaStartTime }}</el-input>
                </el-form-item>
                <el-form-item label="媒体结束时间为: ">
                  <el-input placeholder="请输入媒体结束时间信息" v-model="MediaEndTime" >{{ MediaEndTime }}</el-input>
                </el-form-item>
                <el-form-item label="排序选择方式: ">
                  <el-input placeholder="请输入排序方式" v-model="MediaSort" >{{ MediaSort }}</el-input>
                </el-form-item>
                <el-form-item label="音频等级为: ">
                  <el-input placeholder="请输入音频等级" v-model="MediaLevel" >{{ MediaLevel }}</el-input>
                </el-form-item>
                <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
                  <el-table
                      :data="mediaData"
                      style="width: 100%"
                      height="250">
                    <el-table-column
                        fixed
                        prop="user"
                        label="姓名"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="level_id"
                        label="等级"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="timestamp"
                        label="时间"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="score"
                        label="分数"
                        width="120">
                    </el-table-column>
                  </el-table>
                  <el-button slot="reference" v-on:click="dataAudioSearch()">展 示</el-button>
                </el-popover>
              </el-form>
            </el-collapse-item>
             </el-collapse>
           </div>
      </el-aside>
      <el-container>
        <el-main class="app-body">
          <template>
            <div id="data_origin" ref="data_origin" class="data_origin"></div>
            <el-card>玩家音频统计</el-card>
            <el-table
                :data="mediaData"
                style="width:100%;margin-bottom:20px"
                height="250">
              <el-table-column
                fixed
                prop="user"
                label="姓名"
                width="120">
            </el-table-column>
              <el-table-column
                  prop="level_id"
                  label="等级"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="timestamp"
                  label="时间"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="score"
                  label="分数"
                  width="120">
              </el-table-column>
            </el-table>
            <el-card>玩家通关统计</el-card>
            <div style="width:600px !important;height:200px" id="userBarBase" class="userBarBase" ref="userBarBase"></div>
            <el-card>玩家等级统计</el-card>
            <div style="width:600px !important;height:200px" id="userBarBase2" class="userBarBase2" ref="userBarBase2"></div>
            <el-card>关卡统计</el-card>
            <div style="width:600px !important;height:200px" id="userBase" class="userBase" ref="userBase"></div>
            <el-card>各关卡通关玩家统计</el-card>
            <div style="width:600px !important;height:200px" id="scoreBase" class="scoreBase" ref="scoreBase"></div>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import API from '@/utils/API'
import echarts from 'echarts'
import {DataVideoSearch,DataAudioSearch,DataUserSearch} from '@/utils/communication'
export default {
  name: 'Data',
  props: {
    // 接收父组件传递过来的信息
    chartData: {
      type: Array,
      default: ()=>[]
    },
    VideoMsgList:{
      type:Array,
      default: ()=>[]
    },
    UserData:{
      type:Array,
      default: ()=>[]
    },
    VideoMsgListPart_played_num:{
      type:Array,
      default: ()=>[]
    },
    videoData:{
      type:Array,
      default:()=>[]
    },
    VideoTitle: {
      type:String,
      default: ()=>'',
    },
    VideoLimit: {
      type:String,
      default: ()=>'',
    },
    VideoPage: {
      type:String,
      default: ()=>'',
    },
    UserSort: {
      type:String,
      default: ()=>'',
    },
    UserGender:{
      type:String,
      default: ()=>'',
    },
    UserSize: {
      type:String,
      default: ()=>'',
    },
    UserPage: {
      type:String,
      default: ()=>'',
    },
    MediaGender: {
      type:String,
      default: ()=>'',
    },
    MediaStartTime: {
      type:String,
      default: ()=>'',
    },
    MediaEndTime: {
      type:String,
      default: ()=>'',
    },
    MediaSort: {
      type:String,
      default: ()=>'',
    },
    MediaLevel: {
      type:String,
      default: ()=>'',
    },
  },
  data() {
    return {
      form:{
         VideoTitle: '',
         VideoLimit: '',
         VideoPage: '',
         UserSort: '',
         UserGender: '',
         UserSize: '',
         UserPage: '',
         MediaGender: '',
         MediaStartTime: '',
         MediaEndTime: '',
         MediaSort: '',
         MediaLevel: '',
      },
      username: '',
      userlevel:[],
      mgender:0,
      fgender:0,
      ugender:0,
      videoCnt: [],
      isCollapse: false,
      labelPosition: '',
      activeName: '1',
      player: [],
      playernum: [],
      usercnt: [],
      activetabName:'first',
      videoavScores:[],
      videomScores:[],
      videofScores:[],
      videouScores:[],
      videoNum:[],
      videofNum:[],
      videouNum:[],
      videomNum:[],
      mediaData:[],
    }
  },
  methods: {
    dataVideoSearch(){
         console.log(this.VideoTitle);
         console.log(this.VideoLimit);
         console.log(this.VideoPage);
         let that = this;
         console.log(API.MEDIAANALYSIS.path);
         var path = "api/manager/data/origin";
         if(this.VideoLimit!=''||this.VideoTitle!=''||this.VideoPage!='')
           path+='?';
         if(this.VideoLimit!=''){
           path+='size='+String(this.VideoLimit)+"&";
         }
         if(this.VideoTitle!=''){
           path+='title='+String(this.VideoTitle)+"&";
         }
         if(this.VideoPage){
           path+='page='+String(this.VideoPage);
         }
         DataVideoSearch(path).then((res)=>{
           console.log(res.body);
           return res.json();
         }).then((r)=>{
           r=r["results"];
           for(const it of r){
             console.log(it);
             this.videoavScores.push(it["score_average"]);
             this.videomScores.push(it["male_score_average"]);
             this.videofScores.push(it["female_score_average"]);
             this.videouScores.push(it["unknown_score_average"]);
             this.videoNum.push(it["played_num"]);
             this.videomNum.push(it["male_num"]);
             this.videofNum.push(it["female_num"]);
             this.videouNum.push(it["unknown_num"]);
           }
           return r;
         }).then((r)=>{
            console.log(r);
            that.drawChart();
         });
    },
    dataUserSearch(){
         let that = this;
         this.player = [];
         this.playernum = [];
         this.usercnt = [];
         this.userlevel = [];
         DataAudioSearch("api/manager/data/user/chart").then((res)=>{
            return res.json();
         }).then((r)=>{
           console.log(r);
           this.player=r["level_count"];
           let cnt = 0;
           for(const it in r["level_count"]){
             console.log(it);
             cnt+=1;
             this.playernum.push("关卡"+cnt);
           }
           return r;
         }).then((r)=>{
           console.log("unuseful:",r);
           that.userData();
         });
         DataUserSearch("api/manager/data/user").then((res)=>{
           return res.json();
         }).then((r)=>{
           console.log(r);
           r=r['results'];
           let cnt = 0;
           for(const it of r){
             if(it["gender"] == 0){
               that.ugender += 1;
             }else if(it["gender"] == 1){
               that.mgender += 1;
             }else{
               that.fgender += 1;
             }
             that.usercnt.push(cnt+"号玩家");
             cnt = cnt + 1;
             that.userlevel.push(it['level']);
           }
           return r;
         }).then((r)=>{
           console.log(r);
           that.drawUser();
         });
    },
    userData(){
      let myChart3 = echarts.init(document.getElementById('userbar2'));
      // 绘制图表，this.echarts1_option是数据
      myChart3.setOption({
        title: {
          text: '对应关卡等级统计'
        },
        tooltip: {},
        xAxis: {
          data: this.playernum,
        },
        yAxis: {},
        series: [
          {
            name: '玩家等级',
            type: 'line',
            data: this.player,
          }
        ]
      });
    },
    dataAudioSearch() {
      let that = this;
      console.log(this.MediaGender, this.MediaStartTime, this.MediaEndTime, this.MediaLevel, this.MediaSort);
      DataAudioSearch("/api/manager/data/user/chart/").then((res) => {
        console.log(res.body);
        return res.json();
      }).then((r) => {
        r = r["results"];
        console.log(r);
        for (const it of r) {
          this.mediaData.push(it);
        }
        console.log(this.mediaData);
      }).then((r) => {
        console.log(r);
        that.drawAudio();
      });
    },
    getPie () {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = echarts.init(document.getElementById('myChartPie'));
      // 绘制图表，this.echarts1_option是数据
      myChart2.setOption({
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          hoverAnimation:false, // 是否开启 hover 在扇区上的放大动画效果
          data: [400, 234, 456]
        }],
        tooltip: {
          formatter: '{b} : {c}',// 默认值null，内容格式器
        },
        legend: {
          y: 'bottom',
          x: 'center',
          data: ['陌生人','在住人','工作人员']
        },
      });
    },
    drawChart () {
      console.log("drawChart");
      console.log(this.videoavScores);
      let myChart1 =echarts.init(document.getElementById("user"))
      myChart1.setOption({
        tooltip: {},
        xAxis: {
          data: this.videoCnt,
        },
        yAxis: {},
        series: [
          {
            name: '总平均分',
            type: 'line',
            data: this.videoavScores,
            itemStyle: {
              color: '#999999'
            }
          },{
            name: '男性平均分',
            type:'line',
            data: this.videomScores,
            itemStyle: {
              color: '#eeeeee'
            }
          },{
            name: '女性平均分',
            type: 'line',
            data: this.videofScores,
            itemStyle: {
              color: '#dddddd'
            }
          },{
            name: '未知性别平均分',
            type: 'line',
            data: this.videouScores,
            itemStyle: {
              color: '#aaaaaa'
            }
          }
        ]
      });
      let myChart2 =echarts.init(document.getElementById("score"))
      myChart2.setOption({
        title: {
          text: '玩家等级统计'
        },
        tooltip: {},
        xAxis: {
          data: this.videoNum,
        },
        yAxis: {},
        series: [
          {
            name: '玩家个数',
            type: 'bar',
            data: this.videoNum,
          }, {
            name: '男性玩家个数',
            type: 'bar',
            data: this.videomNum,
          }, {
            name: '女性玩家个数',
            type: 'bar',
            data: this.videofNum,
          }, {
            name: '未知性别玩家个数',
            type: 'bar',
            data: this.videouNum,
          }
        ]
      });
    },
    drawChartBase(){
      let myChart1 =echarts.init(document.getElementById("userBase"))
      myChart1.setOption({
        tooltip: {},
        xAxis: {
          data: this.videoCnt,
        },
        yAxis: {},
        series: [
          {
            name: '总平均分',
            type: 'line',
            data: this.videoavScores,
            itemStyle: {
              color: '#999999'
            }
          },{
            name: '男性平均分',
            type:'line',
            data: this.videomScores,
            itemStyle: {
              color: '#eeeeee'
            }
          },{
            name: '女性平均分',
            type: 'line',
            data: this.videofScores,
            itemStyle: {
              color: '#dddddd'
            }
          },{
            name: '未知性别平均分',
            type: 'line',
            data: this.videouScores,
            itemStyle: {
              color: '#aaaaaa'
            }
          }
        ]
      });
      let myChart2 = echarts.init(document.getElementById("scoreBase"))
      myChart2.setOption({
        tooltip: {},
        xAxis: {
          data: this.videoCnt,
        },
        yAxis: {},
        series: [
          {
            name: '玩家个数',
            type: 'bar',
            data: this.videoNum,
          }, {
            name: '男性玩家个数',
            type: 'bar',
            data: this.videomNum,
          }, {
            name: '女性玩家个数',
            type: 'bar',
            data: this.videofNum,
          }, {
            name: '未知性别玩家个数',
            type: 'bar',
            data: this.videouNum,
          }
        ]
      });
    },
    drawUserBase2(){
      let myChart4 = echarts.init(document.getElementById("userBarBase"))
      myChart4.setOption({
        tooltip: {},
        xAxis: {
          data: this.playernum,
          name: "关卡玩家",
        },
        yAxis: {
          name: "个数",
          type : 'value',
          max: 5,
          min: 0,
          boundaryGap: [1, 1],
        },
        series: [
          {
            name: '玩家等级：',
            type: 'bar',
            data: this.player,
          },
        ]
      });
    },
    drawUserBase(){
      let myChart2 =echarts.init(document.getElementById("userBarBase2"))
      myChart2.setOption({
        tooltip: {},
        xAxis: {
          data: this.usercnt,
        },
        yAxis: {},
        series: [
          {
            name: '玩家等级',
            type: 'bar',
            data: this.userlevel,
          }
        ]
      });
    },
    drawUser(){
      let myChart1 =echarts.init(document.getElementById("userbar2"))
      myChart1.setOption({
        title: {
          text: '玩家等级统计'
        },
        tooltip: {},
        xAxis: {
          data: this.playernum,
          name: "关卡玩家",
        },
        yAxis: {
          name: "个数",
          type : 'value',
          max: 5,
          min: 0,
          boundaryGap: [1, 1],
        },
        series: [
          {
            name: '玩家等级：',
            type: 'bar',
            data: this.player,
          },
        ]
      });
      let myChart2 =echarts.init(document.getElementById("userbar"))
      myChart2.setOption({
        title: {
          text: '玩家个数统计'
        },
        tooltip: {},
        xAxis: {
          data: this.usercnt,
        },
        yAxis: {},
        series: [
          {
            name: '玩家等级',
            type: 'bar',
            data: this.userlevel,
          }
        ]
      });
    },
    drawAudio(){
      let myChart2 =echarts.init(document.getElementById("audio"))
      myChart2.setOption({
        title: {
          text: '玩家音频统计'
        },
        tooltip: {},
        xAxis: {
          data: this.mediaDataUser,
        },
        yAxis: {},
        series: [
          {
            name: '音频关卡',
            type: 'bar',
            data: this.mediaDataLevel,
          },{
            name: '音频分数',
            type: 'bar',
            data: this.mediaDataScore,
          }
        ]
      });
    },
    SearchAll(){
      let that = this;
      var path = "api/manager/data/origin";
      if(this.VideoLimit!=''||this.VideoTitle!=''||this.VideoPage!='')
        path+='?';
      if(this.VideoLimit!=''){
        path+='size='+String(this.VideoLimit)+"&";
      }
      if(this.VideoTitle!=''){
        path+='title='+String(this.VideoTitle)+"&";
      }
      if(this.VideoPage){
        path+='page='+String(this.VideoPage);
      }
      DataVideoSearch(path).then((res)=>{
        console.log(res.body);
        return res.json();
      }).then((r)=>{
        r=r["results"];
        for(const it of r){
          console.log(it);
          this.videoavScores.push(it["score_average"]);
          this.videomScores.push(it["male_score_average"]);
          this.videofScores.push(it["female_score_average"]);
          this.videouScores.push(it["unknown_score_average"]);
          this.videoNum.push(it["played_num"]);
          this.videomNum.push(it["male_num"]);
          this.videofNum.push(it["female_num"]);
          this.videouNum.push(it["unknown_num"]);
        }
        return r;
      }).then((r)=>{
        console.log(r);
        that.drawChart();
      });
      console.log(this.MediaGender, this.MediaStartTime, this.MediaEndTime, this.MediaLevel, this.MediaSort);
      DataAudioSearch("/api/manager/data/user_audio").then((res) => {
        console.log(res.body);
        return res.json();
      }).then((r) => {
        r = r["results"];
        console.log(r);
        for (const it of r) {
          this.mediaData.push(it);
        }
        console.log(this.mediaData);
      }).then((r) => {
        console.log(r);
        that.drawAudio();
      });
      DataUserSearch("api/manager/data/user").then((res)=>{
        console.log(res);
        console.log(res.body);
        return res.json();
      }).then((r)=>{
        r=r['results'];
        let cnt = 0;
        for(const it of r){
          console.log(it);
          if(it["gender"] == 0){
            that.ugender += 1;
          }else if(it["gender"] == 1){
            that.mgender += 1;
          }else{
            that.fgender += 1;
          }
          that.usercnt.push(cnt);
          cnt = cnt + 1;
          that.userlevel.push(it['level']);
        }
        return r;
      }).then((r)=>{
        console.log(r);
        that.drawUser();
      });
    },
    dataOrigin(){
      let that = this;
      that.ugender = 0;
      that.mgender = 0;
      that.fgender = 0;
      that.usercnt = [];
      that.videoCnt = [];
      that.userlevel = [];this.player = [];
      this.playernum = [];
      this.usercnt = [];
      this.userlevel = [];
      DataAudioSearch("api/manager/data/user/chart").then((res)=>{
        return res.json();
      }).then((r)=>{
        console.log(r);
        this.player=r["level_count"];
        let cnt = 0;
        for(const it in r["level_count"]){
          cnt+=1;
          console.log(it);
          this.playernum.push("关卡"+cnt);
        }
        return r;
      }).then((r)=>{
        console.log("unuseful:",r);
        that.drawUserBase2();
      });
      var path = "api/manager/data/origin";
      if(this.VideoLimit!=''||this.VideoTitle!=''||this.VideoPage!='')
        path+='?';
      if(this.VideoLimit!=''){
        path+='size='+String(this.VideoLimit)+"&";
      }
      if(this.VideoTitle!=''){
        path+='title='+String(this.VideoTitle)+"&";
      }
      if(this.VideoPage){
        path+='page='+String(this.VideoPage);
      }
      DataVideoSearch(path).then((res)=>{
        console.log(res.body);
        return res.json();
      }).then((r)=>{
        console.log("this is what I want");
        r=r["results"];
        let cnt = 0;
        for(const it of r){
          console.log(it);
          this.videoCnt.push(String(cnt)+"关卡");
          cnt+=1;
          this.videoavScores.push(it["score_average"]==null?0:it["score_average"]);
          this.videomScores.push(it["male_score_average"]==null?0:it["male_score_average"]);
          this.videofScores.push(it["female_score_average"]==null?0:it["female_score_average"]);
          this.videouScores.push(it["unknown_score_average"]==null?0:it["unknown_score_average"]);
          this.videoNum.push(it["played_num"]==null?0:it["played_num"]);
          this.videomNum.push(it["male_num"]==null?0:it["male_num"]);
          this.videofNum.push(it["female_num"]==null?0:it["female_num"]);
          this.videouNum.push(it["unknown_num"]==null?0:it["unknown_num"]);
        }
        return r;
      }).then((r)=>{
        console.log(r);
        that.drawChartBase();
      });
      DataUserSearch("api/manager/data/user").then((res)=>{
        console.log(res);
        console.log(res.body);
        return res.json();
      }).then((r)=>{
        r=r['results'];
        let cnt = 0;
        for(const it of r){
          console.log(it);
          if(it["gender"] == 0){
            that.ugender += 1;
          }else if(it["gender"] == 1){
            that.mgender += 1;
          }else{
            that.fgender += 1;
          }
          that.usercnt.push(String(cnt)+"号玩家");
          cnt = cnt + 1;
          that.userlevel.push(it['level']);
        }
        return r;
      }).then((r)=>{
        console.log(r);
        that.drawUserBase();
      });
      DataAudioSearch("/api/manager/data/user_audio").then((res) => {
        console.log(res.body);
        return res.json();
      }).then((r) => {
        r = r["results"];
        console.log(r);
        for (const it of r) {
          this.mediaData.push(it);
        }
      }).then((r) => {
         console.log(r);
      });
    },
    changehtml:function(){
      this.$router.go(-2);
    },
    logout: function () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          sessionStorage.removeItem('user');
          this.$router.push('/login');
        })
        .catch(() => { });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    echarts() {
      return 'echarts' + Math.random()*100000
    },
  },
  mounted: function () {
    let user = sessionStorage.getItem('user');
    if (user) {
      this.username = user;
    }
  },
  created: function() {
    this.$nextTick(() => {
      this.dataOrigin();
    });
  },
}
</script>

<style>
</style>
