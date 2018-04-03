import { asyncRouterMap, constantRouterMap } from '@/router'
import { fetchPermission, fetchDataPermission } from '@/api/permission'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(functions, route) {
  if (route.meta && route.meta.name) {
    return functions.some(f => route.meta.name.indexOf(f.url) >= 0)
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param functions
 */
function filterAsyncRouter(asyncRouterMap, functions) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.children && route.children.length) {
      // 如果有子路由，利用子路由确定父路由权限
      route.children = filterAsyncRouter(route.children, functions)
      if (route.children && route.children.length) {
        // 过滤后仍有子路由，说明父路由有权限
        return true
      }
      // 否则父路由无权限
      return false
    } else {
      // 无子路由，直接判断本路由是否有权限
      if (hasPermission(functions, route)) {
        return true
      }
      return false
    }
  })
  return accessedRouters
}

const List = [
{
  name: 'ruleItem', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'ruleSetParam', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'scoreCardDegree', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'keyword', 
  functions: ['create', 'update', 'delete', 'import']
},
{
  name: 'ruleSet', 
  functions: ['create', 'update', 'delete', 'import', 'export', 'check']
}, 
{
  name: 'rulePre', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'ruleItemLogic', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'channel', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'cityInfo', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'whiteList', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'cityClassificationMapping', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'rawData', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'ruleResult', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'rejectList', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'user', 
  functions: ['create', 'update', 'delete', 'role', 'permission']
}, 
{
  name: 'function', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'role', 
  functions: ['create', 'update', 'delete', 'function-permission', 'data-permission']
}, 
{
  name: 'log', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'organization', 
  functions: ['create', 'update', 'delete']
}, 
{
  name: 'application', 
  functions: ['create', 'update', 'delete']
},
]

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    functionPermission: [],
    dataPermission: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_FUNCTION_PERMISSION: (state, functionPermission) => {
      state.functionPermission = functionPermission
    },
    SET_DATA_PERMISSION: (state, dataPermission) => {
      state.dataPermission = dataPermission
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        fetchPermission().then(response => {
          let accessedRouters = filterAsyncRouter(asyncRouterMap, response.data)
          commit('SET_ROUTERS', accessedRouters)
          commit('SET_FUNCTION_PERMISSION', List)
          resolve()
        })
      })
    },
    GetPermissionDatas({ commit }) {
      return new Promise(resolve => {
        fetchDataPermission().then(response => {
          commit('SET_DATA_PERMISSION', response.data)
          resolve()
        })
      })
    }
  }
}

export default permission
