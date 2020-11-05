<template>
  <div class="app">
    <el-container>
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <div class="app-side-logo">
          <router-link to='/'>
          <img src="@/assets/logo.png"
               :width="isCollapse ? '60' : '60'"
               height="60" />
          </router-link>
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
                <el-menu-item index="1-3">删除</el-menu-item>
                <el-menu-item index="1-4">查询</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="数据展示">
                <el-menu-item index="1-4">数据展示图表</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-5">
                <span slot="title">选项4</span>
                <el-menu-item index="1-5-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3"
                          disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
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
          <!-- 我是样例菜单 -->
          <el-menu default-active="1"
                   class="el-menu-demo tab-page"
                   mode="horizontal"
                   @select="handleSelect"
                   active-text-color="#409EFF">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3"
                          disabled>消息中心</el-menu-item>
            <el-menu-item index="4">
              <a href="#">数据管理</a>
            </el-menu-item>
          </el-menu>

          <div class="app-header-userinfo">
            <el-dropdown trigger="hover"
                         :hide-on-click="false">
              <span class="el-dropdown-link">
                {{ username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided
                                  @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <div>
              <div style="width:50%;height:200px;" :id="echarts" class="echarts"  ref="echarts"></div>
              <div style="width:50%;height:200px;" id="myChartPie" class="myChartPie"  ref="myChartPie"/>
              <div style="width:50%;height:200px;" id="chartMultiple" class="chartMultiple"  ref="chartMultiple"/>
            </div>
            <router-view/>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Data',
  props: {
    // 接收父组件传递过来的信息
    chartData: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      username: '',
      isCollapse: false
    }
  },
  methods: {
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
      const vm = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart =echarts.init(document.getElementById(this.echarts))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '数据可视化平台'
        },
        tooltip: {},
        xAxis: {
          data: this.chartData
        },
        yAxis: {},
        series: [
          {
            name: '分数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    },
    drawMultiple(){
      const vm = this;
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
            left: '50%'
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
    //let this_ = this;
    this.getPie();
    this.drawChart();
    this.drawMultiple();

    // 基于准备好的dom，初始化echarts实例
    let myChart2 = echarts.init(document.getElementById(this.myChartPie));
    myChart2.setOption(dd);
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
    //myChart2.setOption(Option1);

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
    //myChart.setOption(option);

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
