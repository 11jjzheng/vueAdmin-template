<template>
  <el-container class="tree-table-wrapper">
    <el-aside width="240px">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" highlight-current default-expand-all :expand-on-click-node="false" class="tree-container"></el-tree>
    </el-aside>
    <el-main>
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import { fetchTree } from '@/api/functionf'

export default {
  name: 'functionTree',
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
</style>