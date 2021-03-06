const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  isVisitedViews: state => path => {
    return state.tagsView.visitedViews.find(v => v.path === path)
  },
  cachedViews: state => state.tagsView.cachedViews,
  user: state => state.user.user,
  token: state => state.user.token,
  name: state => state.user.name,
  appList: state => state.user.appList,
  globalUser: state => state.user.globalUser,
  orgId: state => state.user.orgId,
  permission_routers: state => state.permission.routers,
  function_permission: state => (name) => {
    return state.permission.functionPermission.find(f => f.code === name) != undefined
  },
  create_permission: state => (name) => {
    return state.permission.functionPermission.find(f => f.code === (name + 'Insert')) != undefined
  },
  update_permission: state => (name) => {
    return state.permission.functionPermission.find(f => f.code === (name + 'Update')) != undefined
  },
  delete_permission: state => (name) => {
    return state.permission.functionPermission.find(f => f.code === (name + 'Delete')) != undefined
  },
  data_permission: state => state.permission.dataPermission,
  data_permission_name: state => (id) => {
    let temp = state.permission.dataPermission.find(d => d.id == id)
    if (temp === undefined) {
      return ''
    }
    return temp.name
  },
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  pageData: state => (id) => {
    let temp = state.pageData.pageDatas.find(p => p.id === id)
    if (temp === undefined) {
      return undefined
    }
    return JSON.parse(JSON.stringify(temp, function(k, v){
      if(v === undefined){
          return "";
      }else{
          return v;
      }
    }))
  }
}
export default getters
