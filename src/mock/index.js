import Mock from 'mockjs'
import loginAPI from './login'
import keyword from './keyword'
import permission from './permission'
import functionf from './functionf'
import user from './user'
import role from './role'

Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

Mock.mock(/\/keyword\/list/, 'get', keyword.getList)
Mock.mock(/\/keyword\/create/, 'post', keyword.create)
Mock.mock(/\/keyword\/update/, 'post', keyword.update)
Mock.mock(/\/keyword\/delete/, 'post', keyword.delete)

Mock.mock(/\/permission\/list/, 'get', permission.getList)
Mock.mock(/\/permission\/data/, 'get', permission.getDataPermission)

Mock.mock(/\/function\/tree/, 'get', functionf.getList)
Mock.mock(/\/function\/list/, 'get', functionf.getChildList)
Mock.mock(/\/function\/create/, 'post', functionf.create)
Mock.mock(/\/function\/update/, 'post', functionf.update)
Mock.mock(/\/function\/delete/, 'post', functionf.delete)

Mock.mock(/\/user\/list/, 'get', user.getList)
Mock.mock(/\/user\/create/, 'post', user.create)
Mock.mock(/\/user\/update/, 'post', user.update)
Mock.mock(/\/user\/delete/, 'post', user.delete)

Mock.mock(/\/role\/list/, 'get', role.getList)
Mock.mock(/\/role\/create/, 'post', role.create)
Mock.mock(/\/role\/update/, 'post', role.update)
Mock.mock(/\/role\/delete/, 'post', role.delete)

export default Mock
