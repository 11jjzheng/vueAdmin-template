<template>
  <div class="app-container calendar-list-container">
    <div class="header-container">
      <el-select clearable class="filter-item" v-model="listQuery.appId" placeholder="业务ID">
        <el-option v-for="item in appIdOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" v-model="listQuery.ruleSetId" placeholder="规则集">
        <el-option v-for="item in ruleSetOptions" :key="item" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="姓名" v-model="listQuery.name">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="身份证号" v-model="listQuery.idcard">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="手机号" v-model="listQuery.phone">
      </el-input>
      <el-date-picker v-model="listQuery.startDate" type="date" class="filter-item" placeholder="起始时间">
      </el-date-picker>至<el-date-picker v-model="listQuery.endDate" class="filter-item" type="date" placeholder="结束时间">
      </el-date-picker>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-btn" type="primary" v-waves icon="el-icon-refresh" @click="handleResetFilter">{{$t('table.reset')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中..." border stripe fit highlight-current-row style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="xn-table-expand">
            <el-form-item label="原因">
              <span>{{ scope.row.fReason }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="业务ID">
        <template slot-scope="scope">
          <span>{{scope.row.fAppId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.fName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="身份证号">
        <template slot-scope="scope">
          <span>{{scope.row.fIdNum}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.fMobile}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="请求ID">
        <template slot-scope="scope">
          <span>{{scope.row.fReqId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="规则集">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="规则项ID">
        <template slot-scope="scope">
          <span>{{scope.row.fRuleItemId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="分类">
        <template slot-scope="scope">
          <span>{{scope.row.fType | typeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="子分类">
        <template slot-scope="scope">
          <span>{{scope.row.fSubType | subTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="过期时间">
        <template slot-scope="scope">
          <span>{{scope.row.fExpireDate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.fCreateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.fUpdateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="70px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="delete_permission(entityName)" type="danger" class="xn-btn-mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import tableUtil from '@/utils/tableUtil'
import JsonEditor from '@/components/JsonEditor'

const typeMap = {
  0: '无分类',
  1: '外部机构输入',
  2: '牛贷系严重逾期',
  3: '骗贷中介',
  4: '赌博、吸毒、犯罪黑名单及列入失信人、被执行人名单',
  5: '集团线下黑名单',
  6: '贷后提报欺诈',
  7: '其他类'
}

export default {
  name: 'rejectList',
  directives: {
    waves
  },
  components: {
    JsonEditor
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'rejectList',
      ruleSetOptions: [{id:"testRule",name:"测试规则集"}],
      appIdOptions: ["credit-ndf"],
      listQuery: {
        appId: undefined,
        ruleSetId: undefined,
        name: undefined,
        idcard: undefined,
        phone: undefined,
        startDate: undefined,
        endDate: undefined
      }
    }
  },
  filters: {
    typeFilter(type) {
      return typeMap[type]
    },
    subTypeFilter(type) {
      if (type == 1) {
        return '不受理名单'
      } 
      return '黑名单'
    }
  }
}
</script>

<style scoped>
.xn-btn-mini {
  padding: 5px 5px;
  width: 40px;
}
</style>