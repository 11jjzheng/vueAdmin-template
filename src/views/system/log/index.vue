<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="模块" v-model="listQuery.module">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="操作人" v-model="listQuery.operator">
      </el-input>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-refresh" @click="handleResetFilter">{{$t('table.reset')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中..." border stripe fit highlight-current-row style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="xn-table-expand">
            <el-form-item label="请求数据">
              <!-- <json-editor :value="scope.row.fData" :readOnly="true"></json-editor> -->
              <span>{{scope.row.fData}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="本地IP">
        <template slot-scope="scope">
          <span>{{scope.row.fLocalAddress}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="请求IP">
        <template slot-scope="scope">
          <span>{{scope.row.fRemoteAddress}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="请求地址">
        <template slot-scope="scope">
          <span>{{scope.row.fUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="请求方法">
        <template slot-scope="scope">
          <span>{{scope.row.fMethod}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="模块">
        <template slot-scope="scope">
          <span>{{scope.row.fModule}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="子模块">
        <template slot-scope="scope">
          <span>{{scope.row.fSubModule}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="操作">
        <template slot-scope="scope">
          <span>{{scope.row.fOperate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="操作人">
        <template slot-scope="scope">
          <span>{{scope.row.fOperator}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="操作时间">
        <template slot-scope="scope">
          <span>{{scope.row.fCreateTime | parseTime}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import tableUtil from '@/utils/tableUtil'
import JsonEditor from '@/components/JsonEditor'

export default {
  name: 'log',
  directives: {
    waves
  },
  components: {
    JsonEditor
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'operateLog',
      listQuery: {
        module: undefined,
        operator: undefined
      }
    }
  }
}
</script>

<style scoped>
.xn-btn-mini {
  width: 40px;
}
</style>