<template>
  <div class="app">
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100">
      <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        回到顶部
      </div>
    </el-backtop>
    <el-container>
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
         <div class="app-side-logo">
            <el-button v-on:click="changehtml()">
              返回主界面
          </el-button>
        </div>
        <div>
          <el-menu default-active="1-4-1"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">数据中心</span>
              </template>
              <el-menu-item-group>
                <span slot="title">数据处理</span>
                <el-menu-item index="1-1">增加</el-menu-item>
                <el-menu-item index="1-2">修改</el-menu-item>
                <el-menu-item index="1-3">查询</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="数据展示">
                <el-menu-item index="1-4">
                  <el-popover
                      placement="right"
                      width="100%"
                      height="100%"
                      trigger="click">
                    <div style="width:300px !important;height:200px;" id="user" class="user"  ref="user"></div>
                    <div style="width:300px !important;height:200px;" id="score" class="score"  ref="score"></div>
                    <div style="width:300px !important;height:200px" id="userpie" class="userpie"  ref="userpie"></div>
                    <div style="width:300px !important;height:200px" id="userbar" class="userbar" ref="userbar"></div>
                    <div style="width:100%;height:200px" id="audio" class="audio" ref="audio"></div>
                    <el-button v-on:click="SearchAll()" slot="reference">数据展示图表
                    </el-button>
                  </el-popover></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header class="app-header">
          <div style="width: 60px; cursor: pointer;"
               @click.prevent="toggleSideBar">
            <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
            <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
          </div>
        </el-header>
        <el-main class="app-body">
          <template>
            <el-radio-group v-model="labelPosition" @change="changeradiohandler" size="small" style="margin-top:30px">
              <el-radio-button label="left" name="first" v-on:click="changeradiofirst()"><i class="el-icon-video-camera-solid">音视频</i></el-radio-button>
              <el-radio-button label="right" name="second" v-on:click="changeradiosecond()"><i class="el-icon-user-solid">用户</i></el-radio-button>
              <el-radio-button label="top" name="third" v-on:click="changeradiothird()"><i class="el-icon-mic">音频</i></el-radio-button>
            </el-radio-group>
            <el-tabs type="border-card" style="margin-top:15px" v-model="activetabName">
              <el-tab-pane name="first" :key="'first'">
                <span slot="label" v-on:click="changefirst()"><i class="el-icon-video-camera-solid"></i>音视频</span>
                <el-form>
                  <el-form-item label="标题">
                    <el-input placeholder="请输入搜素关键词" v-model="VideoTitle" >{{ VideoTitle }}</el-input>
                  </el-form-item>
                  <el-form-item label="每页显示">
                    <el-input placeholder="请输入每页显示个数" v-model="VideoLimit" >{{ VideoLimit }}</el-input>
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
              </el-tab-pane>
              <el-tab-pane name="second" :key="'second'">
                <span slot="label" v-on:click="changesecond()"><i class="el-icon-user-solid"></i>用户</span>
                <el-form>
                  <el-form-item label="用户排序方式">
                    <el-input placeholder="请输入排序方式" v-model="UserSort" >{{ UserSort }}</el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-input placeholder="请输入性别筛选条件" v-model="UserGender" >{{ UserGender }}</el-input>
                  </el-form-item>
                  <el-form-item label="每页显示">
                    <el-input placeholder="请输入每页显示个数" v-model="UserSize" >{{ UserSize }}</el-input>
                  </el-form-item>
                  <el-form-item label="展示页码为">
                    <el-input placeholder="请输入展示页码" v-model="UserPage" >{{ UserPage }}</el-input>
                  </el-form-item>
                  <el-popover
                      placement="right"
                      width="400"
                      trigger="click">
                    <div style="width:300px !important;height:200px" id="userpie" class="userpie"  ref="userpie"></div>
                    <div style="width:300px !important;height:200px" id="userbar" class="userbar" ref="userbar"></div>
                    <el-button v-on:click="dataUserSearch()" slot="reference">搜 索</el-button>
                  </el-popover>
                </el-form>
              </el-tab-pane>
              <el-tab-pane name="third" :key="'third'">
                <span slot="label" v-on:click="changethird()"><i class="el-icon-mic"></i>音频</span>
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
                    <div style="width:100%;height:200px" id="audio" class="audio" ref="audio"></div>
                    <el-button slot="reference" v-on:click="dataAudioSearch()">展 示</el-button>
                  </el-popover>
                </el-form>
              </el-tab-pane>
            </el-tabs>
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
      isCollapse: false,
      labelPosition: '',
      activeName: '1',
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
      mediaDataLevel:[],
      mediaDataUser:[],
      mediaDataScore:[],
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
         };
         if(this.VideoTitle!=''){
           path+='title='+String(this.VideoTitle)+"&";
         };
         if(this.VideoPage){
           path+='page='+String(this.VideoPage);
         };
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
    dataAudioSearch() {
      let that = this;
      console.log(this.MediaGender, this.MediaStartTime, this.MediaEndTime, this.MediaLevel, this.MediaSort);
      DataAudioSearch("/api/manager/data/user_audio").then((res) => {
        console.log(res.body);
        return res.json();
      }).then((r) => {
        r = r["results"];
        console.log(r);
        for (const it of r) {
          this.mediaDataScore.push(it['score']);
          this.mediaDataLevel.push(it['level_id']);
          this.mediaDataUser.push(it['user']);
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
    changeradiohandler(value){
      if(value=="left"){
        this.activetabName="first";
      }else if(value=="right"){
        this.activetabName="second";
      }else if(value=="top"){
        this.activetabName="third";
      }
    },
    drawChart () {
      console.log("drawChart");
      console.log(this.videoavScores);
      let myChart1 =echarts.init(document.getElementById("user"))
      myChart1.setOption({
        title: {
          text: '关卡统计'
        },
        tooltip: {},
        xAxis: {
          data: this.videoavScores,
        },
        yAxis: {},
        series: [
          {
            name: '总平均分',
            type: 'line',
            data: this.videoavScores,
          },{
            name: '男性平均分',
            type:'line',
            data: this.videomScores,
          },{
            name: '女性平均分',
            type: 'line',
            data: this.videofScores,
          },{
            name: '未知性别平均分',
            type: 'line',
            data: this.videouScores,
          }
        ]
      });
      let myChart2 =echarts.init(document.getElementById("score"))
      myChart2.setOption({
        title: {
          text: '玩家个数统计'
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
    drawUser(){
      let myChart1 =echarts.init(document.getElementById("userpie"))
      myChart1.setOption({
        title: {
          text: '性别分布'
        },
        series: [{
          name: '性别分布',
          type: 'pie',
          radius: '60%',
          hoverAnimation:true, // 是否开启 hover 在扇区上的放大动画效果
          data: [{name:"男性数量",value:this.mgender},
            {name:"女性数量",value:this.fgender},
            {name:"未知性别数量",value:this.ugender}],
        }],
        tooltip: {
          formatter: '{b} : {c}',// 默认值null，内容格式器
        },
        legend: {
          y: 'bottom',
          x: 'center',
          data: ['男性数量','女性数量','未知性别数量']
        },
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
      };
      if(this.VideoTitle!=''){
        path+='title='+String(this.VideoTitle)+"&";
      };
      if(this.VideoPage){
        path+='page='+String(this.VideoPage);
      };
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
          this.mediaDataScore.push(it['score']);
          this.mediaDataLevel.push(it['level_id']);
          this.mediaDataUser.push(it['user']);
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
    drawMultiple(){
      // 基于准备好的dom，初始化echarts实例
      let myChartMultiple =echarts.init(document.getElementById('chartMultiple'))
      let dd = {
        title: [
          {
            text: '后台统计图表1',
            subtext: '性别',
            left: '30%'
          },
          {
            text: '后台统计图表2',
            subtext: '年龄',
            left: '80%'
          }
        ],
        top: "80%",
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['10%', '20%',],
            center : [ '20%', '50%' ],//位置确定：左下角
            avoidLabelOverlap: true,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {name: 'A', value: 1212},
              {name: 'B', value: 2323},
              {name: 'C', value: 1919}
            ]
          },
          {
            // name: '访问来源',
            type: 'pie',
            radius: ['50%', '80%'],
            center : [ '70%', '50%' ],//位置确定：左下角
            avoidLabelOverlap: true,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },

            data: [
              {name: 'l', value: 1212},
              {name: 'g', value: 2323},
              {name: 'h', value: 1919}
            ]
          },
        ]};
      myChartMultiple.setOption(dd);
    },
    toggleSideBar() {
      this.isCollapse = !this.isCollapse
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
    changeradiofirst(){
      console.log(this.activetabName);
      this.activetabName="first";
    },
    changeradiosecond(){
      console.log(this.activetabName);
      this.activetabName="second";
    },
    changeradiothird(){
      this.activetabName="third";
    },
    changefirst(){
      this.labelPosition="left";
    },
    changesecond(){
      this.labelPosition="right";
    },
    changethird(){
      this.labelPosition="top";
    }
  },
  computed: {
    echarts() {
      return 'echarts' + Math.random()*100000
    },
  },
  mounted: function () {
    //let this_ = this;
    this.getPie();
    this.drawChart();
    this.drawMultiple();

    // 基于准备好的dom，初始化echarts实例
    let myChart2 = echarts.init(document.getElementById(this.myChartPie));
    // 绘制图表，this.echarts1_option是数据
    let Option1 = ({
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
    myChart2.setOption(Option1);

    let myChart = echarts.init(document.getElementById(this.echarts));
    let option = {
      color: ['#333'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {
          type : 'shadow'
        }
      },
      xAxis : [
        {
          type : 'category',
          data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'每月花费',
          type:'bar',
          barWidth: '60%',
          data:[995,666,444,858,654,236,645,546,846,225,547,356]
        }
      ]
    };
    myChart.setOption(option);
    //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
    window.addEventListener('resize',function() {myChart.resize()});
  let user = sessionStorage.getItem('user');
    if (user) {
      this.username = user;
    }
  },
  created: () => {},
}
</script>

<style>
</style>
