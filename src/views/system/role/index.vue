<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="编号" v-model="listQuery.code">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="名称" v-model="listQuery.name">
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
              <span>{{ scope.row.createTime | parseTime}}</span>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ scope.row.createUser }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="组织">
        <template slot-scope="scope">
          <span>{{scope.row.orgName | orgNameFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="编号">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime | parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="更新人">
        <template slot-scope="scope">
          <span>{{scope.row.updateUser}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="300px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="update_permission(entityName)" type="primary" class="xn-btn-mini" icon="el-icon-edit" @click="handleUpdate(scope.row)"></el-button>
          <el-button v-if="delete_permission(entityName)" type="danger" class="xn-btn-mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
          <el-button v-if="function_permission('rolePermission')" style="width:90px" type="success" icon="el-icon-setting" @click="handleFunctionPermissionAdd(scope.row)">操作权限</el-button>
          <el-button v-if="function_permission('roleRuleSet')" style="width:90px" type="warning" icon="el-icon-setting" @click="handleDataPermissionAdd(scope.row)">数据权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="130px">
        <el-form-item v-if="globalUser" label="组织" prop="orgId">
          <el-select class="filter-item" v-model="temp.orgId" placeholder="请选择">
            <el-option :key="-1" label="全局" :value="-1">
            </el-option>
            <el-option v-for="item in orgOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编号" prop="code">
          <el-input v-model="temp.code"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="操作权限" :visible.sync="functionPermissionDialogFormVisible" width="30%" :close-on-click-modal="false">
      <z-tree 
        ref="functionPermissionTree" 
        treeId="function-permission-tree" 
        url="role/permission/list" 
        :params="functionPermissionTreeParams" 
        :checkEnable="function_permission('rolePermissionUpdate')"
        :chkboxType="chkboxType"></z-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="functionPermissionDialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="function_permission('rolePermissionUpdate')" type="primary" @click="handleFunctionPermissionAdding">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="数据权限" :visible.sync="dataPermissionDialogFormVisible" width="30%" :close-on-click-modal="false">
      <z-tree 
        ref="dataPermissionTree" 
        treeId="data-permission-tree" 
        url="role/data/permission/list" 
        :params="dataPermissionTreeParams"
        :checkEnable="function_permission('roleRuleSetUpdate')"
        :chkboxType="chkboxType"></z-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dataPermissionDialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="function_permission('roleRuleSetUpdate')" type="primary" @click="handleDataPermissionAdding">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import waves from '@/directive/waves' // 水波纹指令
import tableUtil from '@/utils/tableUtil'
import zTree from '@/components/ZTree/index.vue'
import {fetchAllOrganization} from '@/api/organization'
import {updateFunctionPermission, updateDataPermission} from '@/api/role'

export default {
  name: 'role',
  directives: {
    waves
  },
  components: {
    zTree
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'role',
      listQuery: {
        code: undefined,
        name: undefined
      },
      temp: {
        id: undefined,
        code: undefined,
        name: undefined,
        orgId: undefined
      },
      rules: {
        code: [{ required: true, message: '编号必填', trigger: 'blur' }],
        name: [{ required: true, message: '名称必填', trigger: 'blur' }]
      },
      functionPermissionTreeParams: {
        roleId: undefined
      },
      functionPermissionDialogFormVisible: false,
      orgOptions: [],
      dataPermissionDialogFormVisible: false,
      dataPermissionTreeParams: {
        roleId: undefined
      },
      chkboxType: {
        "Y" : "ps", 
        "N" : "s"
      }
    }
  },
  created() {
    fetchAllOrganization().then(response => {
      this.orgOptions = response.data
    })
  },
  computed: {
    ...mapGetters([
      'globalUser',
      'orgId'
    ])
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        code: undefined,
        name: undefined,
        orgId: this.orgId
      }
    },
    handleFunctionPermissionAdd(row) {
      this.functionPermissionDialogFormVisible = true
      let temp = Object.assign({}, row)
      this.functionPermissionTreeParams = {
        roleId: temp.id
      }
    },
    handleFunctionPermissionAdding() {
      this.functionPermissionDialogFormVisible = false
      let data = {
        roleId: this.functionPermissionTreeParams.roleId,
        tree: JSON.stringify(this.$refs.functionPermissionTree.getNodes())
      }
      updateFunctionPermission(data).then(() => {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleDataPermissionAdd(row) {
      this.dataPermissionDialogFormVisible = true
      let temp = Object.assign({}, row)
      this.dataPermissionTreeParams = {
        roleId: temp.id
      }
    },
    handleDataPermissionAdding() {
      this.dataPermissionDialogFormVisible = false
      let data = {
        roleId: this.dataPermissionTreeParams.roleId,
        tree: JSON.stringify(this.$refs.dataPermissionTree.getNodes())
      }
      console.log(data)
      updateDataPermission(data).then(() => {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style scoped>
.xn-btn-mini {
  width: 40px;
}
</style>