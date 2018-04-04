<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-select class="filter-item" v-model="tableName" placeholder="数据时间">
        <el-option v-for="item in tableNameOptions" :key="item.value" :label="item.name" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" v-model="listQuery.appId" placeholder="业务ID">
        <el-option v-for="item in appList" :key="item.id" :label="item.id" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" v-model="listQuery.ruleId" placeholder="规则集">
        <el-option v-for="item in ruleSetOptions" :key="item.fRuleId" :label="item.fRemark" :value="item.fRuleId">
        </el-option>
      </el-select>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="请求ID" v-model="listQuery.reqId">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="接口名称" v-model="listQuery.interfaceName">
      </el-input>
      <el-date-picker v-model="listQuery.createTimeStart" type="date" class="filter-item" placeholder="起始时间">
      </el-date-picker>至<el-date-picker v-model="listQuery.createTimeEnd" class="filter-item" type="date" placeholder="结束时间">
      </el-date-picker>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-refresh" @click="handleResetFilter">{{$t('table.reset')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中..." border stripe fit highlight-current-row style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="xn-table-code-expand">
            <el-form-item label="请求内容">
              <json-editor :value="scope.row.fReqContent" :readOnly="true"></json-editor>
            </el-form-item>
            <el-form-item label="响应内容">
              <json-editor :value="scope.row.fRespContent" :readOnly="true"></json-editor>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="业务ID">
        <template slot-scope="scope">
          <span>{{scope.row.fAppId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="请求ID">
        <template slot-scope="scope">
          <span>{{scope.row.fReqId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="70px" align="center" label="错误码">
        <template slot-scope="scope">
          <span>{{scope.row.fRespRetcode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="请求耗时(毫秒)">
        <template slot-scope="scope">
          <span>{{scope.row.fCostTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="规则ID">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="数据源">
        <template slot-scope="scope">
          <span>{{scope.row.fDataSource}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="接口名称">
        <template slot-scope="scope">
          <span>{{scope.row.fInterfaceName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.fRemark}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="right" label="请求时间">
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
import dynamicTableUtil from '@/utils/dynamicTableUtil'
import JsonEditor from '@/components/JsonEditor'
import { fetchAllRuleSet } from '@/api/ruleSet'

export default {
  name: 'rawData',
  directives: {
    waves
  },
  components: {
    JsonEditor
  },
  mixins: [dynamicTableUtil],
  data() {
    return {
      entityName: 'rawData',
      ruleSetOptions: [],
      listQuery: {
        appId: undefined,
        ruleId: undefined,
        reqId: undefined,
        interfaceName: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined
      }
    }
  },
  created() {
    fetchAllRuleSet().then(response => {
      this.ruleSetOptions = response.data
    })
  },
  methods: {
    handleResetFilter() {
      for (let key in this.listQuery) {
        this.listQuery[key] = undefined
      }
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.sort = '+id'
      this.getList()
    },
  }
}
</script>

<style scoped>
.xn-btn-mini {
  padding: 5px 5px;
  width: 40px;
}
</style>