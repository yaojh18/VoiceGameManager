<template>
  <el-dialog style="text-align: center" title="统计数据展示"
             v-on:close="$emit('cancelChart','')"
             :visible.sync="dialogVisible"
             v-if='dialogVisible'
             :show-close=false width="80%">
      <div>
        <div style="width:100%;height:200px" id="chartdistribute" class="chartdistribute" ref="chartdistribute"/>
        <div style="width:100%;height:200px" id="chartplay" class="chartplay" ref="chartplay"/>
        <div style="width:100%;height:200px" id="uscore" class="uscore" ref="uscore"/>
      </div>
    <el-button v-on:click="$emit('cancelChart','')">取 消</el-button>
  </el-dialog>
</template>

<script>
import echarts from "echarts"
export default {
name: "Chart",
  props:{
    chartData: {
      type: Array,
      default: ()=>[]
    },
    female_Num:{
        type:Number,
        default:()=>0
      },
      female_Scores:{
        type:Array,
        default:()=>0
      },
      unknown_Num:{
        type:Number,
        default:()=>0
      },
      unknown_Scores:{
        type:Array,
        default:()=>0
      },
      male_Num:{
        type:Number,
        default:()=>0
      },
      male_Scores:{
        type:Array,
        default:()=>0
      },
      female_Score_Average:{
        type:Number,
        default:()=>0
      },
      male_Score_Average:{
        type:Number,
        default:()=>0
      },
      unknown_Score_Average:{
        type:Number,
        default:()=>0
      },
      played_Num:{
        type:Number,
        default:()=>0
      },
      title:{
        type:String,
        default:()=>"",
      },
      type_id:{
        type:Number,
        default:()=>1,
      },
      dialogVisible:{
        type:Boolean,
        default:()=>false,
      },
      Title:{
        type:String,
      },
      type_Id:{
        type:String,
      },
      Score_average:{
         type:Number,
      },
      scores:{
         type:Array,
      },

  },
  data(){
    return{
      female_num:this.female_Num,
      female_scores:this.female_Scores,
      unknown_num:this.unknown_Num,
      unknown_scores:this.unknown_Scores,
      male_num:this.male_Num,
      male_scores:this.male_Scores,
      female_score_average:this.female_Score_Average,
      male_score_average:this.male_Score_Average,
      unknown_score_average:this.unknown_Score_Average,
      played_num:this.played_Num,
      // eslint-disable-next-line vue/no-dupe-keys
      title:this.Title,
      // eslint-disable-next-line vue/no-dupe-keys
      type_id:this.type_Id,
      score_average:this.Score_average,
      // eslint-disable-next-line vue/no-dupe-keys
      scores:this.scores,
    }
  },
  methods: {
      getdistribute(){
        let male_num = this.male_num;
        let female_num = this.female_num;
        let unknown_num = this.unknown_num;
        console.log(male_num,female_num,unknown_num);
        let myDistribute = echarts.init(document.getElementById('chartdistribute'));
        // 绘制图表，this.echarts1_option是数据
        myDistribute.setOption({
          title: {
            text: '性别分布'
          },
          series: [{
            name: '性别分布',
            type: 'pie',
            radius: '60%',
            hoverAnimation:true, // 是否开启 hover 在扇区上的放大动画效果
            data: [{name:"男性数量",value:male_num},
                   {name:"女性数量",value:female_num},
                   {name:"未知性别数量",value:unknown_num}],
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

      },
    getthreebar(){
      let myChart3 = echarts.init(document.getElementById('uscore'));
      myChart3.setOption({
        title: {
          text: '玩家分数统计'
        },
        tooltip: {},
        xAxis: {
          data: ['0分', '10分', '20分', '30分', '40分', '50分','60分','70分','80分','90分','100分']
        },
        yAxis: {},
        series: [{
          name: '男性玩家分数',
          type: 'bar',
          data: this.male_scores,
        },{
          name: '女性玩家分数',
          type: 'bar',
          data: this.female_scores,
        },{
          name: '未知玩家分数',
          type: 'bar',
          data: this.unknown_scores,
        },{
          name:'玩家分数',
          type: 'bar',
          data: this.scores,
        }]
      });
    },
    getplay(){
      let maleTmp = this.male_scores;
      let femaleTmp = this.female_scores;
      let unknownTmp = this.unknown_scores;
      let maleavTmp = this.male_score_average;
      let femaleavTmp = this.female_score_average;
      let unknownavTmp = this.unknown_score_average;
      console.log(this.male_scores);
      console.log(this.female_scores);
      console.log(this.unknown_scores);
      console.log(this.male_score_average);
      let myChart = echarts.init(document.getElementById('chartplay'));
      myChart.setOption({
        title: {
          text: '玩家总分'
        },
        tooltip: {},
        xAxis: {
          data: ['男性玩家总分','男性玩家平均分','女性玩家总分','女性玩家平均分','未知性别玩家总分','未知性别玩家平均分']
        },
        yAxis: {},
        series: [{
          name: '玩家数量',
          type: 'bar',
          data: [maleTmp,maleavTmp, femaleTmp,femaleavTmp, unknownTmp,unknownavTmp]
        }]
      });
    }

  },
  computed:{
    echarts() {
      return 'echarts' + Math.random()*100000
    },
    dialog(){
      return this.dialogVisible;
    }
  },
  watch: {
    dialogVisible:{
      handler(newval, oldval)
      {
        console.log(newval,oldval);
        this.$nextTick(() => {
          console.log("ready");
          //this.gettest();
          this.getplay();
          this.getdistribute();
          this.getthreebar();
        });
      }
    }
  }
}

</script>

<style scoped>

</style>