<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="工号" v-model="listQuery.jobNumber">
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
      <el-table-column width="200px" label="工号">
        <template slot-scope="scope">
          <span>{{scope.row.jobNumber}}</span>
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
      <el-table-column align="center" :label="$t('table.actions')" width="260px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="update_permission(entityName)" type="primary" class="xn-btn-mini" icon="el-icon-edit" @click="handleUpdate(scope.row)"></el-button>
          <el-button v-if="delete_permission(entityName)" type="danger" class="xn-btn-mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-setting" @click="handleRole(scope.row)">角色</el-button>
          <el-button type="warning" icon="el-icon-view" @click="handlePermission(scope.row)">权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" 
        :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" 
        layout="total, sizes, prev, pager, next, jumper" :total="total">
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
        <el-form-item label="工号" prop="jobNumber">
          <el-input v-model="temp.jobNumber"></el-input>
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

    <el-dialog title="角色" :visible.sync="dialogRoleVisible" :close-on-click-modal="false">
      <el-button @click="handleRoleAdd" type="primary" icon="el-icon-plus" style="float:right;margin-bottom:10px;">添加</el-button>
      <el-table :key='roleTableKey' :data="roleList" v-loading="roleListLoading" element-loading-text="加载中..." border stripe fit highlight-current-row style="width: 100%">
        <el-table-column width="200px" align="center" label="编号">
          <template slot-scope="scope">
            <span>{{scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="名称">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.actions')" width="100px" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="function_permission('userRoleDelete')" type="danger" class="xn-btn-mini" icon="el-icon-delete" @click="handleRoleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="选择角色"
        :visible.sync="dialogChooseRoleVisible"
        append-to-body>
        <el-table :key='chooseRoleTableKey' :data="chooseRoleList" v-loading="chooseRoleListLoading" element-loading-text="加载中..." border stripe fit highlight-current-row style="width: 100%">
          <el-table-column width="200px" align="center" label="编号">
            <template slot-scope="scope">
              <span>{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="名称">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.actions')" width="100px" class-name="small-padding fixed-width" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="function_permission('userRoleInsert')" type="success" class="xn-btn-mini" icon="el-icon-plus" @click="handleRoleAdding(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-dialog>

    <el-dialog title="权限" :visible.sync="permissionDialogFormVisible" width="30%">
      <z-tree ref="permissionTree" tree-id="permissionTree" url="/user/permission/list" :params="temp"></z-tree>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import waves from '@/directive/waves' // 水波纹指令
import tableUtil from '@/utils/tableUtil'
import zTree from '@/components/ZTree/index.vue'
import {fetchAllOrganization} from '@/api/organization'
import {fetchRole, fetchChooseRole, insertRole, deleteRole, fetchPermission} from '@/api/user'

export default {
  name: 'user',
  directives: {
    waves
  },
  components: {
    zTree
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'user',
      listQuery: {
        jobNumber: undefined,
        name: undefined
      },
      temp: {
        jobNumber: undefined,
        name: undefined,
        orgId: undefined
      },
      rules: {
        jobNumber: [{ required: true, message: '工号必填，并形如\'xn000000\'', trigger: 'change', pattern: '^xn\\d{6}' }],
        name: [{ required: true, message: '名称必填', trigger: 'blur' }],
        orgId: [{ required: true, message: '组织必选', trigger: 'change' }]
      },
      orgOptions: [],
      dialogRoleVisible: false,
      roleTableKey: '1',
      roleListLoading: false,
      roleList: [],
      dialogChooseRoleVisible: false,
      chooseRoleTableKey: '2',
      chooseRoleListLoading: false,
      chooseRoleList: [],
      permissionDialogFormVisible: false,
      tempRole: {
        id: undefined,
        code: undefined,
        name: undefined
      },
      permissionList: {}
    }
  },
  computed: {
    ...mapGetters([
      'globalUser',
      'orgId'
    ])
  },
  created() {
    fetchAllOrganization().then(response => {
      this.orgOptions = response.data
    })
  },
  methods: {
    resetTemp() {
      this.temp = {
        jobNumber: undefined,
        name: undefined,
        orgId: this.orgId
      }
    },
    handleRole(row) {
      this.temp = Object.assign({}, row)
      this.getRoleList()
    },
    getRoleList() {
      this.dialogRoleVisible = true
      this.roleListLoading = true
      fetchRole(this.temp.jobNumber).then(response => {
        this.roleListLoading = false
        this.roleList = response.data.data
      })
    },
    handleRoleAdd() {
      this.dialogChooseRoleVisible = true
      this.chooseRoleListLoading = true
      fetchChooseRole(this.temp.jobNumber).then(response => {
        this.chooseRoleListLoading = false
        this.chooseRoleList = response.data.data
      })
    },
    handleRoleDelete(row) {
      this.tempRole = Object.assign({}, row)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(this.temp.jobNumber, this.tempRole.id).then(() => {
          this.getRoleList()
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
    handleRoleAdding(row) {
      this.tempRole = Object.assign({}, row)
      insertRole(this.temp.jobNumber, this.tempRole.id).then(() => {
        this.getRoleList()
        this.dialogChooseRoleVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handlePermission(row) {
      this.temp = Object.assign({}, row)
      this.permissionDialogFormVisible = true
    }
  }
}
</script>

<style scoped>
.xn-btn-mini {
  width: 40px;
}
</style>