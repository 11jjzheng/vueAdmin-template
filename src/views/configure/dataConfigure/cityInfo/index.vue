<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="代码" v-model="listQuery.cityCode">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="名称" v-model="listQuery.cityName">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="省份" v-model="listQuery.province">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="行政级别" v-model="listQuery.level">
      </el-input>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-refresh" @click="handleResetFilter">{{$t('table.reset')}}</el-button>
      <el-button v-if="create_permission(entityName)" class="function-btn" @click="handleCreate" type="primary" icon="el-icon-plus">{{$t('table.add')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中..." border stripe fit highlight-current-row style="width: 100%">
      <el-table-column width="65" align="center" label="代码">
        <template slot-scope="scope">
          <span>{{scope.row.fCityCode}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.fCityName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="简称">
        <template slot-scope="scope">
          <span>{{scope.row.fCityNameAbbreviate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="所属省份">
        <template slot-scope="scope">
          <span>{{scope.row.fProvinceName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="省份代码">
        <template slot-scope="scope">
          <span>{{scope.row.fProvinceCode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="行政级别">
        <template slot-scope="scope">
          <span>{{scope.row.fAdministrationLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="区号">
        <template slot-scope="scope">
          <span>{{scope.row.fZoneCode}}</span>
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
        <el-form-item label="代码" prop="fCityCode">
          <el-input v-model="temp.fCityCode"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="名称" prop="fCityName">
          <el-input v-model="temp.fCityName"></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="fCityNameAbbreviate">
          <el-input v-model="temp.fCityNameAbbreviate"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属省份" prop="fProvinceName">
          <el-input v-model="temp.fProvinceName"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="省份代码" prop="fProvinceCode">
          <el-input v-model="temp.fProvinceCode"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="行政级别" prop="fAdministrationLevel">
          <el-input v-model="temp.fAdministrationLevel"></el-input>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="区号" prop="fZoneCode">
          <el-input v-model="temp.fZoneCode"></el-input>
          </el-date-picker>
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
  name: 'cityInfo',
  directives: {
    waves
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'cityInfo',
      listQuery: {
        cityCode: undefined,
        cityName: undefined,
        province: undefined,
        level: undefined
      },
      temp: {
        fCityCode: undefined,
        fCityName: '',
        fCityNameAbbreviate: '',
        fProvinceName: '',
        fProvinceCode: '',
        fAdministrationLevel: '',
        fZoneCode: ''
      },
      rules: {
        fCityCode: [{ required: true, message: '代码必填', trigger: 'blur' }],
        fCityName: [{ required: true, message: '名称必填', trigger: 'blur' }],
        fProvinceName: [{ required: true, message: '所属省份必填', trigger: 'blur' }],
        fProvinceCode: [{ required: true, message: '省份代码必填', trigger: 'blur' }],
        fAdministrationLevel: [{ required: true, message: '行政级别必填', trigger: 'blur' }]
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