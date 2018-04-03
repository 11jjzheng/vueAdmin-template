const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  user: state => state.user.user,
  token: state => state.user.token,
  name: state => state.user.name,
  appList: state => state.user.appList,
  globalUser: state => state.user.globalUser,
  orgId: state => state.user.orgId,
  permission_routers: state => state.permission.routers,
  function_permission: state => (name, func) => {
    return state.permission.functionPermission.find(f => f.name === name).functions.indexOf(func) > -1
  },
  create_permission: state => (name) => {
    return state.permission.functionPermission.find(f => f.name === name).functions.indexOf('create') > -1
  },
  update_permission: state => (name) => {
    return state.permission.functionPermission.find(f => f.name === name).functions.indexOf('update') > -1
  },
  delete_permission: state => (name) => {
    return state.permission.functionPermission.find(f => f.name === name).functions.indexOf('delete') > -1
  },
  data_permission: state => state.permission.dataPermission,
  data_permission_name: state => (id) => {
    return state.permission.dataPermission.find(d => d.id == id).name
  },
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs
}
export default getters
