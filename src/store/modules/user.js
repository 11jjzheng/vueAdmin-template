import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    token: getToken(),
    name: '',
    appList: [],
    globalUser: false,
    orgId: ''
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_APP_LIST: (state, appList) => {
      state.appList = appList
    },
    SET_GLOBAL_USER: (state, globalUser) => {
      state.globalUser = globalUser
    },
    SET_ORG_ID: (state, orgId) => {
      state.orgId = orgId
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          // 登录成功，保存token
          const data = response.data
          console.log(data.token)
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          console.log(response.data)
          if (response.data.name == undefined) {
            reject('error')
          }
          const data = response.data
          commit('SET_USER', data)
          commit('SET_NAME', data.name)
          commit('SET_APP_LIST', data.appList)
          commit('SET_GLOBAL_USER', data.globalUser)
          commit('SET_ORG_ID', data.orgId)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
