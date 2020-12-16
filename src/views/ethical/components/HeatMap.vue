<template>
  <div :class="className" :style="{height:height,width:width}" :title="chartTitle" />
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    chartTitle: {
      type: String,
      default: 'heatmap'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '250px'
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
      var hours = ['08.00', '09.00', '10.00', '11.00',
        '12.00', '13.00', '14.00', '15.00', '16.00', '17.00']
      var days = ['Fri', 'Thu', 'Wed', 'Tue', 'Mon']

      var data = [[3, 6, 1], [4, 3, 3], [4, 2, 2], [4, 3, 2], [3, 7, 2], [2, 2, 2], [1, 2, 2], [1, 1, 1], [0, 2, 2], [0, 0, 2]]

      data = data.map(function(item) {
        return [item[1], item[0], item[2] || '-']
      })
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: this.chartTitle,
          left: 'center',
          top: '1',
          bottom: '50'
        },
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '70%',
          borderWidth: 0,
          top: 40,
          bottom: 50
        },
        xAxis: {
          type: 'category',
          data: hours,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          splitArea: {
            show: true
          }
        },
        series: [{
          name: 'Value',
          type: 'heatmap',
          data: data,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    }
  }
}
</script>
