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
<!--      <panel-group @handleSetLineChartData="handleSetLineChartData" />-->
      <el-col :xs="18" :sm="18" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="18" :sm="18" :lg="16">
        <div class="chart-wrapper">
          <bar-series style="width: 100%;height: 250px" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper" >
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <word-cloud />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <heat-map style="width: 100%;height: 250px" chart-title="Speed of Calls" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <heat-map style="width: 100%;height: 250px" chart-title="Amplitude of Calls" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <heat-map style="width: 100%;height: 250px" chart-title="Change Speed of Calls" />
        </div>
      </el-col>
      <el-col :xs="20" :sm="20" :lg="12">
        <div class="chart-wrapper">
          <heat-map style="width: 100%;height: 250px" chart-title="Change Amplitude of Calls" />
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script type="text/javascript">
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/MixChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
import WordCloud from './components/WordCloud'
import HeatMap from './components/HeatMap'
import BarChart from './components/BarChart'
// import LineChart from '../charts/line'
import BarSeries from './components/BarSeriesChart'
import PieChart from '../dashboard/admin/components/PieChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

const getEndDate = function() {
  const toTwoDigits = num => num < 10 ? '0' + num : num
  var today = new Date()
  var year = today.getFullYear()
  var month = toTwoDigits(today.getMonth() + 1)
  var day = toTwoDigits(today.getDate())
  return `${year}-${month}-${day}`
}

const getStartDate = function() {
  const toTwoDigits = num => num < 10 ? '0' + num : num
  var today = new Date()
  var days = 86400000
  var fiveDaysAgo = new Date(today - (5 * days))
  var day = toTwoDigits(fiveDaysAgo.getDate())
  var month = toTwoDigits(fiveDaysAgo.getMonth() + 1)
  var year = fiveDaysAgo.getFullYear()
  return `${year}-${month}-${day}`
}

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
  name: 'EthicalGroup',
  components: {
    PieChart,
    // GithubCorner,
    BarChart,
    BarSeries,
    HeatMap,
    WordCloud
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
        sdate: getStartDate(),
        edate: getEndDate(),
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

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 10px;
  }
}
</style>
