<template>
  <div class="app-container calendar-list-container">
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
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import tableUtil from '@/utils/tableUtil'

export default {
  name: 'ruleItemCreate',
  directives: {
    waves
  },
  mixins: [tableUtil],
  data() {
    return {
      entityName: 'ruleItem',
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
  },
  methods: {
  },
}
</script>

<style scoped>
</style>