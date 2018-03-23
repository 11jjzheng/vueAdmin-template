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
              <span>{{ scope.row.createTime }}</span>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ scope.row.createUser }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ scope.row.updateTime }}</span>
            </el-form-item>
            <el-form-item label="更新人">
              <span>{{ scope.row.updateUser }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
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
      <el-table-column align="center" :label="$t('table.actions')" width="300px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="update_permission(entityName)" type="primary" class="xn-btn-mini" icon="el-icon-edit" @click="handleUpdate(scope.row)"></el-button>
          <el-button v-if="delete_permission(entityName)" type="danger" class="xn-btn-mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
          <el-button v-if="function_permission(entityName, 'function-permission')" style="width:90px" type="success" icon="el-icon-setting" @click="handleFunctionPermissionAdd(scope.row)">操作权限</el-button>
          <el-button v-if="function_permission(entityName, 'data-permission')" style="width:90px" type="warning" icon="el-icon-setting" @click="handleDataPermissionAdd(scope.row)">数据权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="130px">
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
      <z-tree ref="function-permission-tree" treeId="function-permission-tree" :data="functionPermissionData"></z-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="functionPermissionDialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="handleFunctionPermissionAdding">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="数据权限" :visible.sync="datapermissionDialogFormVisible" width="30%" :close-on-click-modal="false">
      <z-tree ref="data-permission-tree" treeId="data-permission-tree" :data="dataPermissionData"></z-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="datapermissionDialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="handleDataPermissionAdding">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import tableUtil from '@/utils/tableUtil'
import zTree from '@/components/ZTree/index.vue'

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
        name: undefined
      },
      rules: {
        code: [{ required: true, message: '编号必填', trigger: 'blur' }],
        name: [{ required: true, message: '名称必填', trigger: 'blur' }]
      },
      functionPermissionDialogFormVisible: false,
      functionPermissionData: [
        { id:1, name:"父节点1 - 展开", open:true,
          children: [
          { id:2, name:"父节点11 - 折叠",
            children: [
              { id:3, name:"叶子节点111"},
              { id:4, name:"叶子节点112"},
              { id:5, name:"叶子节点113"},
              { id:6, name:"叶子节点114"}
            ]},
          { id:7, name:"父节点12 - 折叠",
            children: [
              { id:8, name:"叶子节点121"},
              { id:9, name:"叶子节点122"},
              { id:10, name:"叶子节点123"},
              { id:11, name:"叶子节点124"}
            ]},
          { id:12, name:"父节点13 - 没有子节点", isParent:true}
        ]}
      ],
      datapermissionDialogFormVisible: false,
      dataPermissionData: [
        { id:13, name:"父节点2 - 折叠",
          children: [
            { id:14, name:"父节点21 - 展开", open:true,
              children: [
                { id:15, name:"叶子节点211"},
                { id:16, name:"叶子节点212"},
                { id:17, name:"叶子节点213"},
                { id:18, name:"叶子节点214"}
              ]},
            { id:20, name:"父节点22 - 折叠",
              children: [
                { id:21, name:"叶子节点221"},
                { id:22, name:"叶子节点222"},
                { id:23, name:"叶子节点223"},
                { id:24, name:"叶子节点224"}
              ]},
            { id:25, name:"父节点23 - 折叠",
              children: [
                { id:26, name:"叶子节点231"},
                { id:27, name:"叶子节点232"},
                { id:28, name:"叶子节点233"},
                { id:29, name:"叶子节点234"}
              ]}
          ]},
        { id:30, name:"父节点3 - 没有子节点", isParent:true}
        ]
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
        jobNumber: undefined,
        name: undefined,
        orgId: undefined
      }
    },
    handleFunctionPermissionAdd(row) {
      let temp = Object.assign({}, row)
      this.functionPermissionDialogFormVisible = true
    },
    handleFunctionPermissionAdding() {
      this.functionPermissionDialogFormVisible = false
    },
    handleDataPermissionAdd(row) {
      let temp = Object.assign({}, row)
      this.datapermissionDialogFormVisible = true
    },
    handleDataPermissionAdding() {
      this.datapermissionDialogFormVisible = false
    }
  }
}
</script>

<style scoped>
.xn-btn-mini {
  width: 40px;
}
</style>