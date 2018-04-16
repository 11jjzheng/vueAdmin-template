<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="说明" v-model="listQuery.remark">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="表达式" v-model="listQuery.expression">
      </el-input>
      <el-select clearable class="filter-item" v-model="listQuery.status" placeholder="状态">
        <el-option label="启用" :value="1"></el-option>
        <el-option label="停用" :value="2"></el-option>
      </el-select>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="创建人" v-model="listQuery.createUser">
      </el-input>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-refresh" @click="handleResetFilter">{{$t('table.reset')}}</el-button>
      <el-button v-if="create_permission(entityName)" class="function-btn" @click="handleCreate" type="primary" icon="el-icon-plus">{{$t('table.add')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中..." border stripe fit highlight-current-row style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="xn-table-expand">
            <el-form-item label="创建时间">
              <span>{{ scope.row.fCreateTime | parseTime}}</span>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ scope.row.fCreateUser }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ scope.row.fUpdateTime | parseTime}}</span>
            </el-form-item>
            <el-form-item label="更新人">
              <span>{{ scope.row.fUpdateUser }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="65" align="center" :label="$t('table.id')">
        <template slot-scope="scope">
          <span>{{scope.row.fAutoId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="排序">
        <template slot-scope="scope">
          <span>{{scope.row.fOrder}}</span>
        </template>
      </el-table-column>
      <el-table-column width="400px" label="说明">
        <template slot-scope="scope">
          <span>{{scope.row.fRemark}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="450px" label="表达式">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleExpression}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="120px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="update_permission(entityName)" type="primary" class="xn-btn-mini" icon="el-icon-edit" @click="handleUpdate(scope.row)"></el-button>
          <el-button v-if="function_permission('ruleItemOpen') && scope.row.fState === 2" type="success" @click="handleEnable(scope.row)">启用</el-button>
          <el-button v-if="function_permission('ruleItemClose') && scope.row.fState === 1" type="danger" @click="handleDisable(scope.row)">停用</el-button>
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
import { enableData, disableData } from '@/api/ruleItem'

export default {
  name: 'ruleItem',
  directives: {
    waves
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'ruleItem',
      listQuery: {
        ruleSetId: this.$route.params.ruleSetId,
        remark: undefined,
        expression: undefined,
        status: undefined,
        createUser: undefined
      }
    }
  },
  watch: {
    $route: function(curVal, oldVal) {
      let curRuleSetId = curVal.params.ruleSetId
      let oldRuleSetId = oldVal.params.ruleSetId
      if (curRuleSetId != oldRuleSetId) {
        this.listQuery.ruleSetId = curRuleSetId
        this.getList()
      }
    }
  },
  methods: {
    handleResetFilter() {
      this.listQuery = {
        page: 1,
        limit: 10,
        sort: '+id',
        remark: undefined,
        expression: undefined,
        status: undefined,
        createUser: undefined,
        ruleSetId: this.$route.params.ruleSetId
      }
      this.getList()
    },
    handleEnable(row) {
      let temp = Object.assign({}, row)
      this.$confirm('此操作将启用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        enableData(temp).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '启用成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {

      });
    },
    handleDisable(row) {
      let temp = Object.assign({}, row)
      this.$confirm('此操作将停用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        disableData(temp).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '停用成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {

      });
    },
    handleCreate() {
      let ruleSetId = this.listQuery.ruleSetId
      this.$router.push({ path: '/application/ruleItemCreate/' + ruleSetId, params: { 'tagName': '新增规则项' }})
    },
    handleUpdate(row) {
      
    },
  },
}
</script>

<style scoped>
.xn-btn-mini {
  width: 40px;
}
</style>