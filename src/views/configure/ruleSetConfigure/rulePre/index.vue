<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="参数" v-model="listQuery.variable">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="处理器" v-model="listQuery.preClass">
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
      <el-table-column width="200px" align="center" label="参数">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleVariable}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="处理器">
        <template slot-scope="scope">
          <span>{{scope.row.fPreClass}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="400px" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.fRemark}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="120px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
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
        <el-form-item label="参数" prop="fRuleVariable">
          <el-input v-model="temp.fRuleVariable"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理器" prop="fPreClass">
          <el-input v-model="temp.fPreClass"></el-input>
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
import tableUtil from '@/utils/tableUtil'

export default {
  name: 'rulePre',
  directives: {
    waves
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'rulePre',
      listQuery: {
        variable: undefined,
        preClass: undefined,
        remark: undefined
      },
      temp: {
        fRuleVariable: undefined,
        fPreClass: '',
        fRemark: ''
      },
      rules: {
        fRuleVariable: [{ required: true, message: '参数必填', trigger: 'blur' }],
        fPreClass: [{ required: true, message: '处理器必填', trigger: 'blur' }]
      }
    }
  }
}
</script>

<style scoped>
.xn-btn-mini {
  width: 40px;
}
</style>