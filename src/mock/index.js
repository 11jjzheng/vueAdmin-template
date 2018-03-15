import Mock from 'mockjs'
import loginAPI from './login'
import keyword from './keyword'
import permission from './permission'
import functionf from './functionf'

// Mock.setup({
//   timeout: '350-600'
// })

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

export default Mock
