<template>
  <div class="app-container">
    <el-table
      :data="list"
      border
      stripe
      fit
      highlight-current-row
      :header-cell-style="{background:'#0d5fff',color:'#fff'}"
      style="width: 100%;"
      >
      <el-table-column label="Recording ID" prop="id" sortable="custom" align="left" width="160">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Recording Time" width="210px">
        <template slot-scope="{row}">
          <span>{{ row.recordDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Recording Name" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Agent Name" width="160px">
        <template slot-scope="{row}">
          <span>{{ `${row.agentName}(${row.agentId})` }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Duration" width="160px">
        <template slot-scope="{row}">
          <span>{{ row.duration }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QC Score" width="160px">
        <template slot-scope="{row}">
          <span>{{ row.qcScore.toFixed(4) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-row :gutter="40" class="panel-group key-points">
      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-text-tips">
            Agent Name
          </div>
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{detail.agentName}}
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-text-tips">
            Call Sentiment
          </div>
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="star" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              0.8746
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-text-tips">
            Call Silence
          </div>
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="bug" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{detail.callSilence}}
              <span class="card-panel-text-subtext">%</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-text-tips">
            Call Duration
          </div>
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="example" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{detail.duration}}
              <span class="card-panel-text-subtext">Seconds</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-text-tips">
            Agent Talk Time
          </div>
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="tree-table" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{detail.agentDuration}}
              <span class="card-panel-text-subtext">Seconds</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-text-tips">
            Borrow Talk Time
          </div>
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="chart" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{detail.borrowDuration}}
              <span class="card-panel-text-subtext">Seconds</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="audio">
      <av-line
          class="audio-player"
          :line-width="2"
          line-color="purple"
          :audio-src="audioOpitions.src"
          :canv-width="audioOpitions.width"
          :canv-height="audioOpitions.height"
        >
      </av-line>
    </div>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="chart-container">
        <line-chart height="400px" width="100%" />
      </div>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="chart-container">
        <bar-chart height="300px" width="100%" :maxTimes="detail.duration"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import { fetchCall } from '@/api/call'
import LineChart from './components/Call-Speed-Line-Chart'
import BarChart from './components/Sentiment-Bar-Chart'

export default {
  name: 'CallDetail',
  components: {
    LineChart,
    BarChart
  },
  filters: {
  },
  data() {
    return {
      agentCoefficient: Math.random() * 0.3 + 0.4,
      detail: {},
      list: [],
      audioOpitions: {
        src: 'file_example_MP3_1MG.mp3',
        width: 800,
        height: 120
      }
    }
  },
  created() {
    this.initDetail()
  },
  mounted() {
    document.querySelector('audio').style.display = 'block'
    document.querySelector('audio').style.margin = '0 auto'
  },
  methods: {
    initDetail() {
      console.log('init detail')
      const id = parseInt(this.$route.query.id)
      fetchCall(id).then(response => {
        this.detail.agentName = response.data.agentName
        this.detail.agentId = response.data.agentId
        this.detail.duration = Math.ceil(response.data.duration * response.data.speech_duration_ratio)

        this.detail.callSilence = Math.floor(100 - 100 * response.data.speech_duration_ratio)

        this.detail.agentDuration = Math.floor(this.detail.duration * this.agentCoefficient)
        this.detail.borrowDuration = this.detail.duration - this.detail.agentDuration - 10

        this.detail.decoded_text = response.data.decoded_text
        this.list = [response.data]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  display: flex;
  flex-direction: row;
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    // overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 12px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      min-width: 100px;

      .card-panel-text {
        color: rgba(0, 0, 0, 0.45);
        font-size: 32px;
        font-weight: bold;
        margin-top: 10px;
        .card-panel-text-subtext{
          font-size: 14px;
        }

      }

      .card-panel-num {
        font-size: 21px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

.card-panel{
  .card-panel-text-tips{
    position: absolute;
    width: 100%;
    text-align: center;
    margin-top: -9px;
    font-weight: bold;
    color: #000;
    font-size: 18px;
  }
}

.key-points{
  margin-top: 35px;
}

.audio{
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .audio-player{
    margin: 0 auto;
  }
}

audio{
  display: block;
  margin: 0 auto;
}

.chart-container{
  position: relative;
  width: 100%;
}
</style>
