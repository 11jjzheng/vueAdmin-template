<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-select clearable class="filter-item" v-model="listQuery.ruleSetId" placeholder="规则集">
        <el-option v-for="item in ruleSetOptions" :key="item.fAutoId" :label="item.fRemark" :value="item.fAutoId">
        </el-option>
      </el-select>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="规则项ID" v-model="listQuery.ruleItemId">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="名称" v-model="listQuery.paramName">
      </el-input>
      <el-select clearable class="filter-item" v-model="listQuery.paramType" placeholder="类型">
        <el-option label="Integer" value="Integer"></el-option>
        <el-option label="Long" value="Long"></el-option>
        <el-option label="Double" value="Double"></el-option>
        <el-option label="String" value="String"></el-option>
      </el-select>
<!--       <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="值" v-model="listQuery.paramValue">
      </el-input> -->
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-refresh" @click="handleResetFilter">{{$t('table.reset')}}</el-button>
      <el-button v-if="multipleSelection.length > 0" class="function-btn" @click="cancelDelete()" icon="el-icon-close" key="btn-cancel-delete"></el-button>
      <el-button v-if="delete_permission(entityName)" class="function-btn" type="danger" icon="el-icon-delete" @click="handleDelete()" :disabled="multipleSelection.length <= 0"></el-button>
      <el-button v-if="create_permission(entityName)" class="function-btn" @click="handleCreate" type="primary" icon="el-icon-plus">{{$t('table.add')}}</el-button>
    </div>

    <el-table ref="dataTable" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中..." 
      border stripe fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
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
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column width="65" align="center" :label="$t('table.id')">
        <template slot-scope="scope">
          <span>{{scope.row.fAutoId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="规则集">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleSet}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="规则项ID">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleItemId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.fParamName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="类型">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select size="small" v-model="scope.row.fParamType">
              <el-option label="Integer" value="Integer"></el-option>
              <el-option label="Long" value="Long"></el-option>
              <el-option label="Double" value="Double"></el-option>
              <el-option label="String" value="String"></el-option>
            </el-select>
          </template>
          <span v-else>{{ scope.row.fParamType }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="值">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.fParamValue"></el-input>
          </template>
          <span v-else>{{ scope.row.fParamValue }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="备注">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input size="small" v-model="scope.row.fRemark"></el-input>
          </template>
          <span v-else>{{ scope.row.fRemark }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="120px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit && update_permission(entityName)" type="success" class="xn-btn-mini" @click="confirmEdit(scope.row)" icon="el-icon-check" key="btn-check"></el-button>
          <el-button v-if="scope.row.edit" class="xn-btn-mini" @click="cancelEdit(scope.row)" icon="el-icon-close" key="btn-cancel"></el-button>
          <el-button v-else type="primary" class="xn-btn-mini" @click='scope.row.edit=!scope.row.edit' icon="el-icon-edit"></el-button>
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
import { fetchAllRuleSet } from '@/api/ruleSet'
import { fetchList, updateData } from '@/api/common'
import { deleteBatch } from '@/api/ruleParam'

export default {
  name: 'ruleParam',
  directives: {
    waves
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'ruleParam',
      ruleSetOptions: [],
      listQuery: {
        ruleSetId: undefined,
        ruleItemId: undefined,
        paramName: undefined,
        paramType: undefined,
        paramValue: undefined
      },
      temp: {
        fAutoId: undefined,
        fRuleItemId: '',
        fParamName: '',
        fParamType: '',
        fParamValue: '',
        fRemark: ''
      },
      rules: {
        fAppId: [{ required: true, message: '业务ID必选', trigger: 'change' }],
        fType: [{ required: true, message: '类型必填', trigger: 'blur' }],
        fKeywordList: [{ required: true, message: '列表必填', trigger: 'blur' }]
      },
      multipleSelection: []
    }
  },
  created() {
    fetchAllRuleSet().then(response => {
      this.ruleSetOptions = response.data
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.entityName, this.listQuery).then(response => {
        const items = response.data.data
        this.list = items.map(v => {
          this.$set(v, 'edit', false)
          v.originalType = v.fParamType
          v.originalValue = v.fParamValue
          v.originalRemark = v.fRemark
          return v
        })
        this.total = response.data.total
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      row.fParamType = row.originalType
      row.fParamValue = row.originalValue
      row.fRemark = row.originalRemark
      row.edit = false
    },
    confirmEdit(row) {
      row.edit = false
      row.originalType = row.fParamType
      row.originalValue = row.fParamValue
      row.originalRemark = row.fRemark
      const tempData = Object.assign({}, row)
      updateData(this.entityName, tempData).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete() {
      this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          data: this.multipleSelection 
        }
        deleteBatch(data).then(() => {
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
    },
    cancelDelete() {
      this.$refs.dataTable.clearSelection();
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