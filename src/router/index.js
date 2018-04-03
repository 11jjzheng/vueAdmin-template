import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), meta: {hidden: true} },
  { path: '/authredirect', component: _import('login/authredirect'), meta: {hidden: true} },  // 登录后重定向，好像没用到？
  { path: '/404', component: _import('errorPage/404'), meta: {hidden: true} },
  { path: '/401', component: _import('errorPage/401'), meta: {hidden: true} },
  {
    // 主页
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: {
      hidden: true,
    },
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),  // 转到一个位置时，定位到最顶端
  routes: constantRouterMap
})

// 动态路由，这里写死？role当path？可能需要改写控件
export const asyncRouterMap = [

  {
    path: '/application',
    component: Layout,
    name: 'application',
    meta: { title: '规则配置', icon: 'chart', name: 'route/ruleengine/ruleItem/list' },
    children: [{
      path: 'ruleItem/:id',
      component: _import('application/ruleItem/index'),
      name: 'ruleItem',
      meta: { title: '规则配置', icon: 'chart', name: 'common/ruleSet' }
    }]
  },

  {
    path: '/param',
    component: Layout,
    redirect: '/param/ruleSetParam',
    name: 'param',
    meta: {
      title: '参数配置',
      icon: 'form'
    },
    children: [
      {
        path: 'ruleSetParam',
        component: _import('param/ruleSetParam/index'),
        name: 'ruleSetParam',
        meta: {
          title: '规则参数',
          icon: 'form',
          name: 'route/ruleengine/ruleParam/list'
        }
      },
      {
        path: 'scoreCardDegree',
        component: _import('param/scoreCardDegree/index'),
        name: 'scoreCardDegree',
        meta: {
          title: '评分卡等级',
          icon: 'form',
          name: 'route/ruleengine/scoreCardDegree/list'
        }
      },
      {
        path: 'keyword',
        component: _import('param/keyword/index'),
        name: 'keyword',
        meta: {
          title: '关键字',
          icon: 'form',
          name: 'route/ruleengine/keyword/list'
        }
      }
    ]
  },

  {
    path: '/configure',
    component: Layout,
    redirect: '/configure/ruleSetConfigure/ruleSet',
    name: 'configure',
    meta: {
      title: '规则管理',
      icon: 'form'
    },
    children: [
      {
        path: 'ruleSetConfigure',
        component: _import('configure/index'),
        name: 'ruleSetConfigure',
        redirect: '/configure/ruleSetConfigure/ruleSet',
        meta: {
          title: '规则集管理',
          icon: 'form'
        },
        children: [
          {
            path: 'ruleSet',
            component: _import('configure/ruleSetConfigure/ruleSet/index'),
            name: 'ruleSet',
            meta: {
              title: '规则集列表',
              icon: 'form',
              name: 'route/ruleengine/ruleSet/list'
            }
          },
          {
            path: 'rulePre',
            component: _import('configure/ruleSetConfigure/rulePre/index'),
            name: 'rulePre',
            meta: {
              title: '预处理列表',
              icon: 'form',
              name: 'route/ruleengine/rulePre/list'
            }
          },
          {
            path: 'ruleItemLogic',
            component: _import('configure/ruleSetConfigure/ruleItemLogic/index'),
            name: 'ruleItemLogic',
            meta: {
              title: '规则逻辑列表',
              icon: 'form',
              name: 'route/ruleengine/ruleItemLogic/list'
            }
          }
        ]
      },
      {
        path: 'dataConfigure',
        component: _import('configure/index'),
        name: 'dataConfigure',
        redirect: '/dataConfigure/channel',
        meta: {
          title: '常用数据管理',
          icon: 'form'
        },
        children: [
          {
            path: 'channel',
            component: _import('configure/dataConfigure/channel/index'),
            name: 'channel',
            meta: {
              title: '渠道列表',
              icon: 'form',
              name: 'route/ruleengine/channel/list'
            }
          },
          {
            path: 'cityInfo',
            component: _import('configure/dataConfigure/cityInfo/index'),
            name: 'cityInfo',
            meta: {
              title: '城市列表',
              icon: 'form',
              name: 'route/ruleengine/cityInfo/list'
            }
          },
          {
            path: 'whiteList',
            component: _import('configure/dataConfigure/whiteList/index'),
            name: 'whiteList',
            meta: {
              title: '白名单列表',
              icon: 'form',
              name: 'route/ruleengine/whiteList/list'
            }
          },
          {
            path: 'cityClassificationMapping',
            component: _import('configure/dataConfigure/cityClassificationMapping/index'),
            name: 'cityClassificationMapping',
            meta: {
              title: '城市等级列表',
              icon: 'form',
              name: 'route/ruleengine/cityClassificationMapping/list'
            }
          }
        ]
      }
    ]
  },

  {
    path: '/result',
    component: Layout,
    redirect: '/result/rawData',
    name: 'result',
    meta: {
      title: '规则结果',
      icon: 'form'
    },
    children: [
      {
        path: 'rawData',
        component: _import('result/rawData/index'),
        name: 'rawData',
        meta: {
          title: '原始数据列表',
          icon: 'form',
          name: 'route/ruleengine/rawData/list'
        }
      },
      {
        path: 'ruleResult',
        component: _import('result/ruleResult/index'),
        name: 'ruleResult',
        meta: {
          title: '规则结果集列表',
          icon: 'form',
          name: 'route/ruleengine/ruleResult/list'
        }
      },
      {
        path: 'rejectList',
        component: _import('result/rejectList/index'),
        name: 'rejectList',
        meta: {
          title: '拒绝名单列表',
          icon: 'form',
          name: 'route/ruleengine/rejectList/list'
        }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'system',
    meta: {
      title: '系统配置',
      icon: 'form'
    },
    children: [
      {
        path: 'user',
        component: _import('system/user/index'),
        name: 'user',
        meta: {
          title: '用户列表',
          icon: 'form',
          name: 'route/ruleengine/user/list'
        }
      },
      {
        path: 'function',
        component: _import('system/function/index'),
        name: 'function',
        meta: {
          title: '功能管理',
          icon: 'form',
          name: 'route/ruleengine/function/list'
        },
        children: [
          {
            path: 'list/:parentId',
            component: _import('system/function/main'),
            name: 'functionList',
            meta: {
              title: '功能列表',
              icon: 'form',
              name: 'route/ruleengine/function/list',
              hidden: true
            }
          }
        ]
      },
      {
        path: 'role',
        component: _import('system/role/index'),
        name: 'role',
        meta: {
          title: '角色管理',
          icon: 'form',
          name: 'route/ruleengine/role/list'
        }
      },
      {
        path: 'log',
        component: _import('system/log/index'),
        name: 'log',
        meta: {
          title: '操作日志',
          icon: 'form',
          name: 'route/ruleengine/operateLog/list'
        }
      },
      {
        path: 'organization',
        component: _import('system/organization/index'),
        name: 'organization',
        meta: {
          title: '组织管理',
          icon: 'form',
          name: 'route/ruleengine/organization/list'
        }
      },
      {
        path: 'application',
        component: _import('system/application/index'),
        name: 'application',
        meta: {
          title: '业务管理',
          icon: 'form',
          name: 'route/ruleengine/application/list'
        }
      }
    ]
  },

  { path: '*', redirect: '/404', meta: {hidden: true} }
]
