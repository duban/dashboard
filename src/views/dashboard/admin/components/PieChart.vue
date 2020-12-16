<template>
  <div :class="className" :style="{height:height,width:width}" :title="chartTitle" :chartData="chartData"/>
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
    chartData: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: { data: [{ value: 140, name: 'Neu' }, { value: 220, name: 'Neg' }, { value: 110, name: 'Pos' }], legend: ['Neu', 'Neg', 'Pos'] }},
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
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: this.chartTitle,
          paddingLeft: '2',
          paddingRight: '2',
          left: 'center',
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
        legend: {
          left: 'center',
          bottom: '10',
          data: this.chartData.legend
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '50%'],
            label: {
              formatter: '{per|{d}%} - {b|{b}} ',
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: this.chartData.data
          }
        ]
      })
    }
  }
}
</script>
