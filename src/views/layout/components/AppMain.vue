<template>
  <section class="app-main" style="min-height: 100%;background-color: rgb(240, 242, 245);">
     <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="!$route.meta.notKeepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="$route.meta.notKeepAlive"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>
