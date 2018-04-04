<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-select clearable class="filter-item" v-model="listQuery.appId" placeholder="业务ID">
        <el-option v-for="item in appList" :key="item.id" :label="item.id" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" v-model="listQuery.ruleId" placeholder="规则集">
        <el-option v-for="item in ruleSetOptions" :key="item.fRuleId" :label="item.fRemark" :value="item.fRuleId">
        </el-option>
      </el-select>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="姓名" v-model="listQuery.name">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="身份证号" v-model="listQuery.idNum">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="手机号" v-model="listQuery.mobile">
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
          <el-form label-position="left" inline class="xn-table-expand">
            <el-form-item label="原因">
              <span>{{ scope.row.fReason }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="业务ID">
        <template slot-scope="scope">
          <span>{{scope.row.fAppId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.fName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="身份证号">
        <template slot-scope="scope">
          <span>{{scope.row.fIdNum}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.fMobile}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="请求ID">
        <template slot-scope="scope">
          <span>{{scope.row.fReqId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="规则集">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="规则项ID">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleItemId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="分类">
        <template slot-scope="scope">
          <span>{{scope.row.fType | typeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="子分类">
        <template slot-scope="scope">
          <span>{{scope.row.fSubType | subTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="right" label="过期时间">
        <template slot-scope="scope">
          <span>{{scope.row.fExpireDate | parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="right" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.fCreateTime | parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="right" label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.fUpdateTime | parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="70px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="delete_permission(entityName)" type="danger" class="xn-btn-mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
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
import { fetchList } from '@/api/common'
import { deleteDynamicTableData } from '@/api/common'

const typeMap = {
  0: '无分类',
  1: '外部机构输入',
  2: '牛贷系严重逾期',
  3: '骗贷中介',
  4: '赌博、吸毒、犯罪黑名单及列入失信人、被执行人名单',
  5: '集团线下黑名单',
  6: '贷后提报欺诈',
  7: '其他类'
}

export default {
  name: 'rejectList',
  directives: {
    waves
  },
  components: {
    JsonEditor
  },
  created() {
    fetchAllRuleSet().then(response => {
      this.ruleSetOptions = response.data
    })
  },
  mixins: [dynamicTableUtil],
  data() {
    return {
      entityName: 'rejectList',
      ruleSetOptions: [],
      listQuery: {
        appId: undefined,
        ruleId: undefined,
        name: undefined,
        idNum: undefined,
        mobile: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.entityName, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleDelete(row) {
      let temp = Object.assign({}, row)
      this.tableName = temp.fIdNum
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDynamicTableData(this.entityName, this.tableName, temp).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {

      });
    }
  },
  filters: {
    typeFilter(type) {
      return typeMap[type]
    },
    subTypeFilter(type) {
      if (type == 1) {
        return '不受理名单'
      } 
      return '黑名单'
    }
  }
}
</script>

<style scoped>
.xn-btn-mini {
  padding: 5px 5px;
  width: 40px;
}
</style>