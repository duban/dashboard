<template>
  <el-row :gutter="5" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="showList">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="people" class-name="card-panel-icon" />
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="groupData.data.count_silent" :duration="3200" class="card-panel-num" />
            <div class="card-panel-text">
              Count of Silent Calls
            </div>
          </div>
        </div>
<!--        <div class="card-panel-description">-->
<!--          <count-to :start-val="0" :end-val="groupData.data.count_silent" :duration="3200" class="card-panel-num" />-->
<!--          <div class="card-panel-text">-->
<!--            Count of Silent Calls-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="showList">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="documentation" class-name="card-panel-icon" />
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="groupData.data.duration_silent" :duration="3200" class="card-panel-num" />
            <div class="card-panel-text">
              Duration of Silent Calls
            </div>
          </div>
        </div>
<!--        <div class="card-panel-description">-->
<!--          <count-to :start-val="0" :end-val="groupData.data.duration_silent" :duration="3200" class="card-panel-num" />-->
<!--          <div class="card-panel-text">-->
<!--            Duration of Silent Calls-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="showList">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="groupData.data.count_overtime" :duration="3200" class="card-panel-num" />
            <div class="card-panel-text">
              Count of Overtime Calls
            </div>
          </div>
        </div>
<!--        <div class="card-panel-description">-->
<!--          <count-to :start-val="0" :end-val="groupData.data.count_overtime" :duration="3200" class="card-panel-num" />-->
<!--          <div class="card-panel-text">-->
<!--            Count of Overtime Calls-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="showList">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="guide" class-name="card-panel-icon" />
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="groupData.data.duration_overtime" :duration="3200" class="card-panel-num" />
            <div class="card-panel-text">
              Duration of Overtime Calls
            </div>
          </div>
        </div>
<!--        <div class="card-panel-description">-->
<!--          <count-to :start-val="0" :end-val="groupData.data.duration_overtime" :duration="3200" class="card-panel-num" />-->
<!--          <div class="card-panel-text">-->
<!--            Duration of Overtime Calls-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
<!--      <div class="card-panel" @click="handleSetLineChartData('shoppings')">-->
      <div class="card-panel" @click="showList">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="education" class-name="card-panel-icon" />
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="0" :duration="3200" class="card-panel-num" />
            <div class="card-panel-text">
              Agents with Silent Calls
            </div>
          </div>
        </div>
<!--        <div class="card-panel-description">-->
<!--          <count-to :start-val="0" :end-val="0" :duration="3200" class="card-panel-num" />-->
<!--          <div class="card-panel-text">-->
<!--            Agents with Silent Calls-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="showList">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="form" class-name="card-panel-icon" />
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="0" :duration="3200" class="card-panel-num" />
            <div class="card-panel-text">
              Agents with Overtime Calls
            </div>
          </div>
        </div>
<!--        <div class="card-panel-description">-->
<!--          <count-to :start-val="0" :end-val="0" :duration="3200" class="card-panel-num" />-->
<!--          <div class="card-panel-text">-->
<!--            Agents with Overtime Calls-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  props: {
    groupData: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        data: {
          count_silent: 0,
          duration_silent: 0,
          count_overtime: 0,
          duration_overtime: 0
        }

      }
    }
  },
  components: {
    CountTo
  },
  methods: {
    showList() {
      this.$router.push('/call-list')
    },
    handleSetLineChartData(type) {
      console.log(this.groupData)
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>
<style lang="scss" scoped>

  .panel-group {
    margin-top: 0px;
    .card-panel-col {
      margin-top: 0px;
      margin-bottom:18px;
    }
    .card-panel {
      height: 138px;
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
          color: #34bfa3;
        }
        .icon-shopping {
          background: rgba(227, 242, 253);
        }
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
        padding: 6px;
        transition: all 0.38s ease-out;
        border-radius: 30px;
      }
      .card-panel-icon {
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 40px;
      }
      .card-panel-description {
        font-weight: bold;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 26px;
        margin-left: 5px;
        .card-panel-text {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
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
  .box-card-component {
    .box-card-header {
      position: relative;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
      }
    }
    .mallki-text {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 20px;
      font-weight: bold;
    }
    .panThumb {
      z-index: 100;
      height: 70px!important;
      width: 70px!important;
      position: absolute!important;
      top: -45px;
      left: 0px;
      border: 5px solid #ffffff;
      background-color: #fff;
      margin: auto;
      box-shadow: none!important;
      ::v-deep .pan-info {
        box-shadow: none!important;
      }
    }
    .progress-item {
      margin-bottom: 10px;
      font-size: 14px;
    }
    @media only screen and (max-width: 1510px){
      .mallki-text{
        display: none;
      }
    }
  }
</style>
