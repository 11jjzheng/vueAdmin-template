<template>
  <div>
    <div class="tree-container">
      <z-tree @onZTreeClick="onTreeClick"></z-tree>
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
      data: []
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    onTreeClick(treeNode) {
      console.log(this)
      console.log(treeNode)
    },
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
}
</style>