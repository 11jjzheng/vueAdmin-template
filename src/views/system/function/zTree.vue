<template>
  <div id="xntree">
    <div class="box-title">
      <a>標題</a>
      <a><i class="fa el-icon-refresh" @click="freshTree"></i></a>
    </div>
    <div>
      <ul id="ztree" class="ztree"></ul>
    </div>
  </div>
</template>

<script>
import { fetchTree } from '@/api/common'

export default {
  name: 'zTree',
  props: {
    url: String
  },
  data: function(){
    return{
      setting:{
        callback: {
          onClick: this.onTreeClick
        }
      },
      zNodes:[]
    }
  },
  methods: {
    freshTree:function() {
      fetchTree.then(response => {
        this.zNodes = response.data
        $("#ztree").refresh();
      })
    },
    onTreeClick:function(event, treeId, treeNode) {
      this.$emit("onTreeClick", {'event': event, 'treeId': treeId, 'treeNode': treeNode})
    }
  },
  created() {
    fetchTree.then(response => {
      this.zNodes = response.data
      $.fn.zTree.init($("#ztree"), this.setting, this.zNodes);
    })
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
.box-title .fa{
  float:right;
  padding-right: 5px;
  line-height: 20px;
}
</style>