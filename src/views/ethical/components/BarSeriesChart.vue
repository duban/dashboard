<template>
  <div :class="className" :style="{height:height,width:width}" :title="chartTitle"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

// const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    chartTitle: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '530px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: this.chartTitle,
          left: 'center',
          padding: [10, 10, 5, 10],
          textStyle: {
            color: '#344b58',
            fontSize: '16'
          }
        },
        grid: {
          top: 50,
          bottom: 20,
          left: 10,
          right: 10,
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['2018', '2019', '2020'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'Good',
          type: 'bar',
          barGap: 0,
          barWidth: '20%',
          data: [320, 332, 350]
        }, {
          name: 'Bad',
          type: 'bar',
          barWidth: '20%',
          data: [520, 400, 333] }]
      })
    }
  }
}
</script>
