<template>
  <el-row :gutter="5" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col" style="">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description">
        </div>
      </div>
    </el-col>
<!--    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">-->
<!--      <div class="card-panel" @click="handleSetLineChartData('messages')">-->
<!--        <div class="card-panel-icon-wrapper icon-shopping">-->
<!--          <svg-icon icon-class="documentation" class-name="card-panel-icon" />-->
<!--        </div>-->
<!--        <div class="card-panel-description">-->
<!--          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />-->
<!--          <div class="card-panel-text">-->
<!--            Flow Introduction-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-col>-->
<!--    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">-->
<!--      <div class="card-panel" @click="handleSetLineChartData('purchases')">-->
<!--        <div class="card-panel-icon-wrapper icon-shopping">-->
<!--          <svg-icon icon-class="money" class-name="card-panel-icon" />-->
<!--        </div>-->
<!--        <div class="card-panel-description">-->
<!--          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />-->
<!--          <div class="card-panel-text">-->
<!--            Calling Reason-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-col>-->
<!--    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">-->
<!--      <div class="card-panel" @click="handleSetLineChartData('shoppings')">-->
<!--        <div class="card-panel-icon-wrapper icon-shopping">-->
<!--          <svg-icon icon-class="guide" class-name="card-panel-icon" />-->
<!--        </div>-->
<!--        <div class="card-panel-description">-->
<!--          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />-->
<!--          <div class="card-panel-text">-->
<!--            Greetings-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-col>-->
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>
<style lang="scss" scoped>
  .panel-group {
    margin-top: 20px;
    .card-panel-col {
      margin-top: 20px;
      margin-bottom: 20px;
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
        float: left;
        margin: 25px 0 0 5px;
        padding: 5px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 45px;
      }
      .card-panel-description {
        float: left;
        font-weight: bold;
        margin-top: 35px;
        margin-bottom: 26px;
        margin-left: 5px;
        .card-panel-text {
          line-height: 20px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 11.5px;
          padding-top: 0px;
          margin-bottom: 10px;
        }
        .card-panel-num {
          padding-top: 15px;
          font-size: 20px;
        }
      }
    }
  }
  @media (max-width:400px) {
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
        margin: 10px auto !important;
        float: none !important;
      }
    }
  }

</style>
