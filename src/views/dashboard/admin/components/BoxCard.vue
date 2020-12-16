<template>
  <el-row :gutter="5" class="panel-group">
    <el-col :xs="16" :sm="16" :lg="23" class="card-panel-col">
      <div class="card-panel" @click="showList">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="guide" class-name="card-panel-icon" />
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="0" :duration="3200" class="card-panel-num" />
            <div class="card-panel-text">
              {{ boxTitle }}
            </div>
          </div>
        </div>
<!--        <div class="card-panel-description">-->
<!--          <count-to :start-val="0" :end-val="0" :duration="3200" class="card-panel-num" />-->
<!--          <div class="card-panel-text">-->
<!--            {{ boxTitle }}-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import CountTo from 'vue-count-to'

export default {
  props: {
    boxTitle: String
  },
  components: { CountTo },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  methods: {
    showList() {
      this.$router.push('/call-list')
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
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
          background: rgba(234,233,238);
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
        padding: 5px;
        transition: all 0.38s ease-out;
        border-radius: 50px;
      }
      .card-panel-icon {
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 46px;
      }
      .card-panel-description {
        font-weight: bold;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 26px;
        margin-left: 5px;
        .card-panel-text {
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
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
