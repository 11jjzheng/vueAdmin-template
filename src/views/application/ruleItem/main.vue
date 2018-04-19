<template>
  <div class="app-container calendar-list-container">
    <div style="margin-bottom:10px;">
      <el-button @click="returnRuleSet()">返 回</el-button>
      <el-button type="primary" @click="testRuleItem()">测 试</el-button>
      <el-button type="primary" @click="confirmEditRuleItem()">{{$t('table.confirm')}}</el-button>
      <span style="float:right;">当前在: {{ data_permission_name(this.ruleItemData.fRuleSetId) }}</span>
    </div>
    <el-card>
      <div slot="header">
        <span>规则逻辑</span>
      </div>
      <el-form :rules="rules" ref="expressionForm" :model="ruleItemData" label-position="left" label-width="145px">
        <el-form-item label="表达式" prop="fRuleExpression">
          <el-input type="textarea" v-model="ruleItemData.fRuleExpression"></el-input>
        </el-form-item>
        <el-form-item label="变量列表(';'号分割)" prop="fRuleVariableList">
          <el-input v-model="ruleItemData.fRuleVariableList"></el-input>
        </el-form-item>
        <el-form-item label="黑名单类型">
          <el-select class="filter-item" v-model="ruleItemData.fBlacklistType">
            <el-option :value="0" label="无分类(默认)"></el-option>
            <el-option :value="1" label="外部机构输入"></el-option>
            <el-option :value="2" label="牛贷系严重逾期"></el-option>
            <el-option :value="3" label="骗贷中介"></el-option>
            <el-option :value="4" label="赌博、吸毒、犯罪黑名单"></el-option>
            <el-option :value="5" label="集团线下黑名单"></el-option>
            <el-option :value="6" label="贷后提报欺诈"></el-option>
            <el-option :value="7" label="其他类"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="命中描述">
          <el-input type="textarea" v-model="ruleItemData.fPostHandleReason"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row>
      <el-col :span="12">
        <el-card style="margin-top:10px;margin-right:10px;">
          <div slot="header">
            <span>基础配置</span>
          </div>
          <el-form :rules="rules" ref="basicForm" :model="ruleItemData" label-position="left" label-width="145px">
            <el-form-item label="排序" prop="fOrder">
              <el-input-number v-model="ruleItemData.fOrder" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <el-form-item label="规则说明">
              <el-input type="textarea" v-model="ruleItemData.fRemark"></el-input>
            </el-form-item>
            <el-form-item label="通过条件">
              <el-select class="filter-item" v-model="ruleItemData.fPassCondition">
                <el-option :value="1" label="表达式值为true"></el-option>
                <el-option :value="0" label="表达式值为false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否互斥">
              <el-select class="filter-item" v-model="ruleItemData.fIsExclusive">
                <el-option :value="1" label="是"></el-option>
                <el-option :value="0" label="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否检查变量是否为空">
              <el-select class="filter-item" v-model="ruleItemData.fCheckVariableNull">
                <el-option :value="1" label="是"></el-option>
                <el-option :value="0" label="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="无数据处理方式">
              <el-select class="filter-item" v-model="ruleItemData.fNodataHandle">
                <el-option :value="1" label="通过"></el-option>
                <el-option :value="0" label="拒绝"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="margin-top:10px;">
          <div slot="header">
            <span>高级配置</span>
          </div>
          <el-form :model="ruleItemData" label-position="left" label-width="200px">
            <el-form-item label="通过分数">
              <el-input-number v-model="ruleItemData.fRulePassScore" :min="-9999" :max="9999" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item label="拒绝分数">
              <el-input-number v-model="ruleItemData.fRuleRejectScore" :min="-9999" :max="9999" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item label="无数据分数">
              <el-input-number v-model="ruleItemData.fRuleNodataScore" :min="-9999" :max="9999" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item label="执行频率(天)">
              <el-input-number v-model="ruleItemData.fFrequency" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <el-form-item label="执行频率模式">
              <el-select class="filter-item" v-model="ruleItemData.fFrequencyMode">
                <el-option :value="0" label="频率无效"></el-option>
                <el-option :value="1" label="仅执行一次"></el-option>
                <el-option :value="2" label="循环执行"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="后续处理方式">
              <el-select class="filter-item" v-model="ruleItemData.fPostHandle">
                <el-option :value="0" label="无限制"></el-option>
                <el-option :value="1" label="不受理(拒绝)"></el-option>
                <el-option :value="1" label="黑名单"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="后续处理方式的日期限制(天)">
              <el-input-number v-model="ruleItemData.fPostHandleExpireDay" :min="0" :max="9999"></el-input-number>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:10px;">
      <div slot="header">
        <span>常量参数</span>
        <el-button v-if="update_permission(entityName)" @click="handleCreate()" type="primary" icon="el-icon-plus"></el-button>
        <el-button v-if="update_permission(entityName)" type="danger" icon="el-icon-delete" @click="handleDelete()" :disabled="multipleSelection.length <= 0"></el-button>
        <el-button v-if="multipleSelection.length > 0" class="function-btn" @click="cancelDelete()" icon="el-icon-close" key="btn-cancel-delete"></el-button>
      </div>
      <el-table ref="dataTable" :key='tableKey' :data="ruleItemData.ruleParams" border stripe fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column width="150px" label="名称">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input size="small" v-model="scope.row.fParamName"></el-input>
            </template>
            <span v-else>{{scope.row.fParamName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="150px" label="类型">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select size="small" v-model="scope.row.fParamType">
                <el-option label="Integer" value="Integer"></el-option>
                <el-option label="Long" value="Long"></el-option>
                <el-option label="Double" value="Double"></el-option>
                <el-option label="String" value="String"></el-option>
              </el-select>
            </template>
            <span v-else>{{ scope.row.fParamType }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px" label="值">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input size="small" v-model="scope.row.fParamValue"></el-input>
            </template>
            <span v-else>{{ scope.row.fParamValue }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="300px" label="备注">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input size="small" v-model="scope.row.fRemark"></el-input>
            </template>
            <span v-else>{{ scope.row.fRemark }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.actions')" width="120px" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit && update_permission(entityName)" type="success" class="xn-btn-mini" @click="confirmEditRuleParam(scope.row)" icon="el-icon-check" key="btn-check"></el-button>
            <el-button v-if="scope.row.edit" class="xn-btn-mini" @click="cancleEdit(scope.row)" icon="el-icon-close" key="btn-cancel"></el-button>
            <el-button v-else type="primary" class="xn-btn-mini" @click='scope.row.edit=!scope.row.edit' icon="el-icon-edit"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import tableUtil from '@/utils/tableUtil'
import { createData, updateData } from '@/api/common'
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import store from '@/store'
import { queryData } from '@/api/ruleItem'

function generateRuleItem() {
  return {
    fAutoId: undefined,
    fRuleSetId: undefined,
    fOrder: undefined,
    fRuleItemLogicId: undefined,
    fRulePassScore: 0.0,
    fRuleRejectScore: 0.0,
    fRuleNodataScore: 0.0,
    fState: 2,
    fRemark: "",
    fIsExclusive: 0,
    fPassCondition: 1,
    fPostHandle: 0,
    fPostHandleExpireDay: 0,
    fFrequency: 0,
    fCheckVariableNull: 1,
    fNodataHandle: 0,
    fFrequencyMode: 0,
    fRuleExpression: "",
    fRuleVariableList: "",
    fPostHandleReason: "",
    fBlacklistType: 0,
    ruleParams: []
  }
}

function generateData() {
  return {
    entityName: 'ruleItem',
    ruleItemData: generateRuleItem(),
    rules: {
      fRuleExpression: [{ required: true, message: '表达式必填', trigger: 'blur' }],
      fRuleVariableList: [{ required: true, message: '变量必填', trigger: 'blur' }],
      fOrder: [{ required: true, message: '排序必填', trigger: 'blur' }]
    },
    multipleSelection: [],
    newRuleParamTempId: 0
  }
}

function generatePageId(ruleSetId, ruleItemId) {
  if (ruleItemId === undefined) {
    ruleItemId = ''
  }
  return 'editRuleItem-' + ruleSetId + '-' + ruleItemId
}

function saveData(vm) {
  return store.dispatch('SavePageData', {id: generatePageId(vm.ruleItemData.fRuleSetId, vm.ruleItemData.fAutoId), data: vm.$data}).then(() => {
    vm.$data.ruleItemData = generateRuleItem()
    vm.$data.multipleSelection = []
    vm.$data.newRuleParamTempId = 0
  })
}

function restoreData(vm, route) {
  let ruleSetId = route.params.ruleSetId
  let ruleItemId = route.params.ruleItemId
  let temp = vm.pageData(generatePageId(ruleSetId, ruleItemId))
  if (temp != undefined) {
    for (let key in temp.data) {
      vm.$data[key] = temp.data[key]
    }
  } else {
    vm.$data.ruleItemData.fAutoId = ruleItemId
    vm.$data.ruleItemData.fRuleSetId = ruleSetId
    if (ruleItemId != undefined) {
      queryData(ruleItemId).then((response) => {
        for (let key in response.data) {
          vm.$data.ruleItemData[key] = response.data[key]
        }
      })
    }
  }
  store.dispatch('DeletePageData', generatePageId(ruleSetId, ruleItemId))
}

export default {
  name: 'ruleItemCreate',
  directives: {
    waves
  },
  mixins: [tableUtil],
  computed: {
    ...mapGetters([
      'data_permission_name',
      'pageData'
    ])
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      restoreData(vm, vm.$route)
    })
  },
  beforeRouteUpdate(to, from, next) {
    saveData(this).then(() => {
      restoreData(this, to)
      next()
    })
  },
  beforeRouteLeave(to, from, next) {
    saveData(this)
    next()
  },
  data() {
    return generateData()
  },
  methods: {
    handleCreate() {
      this.ruleItemData.ruleParams.push({
        save: false,
        edit: true,
        id: this.newRuleParamTempId,
        fParamName: "",
        fParamType: "Integer",
        fParamValue: "",
        fRemark: ""
      })
      this.newRuleParamTempId++
    },
    confirmEditRuleParam(row) {
      if (row.fParamName === undefined || row.fParamName === '' ||
        row.fParamValue === undefined || row.fParamValue === '') {
        Message.error('参数名称或值不能为空')
        return
      }
      row.save = true
      row.edit = false
    },
    cancleEdit(row) {
      if (row.save) {
        row.edit = false
        return
      }
      this.ruleItemData.ruleParams.pop()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete() {
      let ruleItemData = this.ruleItemData.ruleParams
      let src = this.multipleSelection
      this.$refs.dataTable.clearSelection();
      for (let i = 0; i < src.length; i++) {
        let j = 0;
        for (j; j < ruleItemData.length; j++) {
          if (ruleItemData[j].id === src[i].id ||
            (ruleItemData[j].fAutoId != undefined && ruleItemData[j].fAutoId === src[i].fAutoId)) {
            break;
          }
        }
        this.ruleItemData.ruleParams.splice(j, 1)
        ruleItemData = this.ruleItemData.ruleParams
      }
    },
    cancelDelete() {
      this.$refs.dataTable.clearSelection();
    },
    returnRuleSet() {
      this.$router.push({ path: '/application/ruleItem/' + this.ruleItemData.fRuleSetId})
    },
    testRuleItem() {

    },
    confirmEditRuleItem() {
      this.ruleItemData.ruleParams = this.ruleItemData.ruleParams.filter((ruleParam) => {
        if (ruleParam.fAutoId === undefined || ruleParam.fAutoId === '') {
          if (ruleParam.save) {
            return true
          }
          return false
        } else {
          return true
        }
      })
      this.ruleItemData.ruleParams.map((ruleParam) => {
        ruleParam.edit = false
        return ruleParam
      })
      this.$refs['expressionForm', 'basicForm'].validate((valid) => {
        if (valid) {
          if (this.ruleItemData.fAutoId === undefined || this.ruleItemData.fAutoId === '') {
            createData(this.entityName, this.ruleItemData).then(() => {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            updateData(this.entityName, this.ruleItemData).then(() => {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        }
      })
    },
  },
}
</script>

<style scoped>
.xn-btn-mini {
  padding: 5px 5px;
  width: 40px;
}
</style>