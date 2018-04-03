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
      <el-table-column width="65" align="center" :label="$t('table.id')">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="编号">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="250px" label="URL">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="50px" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type | typeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" label="图标">
        <template slot-scope="scope">
          <span>{{scope.row.icon}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="50px" align="center" label="仅全局可见">
        <template slot-scope="scope">
          <span>{{scope.row.global | globalFilter}}</span>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="130px">
        <el-form-item label="编号" prop="code">
          <el-input v-model="temp.code"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select class="filter-item" v-model="temp.type">
            <el-option label="一级导航" :value="1"></el-option>
            <el-option label="二级导航" :value="2"></el-option>
            <el-option label="三级导航" :value="3"></el-option>
            <el-option label="页面功能" :value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="temp.icon"></el-input>
        </el-form-item>
        <el-form-item label="仅全局可见" prop="global">
          <el-select class="filter-item" v-model="temp.global">
            <el-option label="否" :value="false"></el-option>
            <el-option label="是" :value="true"></el-option>
          </el-select>
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

const typeMap = {
  '1': '一级导航',
  '2': '二级导航',
  '3': '三级导航',
  '-1': '页面功能'
}

export default {
  name: 'function',
  directives: {
    waves
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'function',
      listQuery: {
        code: undefined,
        name: undefined,
        parentId: this.$route.params.parentId
      },
      temp: {
        id: undefined,
        code: undefined,
        name: undefined,
        url: undefined,
        type: undefined,
        icon: undefined,
        global: false,
        parentId: this.$route.params.parentId
      },
      rules: {
        code: [{ required: true, message: '编码必填', trigger: 'blur' }],
        name: [{ required: true, message: '名称必填', trigger: 'blur' }],
        url: [{ required: true, message: 'URL必填', trigger: 'blur' }],
        type: [{ required: true, message: '类型必选', trigger: 'change' }]
      }
    }
  },
  watch: {
    $route: function(curVal, oldVal) {
      let curParentId = curVal.params.parentId
      let oldParentId = oldVal.params.parentId
      if (curParentId != oldParentId) {
        this.listQuery.parentId = curParentId
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
        code: undefined,
        name: undefined,
        parentId: this.$route.params.parentId
      }
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        code: undefined,
        name: undefined,
        url: undefined,
        type: undefined,
        icon: undefined,
        global: false,
        parentId: this.$route.params.parentId
      }
    }
  },
  filters: {
    typeFilter(type) {
      return typeMap[type]
    },
    globalFilter(global) {
      if (global == 1) {
        return '是'
      }
      return '否'
    }
  }
}
</script>

<style scoped>
.xn-btn-mini {
  width: 40px;
}
</style>