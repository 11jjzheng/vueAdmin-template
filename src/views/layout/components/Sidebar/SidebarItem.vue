<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.meta.hidden&&item.children">

      <!-- 数据权限特殊处理 -->
      <el-submenu v-if="item.name==='application'" :index="item.name" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title">{{generateTitle(item.meta.title)}}</span>
        </template>
        
        <template v-for="data in data_permission">
          <router-link :to="item.path+'/ruleItem/'+data.id" :key="item.children.path+'/'+data.id">
            <el-menu-item :index="item.path+'/ruleItem/'+data.id" :class="{'submenu-title-noDropdown':!isNest}">
              <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
              <span v-if="item.meta&&item.meta.title">{{data.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

      <!-- 如果子路由仅有一个，则当前路由的路径加上子路由的路径为当前项的跳转路径 -->
      <router-link v-else-if="item.children.filter(c => c.meta.hidden!=undefined&&!c.meta.hidden).length===1&&!item.children[0].children&&!item.alwaysShow" :to="getRootPath(item)+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="getRootPath(item)+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{generateTitle(item.children[0].meta.title)}}</span>
        </el-menu-item>
      </router-link>

      <!-- 如果子路由显示的仅有一个，则当前路由的路径为跳转路径 -->
      <router-link v-else-if="item.children.filter(c => c.meta.hidden===undefined||c.meta.hidden).length<=1&&!item.children[0].children&&!item.alwaysShow" :to="getRootPath(item)" :key="item.name">
        <el-menu-item :index="getRootPath(item)" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title">{{generateTitle(item.meta.title)}}</span>
        </el-menu-item>
      </router-link>

      <!-- 如果子路由不止一个，则循环再构造 -->
      <el-submenu v-else :index="item.name||getRootPath(item)" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title">{{generateTitle(item.meta.title)}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.meta.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path" :rootPath="getRootPath(item)+'/'+child.path"></sidebar-item>

          <router-link v-else :to="getRootPath(item)+'/'+child.path" :key="child.name">
            <el-menu-item :index="getRootPath(item)+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title">{{generateTitle(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    },
    rootPath: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'data_permission'
    ])
  },
  methods: {
    generateTitle,
    getRootPath(item) {
      // 路径需要累加
      if (this.rootPath === '') {
        return item.path;
      }
      return this.rootPath;
    }
  }
}
</script>

