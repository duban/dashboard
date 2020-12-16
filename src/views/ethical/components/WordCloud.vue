<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
require('echarts-wordcloud')

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
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
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 70,
          bottom: 8,
          left: 8,
          right: 8,
          containLabel: true
        },
        series: [{
          type: 'wordCloud',

          // The shape of the "cloud" to draw. Can be any polar equation represented as a
          // callback function, or a keyword present. Available presents are circle (default),
          // cardioid (apple or heart shape curve, the most known polar equation), diamond (
          // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

          gridSize: 2,
          sizeRange: [20, 40],
          rotationRange: [0, 90],
          left: 'center',
          top: 'center',
          width: this.width,
          height: this.height,
          right: null,
          bottom: '20%',
          drawOutOfBound: false,

          // Global text style
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              // Color can be a callback function or a color string
              color: function() {
                // Random color
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')'
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },

          // Data is an array. Each array item must have name and value property.
          data: [{
            name: '',
            value: 10000,
            textStyle: {
              normal: {
                color: 'black'
              },
              emphasis: {
                color: 'red'
              }
            }
          }, {
            name: 'Macys',
            value: 6181
          }, {
            name: 'Amy Schumer',
            value: 4386
          }, {
            name: 'Jurassic World',
            value: 4055
          }, {
            name: 'Charter Communications',
            value: 2467
          }, {
            name: 'Chick Fil A',
            value: 2244
          }, {
            name: 'Planet Fitness',
            value: 1898
          }, {
            name: 'Pitch Perfect',
            value: 1484
          }, {
            name: 'Express',
            value: 1112
          }, {
            name: 'Home',
            value: 965
          }, {
            name: 'Johnny Depp',
            value: 847
          }, {
            name: 'Lena Dunham',
            value: 582
          }, {
            name: 'Lewis Hamilton',
            value: 555
          }, {
            name: 'KXAN',
            value: 550
          }, {
            name: 'Mary Ellen Mark',
            value: 462
          }, {
            name: 'Farrah Abraham',
            value: 366
          }, {
            name: 'Rita Ora',
            value: 360
          }, {
            name: 'Serena Williams',
            value: 282
          }, {
            name: 'NCAA baseball tournament',
            value: 273
          }, {
            name: 'Point Break',
            value: 265
          }
          ]
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>
