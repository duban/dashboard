<template>
<!--  <div class="dashboard-editor-container">-->
<!--    <el-row :gutter="18" class="panel-group">-->
<!--      <el-col :xs="18" :sm="18" :lg="24" class="filter" >-->
<!--        <div class="chart-wrapper" style="padding-left: 70px;padding-right: 10px">-->
<!--          <el-form :inline="true" :model="filter" class="filter-form">-->
<!--            <div class="filter-form-left" >-->
<!--              <el-form-item label="Start Date" style="padding-left: 5px">-->
<!--                <el-date-picker-->
<!--                  v-model="filter.sdate"-->
<!--                  format="yyyy-MM-dd"/>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="End Date" style="padding-left: 5px">-->
<!--                <el-date-picker-->
<!--                  v-model="filter.edate"-->
<!--                  format="yyyy-MM-dd"/>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="Agent">-->
<!--                <el-select v-model="filter.agent" placeholder="Select Agent" >-->
<!--                  <el-option label="Agent1" value="ag1" />-->
<!--                  <el-option label="Agent2" value="ag2" />-->
<!--                </el-select>-->
<!--              </el-form-item>-->
<!--              <el-form-item>-->
<!--                <el-button type="primary" @click="onSubmit" >Apply</el-button>-->
<!--              </el-form-item>-->
<!--            </div>-->
<!--          </el-form>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    &lt;!&ndash;      <panel-group @handleSetLineChartData="handleSetLineChartData" />&ndash;&gt;-->
<!--  </div>-->
<!--  <div :class="{'show':show}" class="header-search">-->
<!--    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />-->
<!--    <el-select-->
<!--      ref="headerSearchSelect"-->
<!--      v-model="search"-->
<!--      :remote-method="querySearch"-->
<!--      filterable-->
<!--      default-first-option-->
<!--      remote-->
<!--      placeholder="Search"-->
<!--      class="header-search-select"-->
<!--      @change="change"-->
<!--    >-->
<!--      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />-->
<!--    </el-select>-->
<!--  </div>-->
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'
import path from 'path'

export default {
  name: 'HeaderSearch',
  data() {
    return {
      search: '',
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes
    }
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list) {
      this.initFuse(list)
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  },
  methods: {
    click() {
      this.show = !this.show
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
      }
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.options = []
      this.show = false
    },
    change(val) {
      this.$router.push(val.path)
      this.search = ''
      this.options = []
      this.$nextTick(() => {
        this.show = false
      })
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      })
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) { continue }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]

          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
