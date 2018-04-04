import { mapGetters } from 'vuex'
import { fetchDynamicTableList, createDynamicTableData, updateDynamicTableData, deleteDynamicTableData } from '@/api/common'

function monthNum() {
  let date1 = {}
  let startDate = '2017-8'
  date1 = startDate.split("-")
  let startMonth = parseInt(date1[0])*12 + parseInt(date1[1])
  let d = new Date()
  let nowMonth = parseInt(d.getFullYear())*12 + parseInt(d.getMonth())+1
  let monthNum = Math.abs(nowMonth - startMonth)+1
  return monthNum
}

var optionsFactory = function() {
  let num = monthNum()
  let date = new Date()
  let result = []
  for(let i = 0; i < num; i++) {
    let temp = {}
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let name = year + "年" + month + '月'
    month = month < 10 ? "0" + month : month
    let value =  year+ "_" + month
    temp['value'] = value
    temp['name'] = name
    date.setMonth(date.getMonth() - 1)
    result.push(temp)
  }  
  return result;  
}

const options = optionsFactory()

export default {
  computed: {
    ...mapGetters([
      'function_permission',
      'create_permission',
      'update_permission',
      'delete_permission',
      'appList'
    ])
  },
  data() {
    return {
      tableKey: '0',
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+id'
      },
      appIdOptions: ['credit-ndf'],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      tableName: options[0].value,
      tableNameOptions: options,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchDynamicTableList(this.entityName, this.tableName, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleResetFilter() {
      for (let key in this.listQuery) {
        this.listQuery[key] = undefined
      }
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.sort = '+id'
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    resetTemp() {
      for (let key in this.temp) {
        this.temp[key] = undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createDynamicTableData(this.entityName, this.tableName, this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateDynamicTableData(this.entityName, this.tableName, tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      let temp = Object.assign({}, row)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDynamicTableData(this.entityName, this.tableName, temp).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {

      });
    }
  }
}