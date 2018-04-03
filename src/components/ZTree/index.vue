<template>
  <div id="xntree">
    <div class="box-title">
      <a>{{ title }}</a>
      <el-button @click="refreshTree" type="text" size="mini" class="refresh-btn" icon="el-icon-refresh" :loading="loading"></el-button>
    </div>
    <div id="ztree-div" style="padding-left:10px;padding-top:5px;">
      <ul :id="treeId" class="ztree"></ul>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import { fetchTree } from '@/api/common'

export default {
  name: 'zTree',
  props: {
    title: String,
    treeId: {
      type: String,
      required: true
    },
    checkEnable: {
      type: Boolean,
      default: false
    },
    chkStyle: {
      type: String,
      default: 'checkbox'
    },
    chkboxType: {
      type: Object,
      default: function() {
        return {
          "Y": "ps",
          "N": "ps"
        }
      }
    },
    url: String,
    params: Object
  },
  mounted() {
    this.refreshTree()
  },
  data: function() {
    return {
      ztreeObj: null,
      setting: {
        treeId: this.treeId,
        callback: {
          onClick: this.onTreeClick
        },
        check: {
          enable: this.checkEnable,
          chkboxType: this.chkboxType,
          chkStyle: this.chkStyle
        }
      },
      zNodes: [],
      loading: false
    }
  },
  watch: {
    url() {
      this.refreshTree()
    },
    params() {
      this.refreshTree()
    }
  },
  methods: {
    refreshTree() {
      this.loading = true
      if (this.url !== undefined && this.url !== '') {
        if (this.ztreeObj != null) {
          this.ztreeObj.destroy()
        }
        fetchTree(this.url, this.params).then(response => {
          this.loading = false
          this.zNodes = response.data
          this.ztreeObj = $.fn.zTree.init($("#" + this.treeId), this.setting, this.zNodes)
          this.$emit("onTreeInited")
        })
      } 
    },
    onTreeClick(event, treeId, treeNode) {
      this.$emit("onTreeClick", {'event': event, 'treeId': treeId, 'treeNode': treeNode})
    },
    getFirstNode() {
      return this.ztreeObj.getNodes()[0]
    },
    getNodes() {
      return this.ztreeObj.getNodes()
    },
    getSelectedNodes() {
      return this.ztreeObj.getSelectedNodes()
    },
    transformToArray() {
      return this.ztreeObj.transformToArray(this.ztreeObj.getNodes())
    }
  }
}
</script>

<style>
.box-title{
  background-color: #f5f5f5;
}
.box-title a{   
  cursor: pointer;
  padding-left: 5px;
  font-size: 13px;
  line-height: 20px;
}
.box-title .refresh-btn{
  float:right;    
  padding: 0px;
  padding-top: 3px;
  padding-right: 5px;
}
</style>