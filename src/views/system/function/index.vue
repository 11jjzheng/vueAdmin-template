<template>
  <div>
    <div class="tree-container">
      <z-tree ref="functionTree" treeId="function-tree" url="/function/tree" @onTreeInited="onTreeInited" @onTreeClick="onTreeClick"></z-tree>
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
import zTree from '@/components/ZTree/index.vue'

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
  methods: {
    onTreeInited() {
      if (this.$route.path.indexOf('/system/function/list') < 0) {
        let temp = this.$refs.functionTree.getFirstNode()
        this.$router.push("/system/function/list/" + temp.id)
      }
    },
    onTreeClick(data) {
      this.$router.push("/system/function/list/" + data.treeNode.id)
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