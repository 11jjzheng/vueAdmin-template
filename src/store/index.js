import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import pageData from './modules/pageData'
import getters from './getters'

Vue.use(Vuex)

// 创建vuex实例
const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    pageData
  },
  getters
})

export default store
