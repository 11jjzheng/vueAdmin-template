<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-select clearable class="filter-item" v-model="listQuery.appId" placeholder="业务ID">
        <el-option v-for="item in appIdOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="规则ID" v-model="listQuery.ruleId">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="等级" v-model="listQuery.degree">
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
      <el-table-column width="200px" align="center" label="规则ID">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="等级">
        <template slot-scope="scope">
          <span>{{scope.row.fDegree}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="250px" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.fRemark}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="规则项ID">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleItemId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="左边界">
        <template slot-scope="scope">
          <span>{{scope.row.fLeftInterval}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="右边界">
        <template slot-scope="scope">
          <span>{{scope.row.fRightInterval}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="评分期">
        <template slot-scope="scope">
          <span>{{scope.row.fPeriod}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="系数">
        <template slot-scope="scope">
          <span>{{scope.row.fCoefficient}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="额度">
        <template slot-scope="scope">
          <span>{{scope.row.fCreditLimit}}</span>
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
        <el-form-item label="业务ID" prop="fAppId">
          <el-select class="filter-item" v-model="temp.fAppId" placeholder="请选择">
            <el-option v-for="item in appIdOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则ID" prop="fRuleId">
          <el-select class="filter-item" v-model="temp.fRuleId" placeholder="请选择">
            <el-option v-for="item in ruleIdOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级" prop="fDegree">
          <el-input v-model="temp.fDegree"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="fRemark">
          <el-input v-model="temp.fRemark"></el-input>
        </el-form-item>
        <el-form-item label="规则项ID" prop="fRuleItemId">
          <el-input v-model="temp.fRuleItemId"></el-input>
        </el-form-item>
        <el-form-item label="左边界" prop="fLeftInterval">
          <el-input v-model="temp.fLeftInterval"></el-input>
        </el-form-item>
        <el-form-item label="右边界" prop="fRightInterval">
          <el-input v-model="temp.fRightInterval"></el-input>
        </el-form-item>
        <el-form-item label="评分期" prop="fPeriod">
          <el-input v-model="temp.fPeriod"></el-input>
        </el-form-item>
        <el-form-item label="系数" prop="fCoefficient">
          <el-input v-model="temp.fCoefficient"></el-input>
        </el-form-item>
        <el-form-item label="额度" prop="fCreditLimit">
          <el-input v-model="temp.fCreditLimit"></el-input>
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
  name: 'scoreCardDegree',
  directives: {
    waves
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'scoreCardDegree',
      listQuery: {
        ruleId: undefined,
        degree: undefined,
        remark: undefined
      },
      temp: {
        fAutoId: undefined,
        fAppId: '',
        fRuleId: '',
        fDegree: '',
        fRemark: '',
        fRuleItemId: '',
        fLeftInterval: '',
        fRightInterval: '',
        fPeriod: '',
        fCoefficient: '',
        fCreditLimit: ''
      },
      rules: {
        fAppId: [{ required: true, message: '业务ID必选', trigger: 'change' }],
        fRuleId: [{ required: true, message: '规则ID必选', trigger: 'change' }],
        fDegree: [{ required: true, message: '等级必填', trigger: 'blur' }],
        fRuleItemId: [{ required: true, message: '规则项ID必填', trigger: 'blur' }]
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