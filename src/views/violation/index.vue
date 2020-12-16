<template>
    <div class="dashboard-editor-container">
      <div class="vld-parent">
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="false" :loader="loader"></loading>
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
        <el-col>
          <div style="width:100%" >
            <panel-group :group-data="groupData"/>
          </div>
        </el-col>
        <!--      <panel-group @handleSetLineChartData="handleSetLineChartData" />-->
        <el-col :xs="18" :sm="18" :lg="9">
          <div class="chart-wrapper">
            <pie-chart :chart-data="pieChartData" chart-title="Distribution of Total Length of Calls by Minutes"/>
          </div>
        </el-col>
        <el-col :xs="18" :sm="18" :lg="15">
          <div class="chart-wrapper" >
            <bar-series style="width: 100%;height: 250px" chart-title="Number of Silent Calls on at least one side Distribution by Day"/>
          </div>
        </el-col>
        <el-col :xs="18" :sm="18" :lg="9">
          <div class="chart-wrapper">
            <pie-chart :chart-data="pieChartData" chart-title="Distribution of Total Length of Calls by Minutes"/>
          </div>
        </el-col>
        <el-col :xs="18" :sm="18" :lg="15">
          <div class="chart-wrapper">
            <bar-series style="width: 100%;height: 250px" chart-title="Number of Overtime Calls on at least one side Distribution by Day"/>
          </div>
        </el-col>
      </el-row>
      <!--      <panel-group @handleSetLineChartData="handleSetLineChartData" />-->
    </div>
  </div>

</template>
<script type="text/javascript">
import PanelGroup from '../dashboard/admin/components/PanelGroup'
import BarSeries from '../ethical/components/BarSeriesChart'
import PieChart from '../dashboard/admin/components/PieChart'
import { callingGroup } from '@/api/calling'

import Loading from 'vue-loading-overlay'
import moment from 'moment'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

// const getEndDate = function() {
//   const toTwoDigits = num => num < 10 ? '0' + num : num
//   var today = new Date()
//   var year = today.getFullYear()
//   var month = toTwoDigits(today.getMonth() + 1)
//   var day = toTwoDigits(today.getDate())
//   return `${year}-${month}-${day}`
// }
//
// const getStartDate = function() {
//   const toTwoDigits = num => num < 10 ? '0' + num : num
//   var today = new Date()
//   var days = 86400000
//   var fiveDaysAgo = new Date(today - (5 * days))
//   var day = toTwoDigits(fiveDaysAgo.getDate())
//   var month = toTwoDigits(fiveDaysAgo.getMonth() + 1)
//   var year = fiveDaysAgo.getFullYear()
//   return `${year}-${month}-${day}`
// }

// let calling = null

const sdate = moment().startOf('isoweek').format('YYYY-MM-DD HH:mm:ss')
const edate = moment().format('YYYY-MM-DD HH:mm:ss')

const pieChartData = {
  spokeData: { data: [{ value: 140, name: 'Agent' }, { value: 220, name: 'Borrower' }], legend: ['Agent', 'Borrower'] }
}

// const lineChartData = {
//   newVisitis: {
//     expectedData: [100, 120, 161, 134, 105, 160, 165],
//     actualData: [120, 82, 91, 154, 162, 140, 145]
//   },
//   messages: {
//     expectedData: [200, 192, 120, 144, 160, 130, 140],
//     actualData: [180, 160, 151, 106, 145, 150, 130]
//   },
//   purchases: {
//     expectedData: [80, 100, 121, 104, 105, 90, 100],
//     actualData: [120, 90, 100, 138, 142, 130, 130]
//   },
//   shoppings: {
//     expectedData: [130, 140, 141, 142, 145, 150, 160],
//     actualData: [120, 82, 91, 154, 162, 140, 130]
//   }
// }

export default {
  name: 'ViolationGroup',
  components: {
    Loading,
    PanelGroup,
    PieChart,
    // GithubCorner,
    // BarChart,
    BarSeries
    // HeatMap,
    // WordCloud
    // ,
    // RaddarChart,
    // PieChart,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      loader: 'dots',
      filter: {
        sdate: sdate,
        edate: edate,
        agent: 'ag2'
      },
      groupData: {
        'status': 200,
        'data': {
          'count_silent': 0,
          'duration_silent': 0,
          'count_overtime': 0,
          'duration_overtime': 0
        }
      },
      // pie1: piChartData
      pieChartData: pieChartData.spokeData
    }
  },
  async created() {
    // const callResp = await callingGroup({ sdate: '2020-09-22', edate: '2020-09-27' })
    // this.calling = callResp.data
    // console.log(this.calling)
    // await this.initData()
  },
  methods: {
    async initData() {
      this.isLoading = true
      // simulate AJAX
      // setTimeout(() => {
      //   this.isLoading = false
      // }, 5000)
      const callResp = await callingGroup({ sdate: '2020-09-22', edate: '2020-09-27' })
      // const callResp = await callingGroup({ sdate: 'sdate', edate: edate })
      if (callResp.status === 200) {
        this.groupData = callResp.data
        // console.log({ hasil: this.groupData )
        this.isLoading = false
      } else if (callResp.status === 500) {
        this.isLoading = false
        console.log({ gagal: this.groupData })
      }
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
