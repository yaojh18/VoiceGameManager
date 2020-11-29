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
        <el-button v-on:click="$emit('cancelChart','')">确 认</el-button>
    </el-dialog>
</template>

<script>
import echarts from "echarts"
export default {
name: "Chart",
    props:{
        female_num:{
            type:Number,
            default:()=>0
        },
        female_scores:{
            type:Array,
            default:()=>[]
        },
        unknown_num:{
            type:Number,
            default:()=>0
        },
        unknown_scores:{
            type:Array,
            default:()=>[]
        },
        male_num:{
            type:Number,
            default:()=>0
        },
        male_scores:{
            type:Array,
            default:()=>[]
        },
        female_score_average:{
            type:Number,
            default:()=>0
        },
        male_score_average:{
            type:Number,
            default:()=>0
        },
        unknown_score_average:{
            type:Number,
            default:()=>0
        },
        played_num:{
            type:Number,
            default:()=>0
        },
        dialogVisible:{
            type:Boolean,
            default:()=>false,
        },
        score_average:{
            type:Number,
            default:()=>0
        },
        scores:{
            type:Array,
            default:()=>[]
        },
    },
    methods: {
        getdistribute(){
            let male_num = this.male_num;
            let female_num = this.female_num;
            let unknown_num = this.unknown_num;
            let myDistribute = echarts.init(document.getElementById('chartdistribute'));
            // 绘制图表，this.echarts1_option是数据
            myDistribute.setOption({
                title: {
                    text: '本关卡被游玩次数'
                },
                series: [{
                    type: 'pie',
                    radius: '60%',
                    hoverAnimation:true, // 是否开启 hover 在扇区上的放大动画效果
                    data: [{name:"男性玩家",value:male_num},
                        {name:"女性玩家",value:female_num},
                        {name:"未知性别玩家",value:unknown_num}],
                }],
                tooltip: {
                    formatter: '{b} : {c}',// 默认值null，内容格式器
                },
                legend: {
                    y: 'bottom',
                    x: 'center',
                    data: ['男性玩家','女性玩家','未知性别玩家']
                },
            });
        },
    getthreebar(){
        let myChart3 = echarts.init(document.getElementById('uscore'));
        myChart3.setOption({
            title: {
                text: '玩家分数段分布'
            },
            tooltip: {},
            xAxis: {
                data: ['0分', '10分', '20分', '30分', '40分', '50分','60分','70分','80分','90分','100分']
            },
            yAxis: {
                    name: '人数'
            },
            series: [{
                name: '男性玩家',
                type: 'line',
                data: this.male_scores,
            },{
                name: '女性玩家',
                type: 'line',
                data: this.female_scores,
            },{
                name: '未知性别玩家',
                type: 'line',
                data: this.unknown_scores,
            },{
                name:'所有玩家',
                type: 'line',
                data: this.scores,
            }],
            legend: {
                y: 'bottom',
                x: 'center',
                data: ['男性玩家','女性玩家','未知性别玩家','所有玩家']
            },
        });
    },
    getplay(){
        let maleavTmp = (this.male_score_average) ? (this.male_score_average) : 0;
        let femaleavTmp = (this.female_score_average) ? (this.female_score_average) : 0;
        let unknownavTmp = (this.unknown_score_average) ? (this.unknown_score_average) : 0;
        let sumTmp = (this.score_average) ? (this.score_average) : 0;
        let myChart = echarts.init(document.getElementById('chartplay'));
        myChart.setOption({
            title: {
                text: '玩家平均分'
            },
            tooltip: {},
            xAxis: {
                data: ['男性玩家','女性玩家','未知性别玩家','所有玩家']
            },
            yAxis: {},
            series: [{
                name: '平均分',
                type: 'bar',
                data: [maleavTmp, femaleavTmp, unknownavTmp, sumTmp]
            }]
        });
    }
    },
    watch: {
        dialogVisible: {
            handler(newval, oldval) {
                if (newval === true && oldval === false)
                    this.$nextTick(() => {
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