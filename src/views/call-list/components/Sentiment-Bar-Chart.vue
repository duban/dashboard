<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
// import moment from 'moment'

export default {
  props: {
    className: {
      type: String,
      default: 'sentiment'
    },
    id: {
      type: String,
      default: 'sentiment'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    maxTimes: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      s_chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.s_chart) {
      return
    }
    this.s_chart.dispose()
    this.s_chart = null
  },
  methods: {
    initChart() {
      this.s_chart = echarts.init(document.getElementById(this.id))

      const maxTimes = this.maxTimes
      const xData = (function() {
        const data = []
        for (let i = 1; i < maxTimes; i++) {
          const min = Math.floor(i / 60)
          const second = i - min * 60

          const minStr = min < 10 ? `0${min}` : min

          const secondStr = second < 10 ? `0${second}` : second
          data.push(`${minStr}:${secondStr}`)
        }
        return data
      }())
      const goodPoints = []
      const badPoints = []
      const neuPoints = []
      const maxSize = maxTimes < 60 ? 60 : Math.ceil(80 - 300 / maxTimes)
      for (let i = 1; i < maxTimes; i++) {
        const random = Math.random()
        if (random >= 0.6) {
          goodPoints.push(1)
          neuPoints.push('-')
          badPoints.push('-')
        } else if (random > 0.3 && random < 0.6) {
          goodPoints.push('-')
          neuPoints.push(1)
          badPoints.push('-')
        } else {
          goodPoints.push('-')
          neuPoints.push('-')
          badPoints.push(1)
        }
      }
      this.s_chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: 'Sentiment Timeline',
          left: '20',
          top: '0',
          textStyle: {
            color: '#000',
            fontSize: '14'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: [
            'Good Words',
            'Bad Words',
            'Neutral Words']
        },
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          show: false,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 0,
          end: maxSize,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: 'Good Words',
          type: 'bar',
          barMaxWidth: 60,
          stack: 'points',
          itemStyle: {
            normal: {
              color: 'green',
              barBorderRadius: 0,
              label: {
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: goodPoints
        },
        {
          name: 'Bad Words',
          type: 'bar',
          barMaxWidth: 60,
          stack: 'points',
          itemStyle: {
            normal: {
              color: 'red',
              label: {
                textStyle: {
                  color: '#fff'
                },
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: badPoints
        },
        {
          name: 'Neutral Words',
          type: 'bar',
          barMaxWidth: 60,
          stack: 'points',
          itemStyle: {
            normal: {
              color: '#c9c9c9',
              label: {
                textStyle: {
                  color: '#fff'
                },
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: neuPoints
        }
        ]
      })
    }
  }
}
</script>
