<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-select class="filter-item" v-model="listQuery.orgIdSearch" placeholder="所属组织">
        <el-option v-for="item in orgOptions" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="业务ID" v-model="listQuery.appId">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="名称" v-model="listQuery.name">
      </el-input>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-refresh" @click="handleResetFilter">{{$t('table.reset')}}</el-button>
      <el-button v-if="create_permission(entityName)" class="function-btn" @click="handleCreate" type="primary" icon="el-icon-plus">{{$t('table.add')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中..." border stripe fit highlight-current-row style="width: 100%">
      <el-table-column width="200px" align="center" label="业务ID">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.createUser }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="更新时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime | parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="更新人">
        <template slot-scope="scope">
          <span>{{ scope.row.updateUser }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="120px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="delete_permission(entityName)" type="danger" size="mini" class="xn-btn-mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="25%" :close-on-click-modal="false">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="130px">
      <el-form-item label="组织" prop="orgId">
          <el-select class="filter-item" v-model="temp.orgId" placeholder="请选择">
            <el-option v-for="item in orgOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务ID" prop="id" :disabled="dialogStatus === 'update'">
          <el-input v-model="temp.id"></el-input>
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
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import tableUtil from '@/utils/tableUtil'
import {fetchAllOrganization} from '@/api/organization'

export default {
  name: 'application',
  directives: {
    waves
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'application',
      listQuery: {
        appId: undefined,
        orgIdSearch: undefined,
        name: undefined
      },
      temp: {
        id: undefined,
        orgId: '',
        name: ''
      },
      rules: {
        id: [{ required: true, message: '业务ID必填', trigger: 'blur' }],
        name: [{ required: true, message: '名称必填', trigger: 'blur' }]
      },
      orgOptions: {}
    }
  },
  created() {
    fetchAllOrganization().then(response => {
      this.orgOptions = response.data
    })
  },
}
</script>

<style scoped>
.xn-btn-mini {
  width: 40px;
}
</style>