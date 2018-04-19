<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)"
        :to="{ path: tag.path, query: tag.query }" :key="tag.path + tag.name" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{generateTitle(tag.title)}}
        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </scroll-pane>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">关闭当前选项</li>
      <li @click="closeOthersTags">关闭其他选项</li>
      <li @click="closeAllTags">关闭所有选项</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScrollPane from '@/components/ScrollPane'
import { generateTitle } from '@/utils/i18n'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    ...mapGetters([
      'data_permission_name',
      'addRouters'
    ]),
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this.moveToCurrentTag(this.addViewTags())
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    getRouteParent(routes, name, rootPath = '') {
      let temp = rootPath
      for (let route of routes) {
        temp = rootPath + route.path + "/"
        if (route.children) {
          for (let child of route.children) {
            if (!child.children && child.name === name) {
              return {
                path: temp.substring(0, temp.length - 1), 
                name: route.name,
                meta: {
                  title: route.meta.title
                }
              }
            } else {
              let result = this.getRouteParent(route.children, name, temp)
              if (result) {
                return result
              }
            }
          }
        }
      }
      return false
    },
    generateRoute() {
      // 检查route的params是否有tagName, 若有则优先显示
      // 若route定义为数据权限, 则优先采用数据权限的名称
      // 若定义showParent, 则获取parent route
      // 或者显示原始route, 除非tag标志不显示
      let curRoute = this.$route
      let curName = curRoute.name
      let metaData = curRoute.meta
      let tagName = curRoute.query.tagName
      let result = {
        path: curRoute.path,
        meta: {},
        query: curRoute.query
      }
      if (tagName) {
        result.name = tagName
        result.meta.title = tagName
        return result
      }
      if (metaData.useDataPermission) {
        tagName = this.data_permission_name(curRoute.params.ruleSetId)
        result.name = tagName
        result.meta.title = tagName
        return result
      }
      if (metaData.showParent) {
        let route = this.getRouteParent(this.addRouters, curName)
        return route
      }
      if (curName && curName !== 'dashboard') {
        let title = metaData.title
        for (let key in curRoute.params) {
          title = title.replace(new RegExp(key,'g'), curRoute.params[key])
        }
        result.name = title
        result.meta.title = title
        return result
      }
      return false
    },
    isActive(route) {
      const tempRoute = this.generateRoute()
      return (tempRoute.meta.hidden && this.$route.path.indexOf(route.path) > -1) || (route.path === tempRoute.path && route.name === tempRoute.name)
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    moveToCurrentTag(move = true) {
      if (!move) {
        return
      }
      const tags = this.$refs.tag
      if (tags == undefined) {
        return
      }
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path && tag.name === this.$route.name) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push({path: latestView.path, query: latestView.query})
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.path)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag(true)
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu(tag, e) {
      this.visible = true
      this.selectedTag = tag
      this.left = e.clientX
      this.top = e.clientY
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  .tags-view-wrapper {
    background: #fff;
    height: 34px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 2;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
