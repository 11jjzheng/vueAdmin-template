<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-select clearable class="filter-item" v-model="listQuery.appId" placeholder="业务ID">
        <el-option v-for="item in appList" :key="item.id" :label="item.id" :value="item.id">
        </el-option>
      </el-select>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="名称" v-model="listQuery.cityName">
      </el-input>
      <el-select clearable class="filter-item" v-model="listQuery.classification" placeholder="等级">
        <el-option label="A" value="A"></el-option>
        <el-option label="B" value="B"></el-option>
        <el-option label="C" value="C"></el-option>
      </el-select>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="省份" v-model="listQuery.province">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="行政级别" v-model="listQuery.level">
      </el-input>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-refresh" @click="handleResetFilter">{{$t('table.reset')}}</el-button>
      <el-button v-if="create_permission(entityName)" class="function-btn" @click="handleCreate" type="primary" icon="el-icon-plus">{{$t('table.add')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中..." border stripe fit highlight-current-row style="width: 100%">
      <el-table-column width="150px" label="业务ID">
        <template slot-scope="scope">
          <span>{{scope.row.fAppId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="分类">
        <template slot-scope="scope">
          <span>{{scope.row.fClassification}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.fCityName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="简称">
        <template slot-scope="scope">
          <span>{{scope.row.fCityNameAbbreviate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="所属省份">
        <template slot-scope="scope">
          <span>{{scope.row.fProvinceName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="省份代码">
        <template slot-scope="scope">
          <span>{{scope.row.fProvinceCode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="行政级别">
        <template slot-scope="scope">
          <span>{{scope.row.fAdministrationLevel}}</span>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="130px">
        <el-form-item label="业务ID" prop="fAppId">
          <el-select class="filter-item" v-model="temp.fAppId" placeholder="请选择">
            <el-option v-for="item in appList" :key="item.id" :label="item.id" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代码" prop="fCityCode">
          <el-input v-model="temp.fCityCode" :disabled="dialogStatus === 'update'"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="分类" prop="fClassification">
          <el-select v-model="temp.fClassification" placeholder="分类">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
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

export default {
  name: 'cityClassificationMapping',
  directives: {
    waves
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'cityClassificationMapping',
      listQuery: {
        appId: undefined,
        name: undefined,
        classification: undefined,
        province: undefined,
        level: undefined
      },
      temp: {
        fAutoId: undefined,
        fCode: '',
        fClassification: '',
        fCityCode: ''
      },
      rules: {
        fAppId: [{ required: true, message: '业务ID必选', trigger: 'change' }],
        fCityCode: [{ required: true, message: '代码必填', trigger: 'blur' }],
        fClassification: [{ required: true, message: '分类必选', trigger: 'change' }]
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