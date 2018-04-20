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
        <el-button v-if="update_permission(entityName)" @click="chooseRuleItemLogic()" type="primary">选 择</el-button>
      </div>
      <el-form :rules="rules" ref="expressionForm" :model="ruleItemData" label-position="left" label-width="145px">
        <el-form-item label="表达式" prop="fRuleExpression">
          <el-input type="textarea" v-model="ruleItemData.fRuleExpression" placeholder="表达式编写请查看语法手册"></el-input>
        </el-form-item>
        <el-form-item label="变量列表(';'号分割)" prop="fRuleVariableList">
          <el-input v-model="ruleItemData.fRuleVariableList" placeholder="形如'age;sex', 每个参数名使用';'分割即可"></el-input>
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
        <el-form-item label="命中描述" placeholder="当规则命中时, 此描述存入结果中, 可使用规则参数如 '年龄不大于' + M + '岁' , M为一个规则参数">
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

    <el-dialog title="测试" :visible.sync="testDialogFormVisible" width="80%" :close-on-click-modal="false">
      <el-collapse>
        <el-collapse-item title="测试说明" name="testDescription">
          <ul>
            <li>
              <span>变量来源由变量列表分割而成，若以下无规则项所需变量，请检查变量列表的设置。</span>
            </li>
            <li>
              <span>常量来源由常量参数列表提供，若结果中常量与预期不符，请检查常量列表的设置。</span>
            </li>
            <li>
              <span>请严格选择变量类型，测试程序依靠此类型处理变量。</span>
            </li>
            <li>
              <span>JsonObject、JsonArray的变量类型严格遵守json语法。</span>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="当前测试表达式" name="ruleExpression">
          <ul>
            <li><span>{{ ruleItemData.fRuleExpression }}</span></li>
          </ul>
        </el-collapse-item>
      </el-collapse>
      <el-form ref="testData" :model="testData" label-position="left" label-width="130px" class="test-form">
        <el-form-item label="业务ID" prop="appId">
          <el-select class="filter-item" v-model="testData.appId" placeholder="请选择">
            <el-option v-for="item in appList" :key="item.id" :label="item.id" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-for="variable in testData.variables" :label="variable.name" :key="variable.name">
          <el-select class="filter-item" v-model="variable.type">
            <el-option value="JsonObject" label="JsonObject"></el-option>
            <el-option value="JsonArray" label="JsonArray"></el-option>
            <el-option value="Integer" label="Integer"></el-option>
            <el-option value="Long" label="Long"></el-option>
            <el-option value="String" label="String"></el-option>
            <el-option value="Double" label="Double"></el-option>
            <el-option value="Boolean" label="Boolean"></el-option>
          </el-select>
          <el-input class="filter-item" v-if="variable.type != 'JsonArray' && variable.type != 'JsonObject'" 
            v-model="variable.value" style="margin-top:10px;"></el-input>
          <json-editor v-else v-model="variable.value" style="margin-top:10px;" :id="variable.name" @changed="jsonInput"></json-editor>
        </el-form-item>
        <el-card>
          <div slot="header">
            <span>测试结果</span>
          </div>
          <div>
            <span>{{ testResult.msg }}</span>
          </div>
          <div>
            <span>{{ testResultResult }}</span>
          </div>
          <div>
            <span>{{ testResultDescription }}</span>
          </div>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="testDialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="handleTest">测 试</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择规则逻辑" :visible.sync="logicDialogFormVisible" width="80%">
      <div class="app-container calendar-list-container">
        <div class="header-container">
          <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="表达式" v-model="listQuery.ruleExpression">
          </el-input>
          <el-input clearable @keyup.enter.native="handleFilter" class="filter-item" placeholder="说明" v-model="listQuery.remark">
          </el-input>
          <el-button class="filter-btn" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
          <el-button class="filter-btn" type="primary" v-waves icon="el-icon-refresh" @click="handleResetFilter">{{$t('table.reset')}}</el-button>
        </div>

        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中..." border stripe fit highlight-current-row style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="xn-table-expand">
                <el-form-item label="创建时间">
                  <span>{{ scope.row.fCreateTime | parseTime}}</span>
                </el-form-item>
                <el-form-item label="创建人">
                  <span>{{ scope.row.fCreateUser }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column width="65" align="center" :label="$t('table.id')">
            <template slot-scope="scope">
              <span>{{scope.row.fAutoId}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="450px" label="表达式">
            <template slot-scope="scope">
              <span>{{scope.row.fRuleExpression}}</span>
            </template>
          </el-table-column>
          <el-table-column width="400px" label="说明">
            <template slot-scope="scope">
              <span>{{scope.row.fRemark}}</span>
            </template>
          </el-table-column>
          <el-table-column width="200px" label="常量列表">
            <template slot-scope="scope">
              <span>{{scope.row.fRuleParamList}}</span>
            </template>
          </el-table-column>
          <el-table-column width="200px" label="变量列表">
            <template slot-scope="scope">
              <span>{{scope.row.fRuleVariableList}}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="黑名单类型">
            <template slot-scope="scope">
              <span>{{scope.row.fBlacklistType | blacklistTypeFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column width="180px" label="更新时间">
            <template slot-scope="scope">
              <span>{{ scope.row.fUpdateTime | parseTime}}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" label="更新人">
            <template slot-scope="scope">
              <span>{{ scope.row.fUpdateUser }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.actions')" width="80px" class-name="small-padding fixed-width" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="update_permission(entityName)" type="success" class="xn-btn-mini" icon="el-icon-plus" @click="handleChooseRuleItemLogic(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="logicDialogFormVisible = false">{{$t('table.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import tableUtil from '@/utils/tableUtil'
import { fetchList, createData, updateData, deleteData } from '@/api/common'
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import store from '@/store'
import { queryData, testRuleItem } from '@/api/ruleItem'
import JsonEditor from '@/components/JsonEditor'

const blackListTypeMap = {
  0:'无分类(默认)',
  1:'外部机构输入',
  2:'牛贷系严重逾期',
  3:'骗贷中介',
  4:'赌博、吸毒、犯罪黑名单',
  5:'集团线下黑名单',
  6:'贷后提报欺诈',
  7:'其他类'
}

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
    newRuleParamTempId: 0,
    testData: {
      appId: undefined,
      variables: []
    },
    testResult: {},
    testDialogFormVisible: false,
    logicDialogFormVisible: false,
    listQuery: {
      ruleExpression: undefined,
      remark: undefined
    },
  }
}

function saveData(vm) {
  if (!vm.isVisitedViews(vm.$route.path)) {
    return
  }
  return store.dispatch('savePageData', {id: vm.$route.path, data: vm.$data}).then(() => {
    vm.$data.ruleItemData = generateRuleItem()
    vm.$data.multipleSelection = []
    vm.$data.newRuleParamTempId = 0
  })
}

function resetTestData(vm) {
  vm.$data.testData.variables = []
  let variableList = vm.$data.ruleItemData.fRuleVariableList
  if (variableList === undefined || variableList === '') {
    return
  }
  let temp = variableList.split(';')
  for (let t in temp) {
    vm.$data.testData.variables.push({
      name: temp[t],
      type: '',
      value: ''
    })
  }
}

function restoreData(vm, route) {
  let ruleSetId = route.params.ruleSetId
  let ruleItemId = route.params.ruleItemId
  let temp = vm.pageData(route.path)
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
        resetTestData(vm)
      })
    }
  }
  store.dispatch('deletePageData', route.path)
}

export default {
  name: 'ruleItemCreate',
  directives: {
    waves
  },
  components: {
    JsonEditor
  },
  mixins: [tableUtil],
  computed: {
    ...mapGetters([
      'data_permission_name',
      'pageData',
      'isVisitedViews'
    ]),
    testResultResult() {
      let result = this.testResult.onceResult
      if (result === undefined || result === '') {
        return ''
      }
      return '规则结果：' + (result ? '不命中' : '命中')
    },
    testResultDescription() {
      let description = this.testResult.postHandleReason
      if (description === undefined || description === '') {
        return ''
      }
      return '规则若命中，结果描述：' + description
    }
  },
  watch: {
    'ruleItemData.fRuleVariableList': function() {
      resetTestData(this)
    }
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
      this.testDialogFormVisible = true
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
    jsonInput(payload) {
      if (payload === undefined) {
        return
      }
      for(let temp of this.testData.variables) {
        if (temp.name === payload.id) {
          temp.value = payload.data
          break;
        }
      }
    },
    handleTest() {
      let temp = {}
      temp.variables = this.testData.variables
      temp.expression = this.ruleItemData.fRuleExpression
      temp.ruleParam = this.ruleItemData.ruleParams
      temp.passCondition = this.ruleItemData.fPassCondition
      temp.postHandleReason = this.ruleItemData.fPostHandleReason
      temp.checkVariableNull = this.ruleItemData.fCheckVariableNull
      temp.appId = this.testData.appId
      testRuleItem(temp).then(response => {
        this.testResult = response.data
      })
    },
    chooseRuleItemLogic() {
      this.logicDialogFormVisible = true
      this.getList()
    },
    getList() {
      this.listLoading = true
      fetchList('ruleItemLogic', this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleChooseRuleItemLogic(row) {
      this.logicDialogFormVisible = false
      this.ruleItemData.fRuleExpression = row.fRuleExpression
      this.ruleItemData.fBlacklistType = row.fBlacklistType
      this.ruleItemData.fRuleVariableList = row.fRuleVariableList
      this.ruleItemData.fPostHandleReason = row.fRemark
      let temp = row.fRuleParamList.split(';')
      for (let t of temp) {
        this.ruleItemData.ruleParams.push({
          save: true,
          edit: false,
          id: this.newRuleParamTempId,
          fParamName: t,
          fParamType: "Integer",
          fParamValue: "",
          fRemark: ""
        })
        this.newRuleParamTempId++
      }
    }
  },
  filters: {
    blacklistTypeFilter(blackListType) {
      return blackListTypeMap[blackListType]
    }
  }
}
</script>

<style scoped>
.xn-btn-mini {
  padding: 5px 5px;
  width: 40px;
}
.test-form {
  margin-top: 10px;
}
</style>