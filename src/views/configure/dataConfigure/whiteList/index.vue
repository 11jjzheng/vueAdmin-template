<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-select clearable class="filter-item" v-model="listQuery.appId" placeholder="业务ID">
        <el-option v-for="item in appList" :key="item.id" :label="item.id" :value="item.id">
        </el-option>
      </el-select>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="姓名" v-model="listQuery.name">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="身份证号" v-model="listQuery.idNum">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="手机号" v-model="listQuery.mobile">
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
      <el-table-column width="200px" label="公司">
        <template slot-scope="scope">
          <span>{{scope.row.fCompany}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="职位">
        <template slot-scope="scope">
          <span>{{scope.row.fPosition}}</span>
        </template>
      </el-table-column>
      <el-table-column width="70px" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.fType}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.fRemark}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="120px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="update_permission(entityName)" type="primary" size="mini" class="xn-btn-mini" icon="el-icon-edit" @click="handleUpdate(scope.row)"></el-button>
          <el-button v-if="delete_permission(entityName)" type="danger" size="mini" class="xn-btn-mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="45%" :close-on-click-modal="false">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="130px">
        <el-form-item label="业务ID" prop="fAppId">
          <el-select class="filter-item" v-model="temp.fAppId" placeholder="请选择">
            <el-option v-for="item in appList" :key="item.id" :label="item.id" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="fIdNum">
          <el-input v-model="temp.fIdNum"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop="fName">
          <el-input v-model="temp.fName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="fMobile">
          <el-input v-model="temp.fMobile"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="fCompany">
          <el-input v-model="temp.fCompany"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="fPosition">
          <el-input v-model="temp.fPosition"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="fType">
          <el-input v-model="temp.fType"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="fRemark">
          <el-input v-model="temp.fRemark"></el-input>
        </el-form-item>
      </el-form>
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
import dynamicTableUtil from '@/utils/dynamicTableUtil'
import { fetchList } from '@/api/common'
import { createDynamicTableData, updateDynamicTableData, deleteDynamicTableData } from '@/api/common'

export default {
  name: 'whiteList',
  directives: {
    waves
  },
  mixins: [dynamicTableUtil],
  data() {
    return {
      entityName: 'whiteList',
      ruleSetOptions: [],
      listQuery: {
        appId: undefined,
        name: undefined,
        idNum: undefined,
        mobile: undefined
      },
      temp: {
        fAppId: undefined,
        fIdNum: undefined,
        fName: undefined,
        fMobile: undefined,
        fCompany: undefined,
        fPosition: undefined,
        fType: undefined,
        fRemark: undefined
      },
      rules: {
        fAppId: [{ required: true, message: '业务ID必选', trigger: 'change' }],
        fIdNum: [{ required: true, message: '身份证号必填', trigger: 'blur' }]
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
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.tableName = 0
          createDynamicTableData(this.entityName, this.tableName, this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
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
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.tableName = tempData.fIdNum
          updateDynamicTableData(this.entityName, this.tableName, tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
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
  }
}
</script>

<style scoped>
.xn-btn-mini {
  width: 40px;
}
</style>