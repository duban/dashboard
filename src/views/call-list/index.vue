<template>
  <div class="app-container">
    <div class="filter-container table-container">
      <el-input v-model="listQuery.name" placeholder="Search by Recording Name" style="flex: 1; min-width: 500px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.agentId" placeholder="Filter by Agent" clearable style="width: 240px" class="filter-item" @input="handleFilter">
        <el-option v-for="(item, index) in agentList" :key="index" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 160px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      :header-cell-style="{background:'#0d5fff',color:'#fff'}"
      v-loading="listLoading"
      :data="list"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="Recording ID" prop="id" sortable="custom" align="left" width="160" :class-name="getSortClass('id')">
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
          <span>{{ row.duration }} Seconds</span>
        </template>
      </el-table-column>
      <el-table-column label="QC Score" width="160px">
        <template slot-scope="{row}">
          <span>{{ row.qcScore.toFixed(4) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index }">
          <el-button type="success" size="mini" @click="showDetail(row)">
            Detail
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchList, fetchAgentList } from '@/api/call'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CallList',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      agentList: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        startTs: this.$route.query.startTs,
        endTs: this.$route.query.endTs,
        page: 1,
        limit: 10,
        agentId: undefined,
        name: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }] }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true

      const listResponse = await fetchList(this.listQuery)

      this.list = listResponse.data.items
      this.total = listResponse.data.total
      const agentResponse = await fetchAgentList()
      this.agentList = agentResponse.data.items
      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    showDetail(row) {
      this.$router.push(`/call-detail?id=${row.id}`)
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style lang="scss" scoped>
.table-container {
  display: flex;
  flex-direction: row;
}
</style>
