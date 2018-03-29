<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-select clearable class="filter-item" v-model="listQuery.appId" placeholder="业务ID">
        <el-option v-for="item in appIdOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="名称" v-model="listQuery.name">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="处理器" v-model="listQuery.bizClass">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="备注" v-model="listQuery.remark">
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
              <span>{{ scope.row.fCreateTime }}</span>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ scope.row.fCreateUser }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ scope.row.fUpdateTime }}</span>
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
      <el-table-column width="150px" align="center" label="业务ID">
        <template slot-scope="scope">
          <span>{{scope.row.fAppId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="400px" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="处理器">
        <template slot-scope="scope">
          <span>{{scope.row.fBizClass}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="450px" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.fRemark}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="250px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="function_permission(entityName, 'import')" type="primary" @click="handleImport(scope.row)">导入</el-button>
          <el-button v-if="function_permission(entityName, 'export')" type="primary" @click="handleExport(scope.row)">导出</el-button>
          <el-button v-if="update_permission(entityName)" type="primary" class="xn-btn-mini" icon="el-icon-edit" @click="handleUpdate(scope.row)"></el-button>
          <el-button v-if="delete_permission(entityName)" type="danger" class="xn-btn-mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="130px">
        <el-form-item label="业务ID" prop="fAppId">
          <el-select class="filter-item" v-model="temp.fAppId" placeholder="请选择">
            <el-option v-for="item in appIdOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属组织" prop="OrgId">
          <el-select class="filter-item" v-model="temp.OrgId" placeholder="请选择">
            <el-option v-for="item in orgIdOptions" :key="item" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称(英文描述)" prop="fRuleId">
          <el-input v-model="temp.fRuleId"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理器" prop="fBizClass">
          <el-input v-model="temp.fBizClass"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="fRemark">
          <el-input v-model="temp.fRemark"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleInputAdd" type="primary" icon="el-icon-plus" style="float:right;margin-bottom:10px;">添加</el-button>
      <el-table :key='inputTableKey' :data="inputList" v-loading="inputListLoading" element-loading-text="加载中..." border stripe fit highlight-current-row style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="xn-table-expand">
              <el-form-item label="创建时间">
                <span>{{ scope.row.fCreateTime }}</span>
              </el-form-item>
              <el-form-item label="创建人">
                <span>{{ scope.row.fCreateUser }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ scope.row.fUpdateTime }}</span>
              </el-form-item>
              <el-form-item label="更新人">
                <span>{{ scope.row.fUpdateUser }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" label="名称">
          <template slot-scope="scope">
            <span>{{scope.row.fFieldName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注">
          <template slot-scope="scope">
            <span>{{scope.row.fRemark}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否必须">
          <template slot-scope="scope">
            <span>{{scope.row.fIsRequired | isRequiredFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.actions')" width="100px" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" class="xn-btn-mini" icon="el-icon-edit" @click="handleInputAdding(scope.row)"></el-button>
            <el-button type="danger" class="xn-btn-mini" icon="el-icon-delete" @click="handleInputDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="textMap[dialogAddingInputStatus]"
        :visible.sync="dialogAddingInputVisible"
        append-to-body>
        <el-form :rules="inputRules" ref="dataForm" :model="inputTemp" label-position="left" label-width="130px">
          <el-form-item label="名称" prop="fFieldName">
            <el-input v-model="inputTemp.fFieldName"></el-input>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注" prop="fRemark">
            <el-input v-model="inputTemp.fRemark"></el-input>
          </el-form-item>
          <el-form-item label="是否必须" prop="fIsRequired">
            <el-select v-model="inputTemp.fIsRequired" placeholder="请选择">
              <el-option label="否" :value="1"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddingInputVisible = false">{{$t('table.cancel')}}</el-button>
          <el-button v-if="dialogAddingInputStatus=='create'" type="primary" @click="createInputData">{{$t('table.confirm')}}</el-button>
          <el-button v-else type="primary" @click="updateInputData">{{$t('table.confirm')}}</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import tableUtil from '@/utils/tableUtil'

export default {
  name: 'ruleSet',
  directives: {
    waves
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'ruleSet',
      orgIdOptions: [{id: 1, name: "牛鼎丰"}],
      listQuery: {
        appId: undefined,
        name: undefined,
        bizClass: undefined,
        remark: undefined
      },
      temp: {
        fAutoId: undefined,
        fAppId: '',
        OrgId: '',
        fRuleId: '',
        fBizClass: '',
        fRemark: ''
      },
      rules: {
        fAppId: [{ required: true, message: '业务ID必选', trigger: 'change' }],
        fRuleId: [{ required: true, message: '名称必填', trigger: 'blur' }],
        fRemark: [{ required: true, message: '备注必填', trigger: 'blur' }]
      },
      inputTableKey: 11,
      inputList: [{fAutoId: 1,
        fFieldName: 'idNum',
        fRemark: '身份证号',
        fIsRequired: 1}],
      inputListLoading: false,
      inputTemp: {
        fAutoId: undefined,
        fFieldName: '',
        fRemark: '',
        fIsRequired: ''
      },
      inputRules: {
        fFieldName: [{ required: true, message: '名称必填', trigger: 'blur' }],
        fIsRequired: [{ required: true, message: '是否必须必选', trigger: 'change' }]
      },
      dialogAddingInputVisible: false,
      dialogAddingInputStatus: ''
    }
  },
  methods: {
    handleImport() {

    },
    handleExport() {

    },
    resetInputTemp() {
      this.inputTemp = {
        fAutoId: undefined,
        fFieldName: '',
        fRemark: '',
        fIsRequired: ''
      }
    },
    handleInputAdd() {
      this.resetInputTemp()
      this.dialogAddingInputStatus = 'create'
      this.dialogAddingInputVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleInputAdding(row) {
      this.inputTemp = Object.assign({}, row) // copy obj
      this.dialogAddingInputStatus = 'update'
      this.dialogAddingInputVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createInputData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createData('ruleSetInpt', this.temp).then(() => {
            this.getList()
            this.dialogAddingInputVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateInputData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.inputTemp)
          updateData('ruleSetInpt', tempData).then(() => {
            this.getList()
            this.dialogAddingInputVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleInputDelete(row) {
      let temp = Object.assign({}, row)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteData('ruleSetInpt', temp).then(() => {
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
    isRequiredFilter(isRequired) {
      if (isRequired == 1) {
        return "是"
      }
      return "否"
    }
  }
}
</script>

<style scoped>
.xn-btn-mini {
  width: 40px;
}
</style>