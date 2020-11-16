<template>
  <el-dialog style="text-align: center" title="图表展示"
             v-on:close="$emit('cancelChart','')"
             :visible.sync="dialogVisible"
             @open="open()"
             v-if='dialogVisible'
             :show-close=false width="80%">
      <div>
        <div style="width:200px;height:200px" id="charttest" class="charttest" ref="charttest"/>
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
        type:Number,
        default:()=>0
      },
      unknown_Num:{
        type:Number,
        default:()=>0
      },
      unknown_Scores:{
        type:Number,
        default:()=>0
      },
      male_Num:{
        type:Number,
        default:()=>0
      },
      male_Scores:{
        type:Number,
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
      }
  },
  data(){
    return{
      dialogVisible:false,
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
      title:this.title,
      type_id:this.type_id,
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this.gettest();
      });
    },
      gettest(){
      console.log("ready");
        var myChart = echarts.init(document.getElementById('charttest'));
        myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    },

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
        console.log("mounted",newval,oldval);
        //let this_ = this;
        //this.getPie();
        //this.drawChart();
        //this.drawMultiple();
      }
    }
  }
}

</script>

<style scoped>

</style>