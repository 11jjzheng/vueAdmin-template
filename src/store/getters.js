const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
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
