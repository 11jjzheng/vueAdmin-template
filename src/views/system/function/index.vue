<template>
  <div>
    <div class="tree-container">
      <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" highlight-current default-expand-all :expand-on-click-node="false" class="tree-container"></el-tree> -->
      <zTree></zTree>
    </div>
    <div class="tree-main-container">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import zTree from './zTree.vue'
import { fetchTree } from '@/api/functionf'

export default {
  name: 'functionTree',
  components: {
    zTree
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      fetchTree().then(response => {
        this.data = response.data
        if (this.$route.path.indexOf('/system/function/list') < 0) {
          let temp = this.getFirstLeaf(response.data[0])
          this.$router.push("/system/function/list/" + temp.id)
        }
      })
    },
    handleNodeClick(data) {
      this.$router.push("/system/function/list/" + data.id)
    },
    getFirstLeaf(node) {
      if (!node.children) {
        return node
      }
      return this.getFirstLeaf(node.children[0])
    }
  }
}
</script>

<style scoped>
.tree-main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 240px;
}
.tree-container {
  background-color: white;
  transition: width 0.28s;
  width: 240px;
  height: 100%;
  position: fixed;
  z-index: 1001;
}
</style>