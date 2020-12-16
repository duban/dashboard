<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="18" class="panel-group">
      <el-col :xs="18" :sm="18" :lg="24" class="filter" >
        <div class="chart-wrapper" style="padding-left: 70px;padding-right: 10px">
          <el-form :inline="true" :model="filter" class="filter-form">
            <div class="filter-form-left" >
              <el-form-item label="Start Date" style="padding-left: 5px">
                <el-date-picker
                  v-model="filter.sdate"
                  format="yyyy-MM-dd"/>
              </el-form-item>
              <el-form-item label="End Date" style="padding-left: 5px">
                <el-date-picker
                  v-model="filter.edate"
                  format="yyyy-MM-dd"/>
              </el-form-item>
              <el-form-item label="Agent">
                <el-select v-model="filter.agent" placeholder="Select Agent" >
                  <el-option label="Agent1" value="ag1" />
                  <el-option label="Agent2" value="ag2" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" >Apply</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
        <div class="chart-wrapper">
          <box-card box-title="Number of Calls"/>
        </div>
        <div class="chart-wrapper">
          <box-card box-title="Duration of Calls"/>
        </div>
        <div class="chart-wrapper">
          <box-card box-title="Number of Agents"/>
        </div>
      </el-col>
      <el-col :xs="18" :sm="18" :lg="18">
        <div class="chart-wrapper">
          <bar-series style="width: 100%;height: 250px" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="9">
        <div class="chart-wrapper" >
          <piechart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="9">
        <div class="chart-wrapper">
          <piechart />
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/MixChart'
// import BarChart from '../../ethical/components/BarChart'
import BarSeries from '../../ethical/components/BarSeriesChart'
import Piechart from './components/PieChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import moment from 'moment'
// import CountTo from 'vue-count-to'

const sdate = moment().startOf('isoweek').format('YYYY-MM-DD HH:mm:ss')
const edate = moment().format('YYYY-MM-DD HH:mm:ss')

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    BoxCard,
    // GithubCorner,
    Piechart,
    BarSeries
    // ,
    // RaddarChart,
    // PieChart,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      filter: {
        sdate: sdate,
        edate: edate,
        agent: 'ag1'
      },
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");
  .el-form-item--label-top .el-form-item__label {
    width: auto!important;
    float: none;
    display: inline-block;
    text-align: left;
    padding: 0 0 10px;
  }

  .el-form-item--label-top .el-form-item__content {
    margin-left: 0!important;
  }
  .dashboard-editor-container {
    padding: 15px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 16px;
    }
  }

  .panel-group {
    margin-top: 0px;
    .card-panel-col {
      margin-top: 0px;
      margin-bottom:18px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
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
      .card-panel-footer {
        float: left;
        padding: 8px;
      }
      .card-panel-icon-wrapper {
        text-align: center;
        padding: 5px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: top;
        margin-top: 5px;
        font-size: 30px;
      }
      .card-panel-description {
        font-weight: bold;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 26px;
        margin-left: 5px;
        .card-panel-text {
          color: rgba(0, 0, 0, 0.45);
          font-size: 13px;
          padding-top: 5px;
          text-align: center;
          margin-bottom: 10px;
        }
        .card-panel-num {
          padding-top: 10px;
          text-align: center;
          font-size: 18px;
        }
      }
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 10px;
    }
  }
</style>
