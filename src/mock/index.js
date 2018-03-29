import Mock from 'mockjs'
import loginAPI from './login'
import keyword from './keyword'
import permission from './permission'
import functionf from './functionf'
import user from './user'
import role from './role'
import log from './log'
import rawData from './rawData'
import rejectList from './rejectList'
import ruleResult from './ruleResult'
import cityClassificationMapping from './cityClassificationMapping'
import whiteList from './whiteList'
import cityInfo from './cityInfo'
import channel from './channel'
import ruleSet from './ruleSet'
import ruleSetInput from './ruleSetInput'
import rulePre from './rulePre'
import ruleItemLogic from './ruleItemLogic'
import scoreCardDegree from './scoreCardDegree'

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

Mock.mock(/\/log\/list/, 'get', log.getList)
Mock.mock(/\/log\/create/, 'post', log.create)
Mock.mock(/\/log\/update/, 'post', log.update)
Mock.mock(/\/log\/delete/, 'post', log.delete)

Mock.mock(/\/rawData\/list/, 'get', rawData.getList)
Mock.mock(/\/rawData\/create/, 'post', rawData.create)
Mock.mock(/\/rawData\/update/, 'post', rawData.update)
Mock.mock(/\/rawData\/delete/, 'post', rawData.delete)

Mock.mock(/\/rejectList\/list/, 'get', rejectList.getList)
Mock.mock(/\/rejectList\/create/, 'post', rejectList.create)
Mock.mock(/\/rejectList\/update/, 'post', rejectList.update)
Mock.mock(/\/rejectList\/delete/, 'post', rejectList.delete)

Mock.mock(/\/ruleResult\/list/, 'get', ruleResult.getList)
Mock.mock(/\/ruleResult\/create/, 'post', ruleResult.create)
Mock.mock(/\/ruleResult\/update/, 'post', ruleResult.update)
Mock.mock(/\/ruleResult\/delete/, 'post', ruleResult.delete)

Mock.mock(/\/cityClassificationMapping\/list/, 'get', cityClassificationMapping.getList)
Mock.mock(/\/cityClassificationMapping\/create/, 'post', cityClassificationMapping.create)
Mock.mock(/\/cityClassificationMapping\/update/, 'post', cityClassificationMapping.update)
Mock.mock(/\/cityClassificationMapping\/delete/, 'post', cityClassificationMapping.delete)

Mock.mock(/\/whiteList\/list/, 'get', whiteList.getList)
Mock.mock(/\/whiteList\/create/, 'post', whiteList.create)
Mock.mock(/\/whiteList\/update/, 'post', whiteList.update)
Mock.mock(/\/whiteList\/delete/, 'post', whiteList.delete)

Mock.mock(/\/cityInfo\/list/, 'get', cityInfo.getList)
Mock.mock(/\/cityInfo\/create/, 'post', cityInfo.create)
Mock.mock(/\/cityInfo\/update/, 'post', cityInfo.update)
Mock.mock(/\/cityInfo\/delete/, 'post', cityInfo.delete)

Mock.mock(/\/channel\/list/, 'get', channel.getList)
Mock.mock(/\/channel\/create/, 'post', channel.create)
Mock.mock(/\/channel\/update/, 'post', channel.update)
Mock.mock(/\/channel\/delete/, 'post', channel.delete)

Mock.mock(/\/ruleSet\/list/, 'get', ruleSet.getList)
Mock.mock(/\/ruleSet\/create/, 'post', ruleSet.create)
Mock.mock(/\/ruleSet\/update/, 'post', ruleSet.update)
Mock.mock(/\/ruleSet\/delete/, 'post', ruleSet.delete)

Mock.mock(/\/ruleSetInput\/list/, 'get', ruleSetInput.getList)
Mock.mock(/\/ruleSetInput\/create/, 'post', ruleSetInput.create)
Mock.mock(/\/ruleSetInput\/update/, 'post', ruleSetInput.update)
Mock.mock(/\/ruleSetInput\/delete/, 'post', ruleSetInput.delete)

Mock.mock(/\/rulePre\/list/, 'get', rulePre.getList)
Mock.mock(/\/rulePre\/create/, 'post', rulePre.create)
Mock.mock(/\/rulePre\/update/, 'post', rulePre.update)
Mock.mock(/\/rulePre\/delete/, 'post', rulePre.delete)

Mock.mock(/\/ruleItemLogic\/list/, 'get', ruleItemLogic.getList)
Mock.mock(/\/ruleItemLogic\/create/, 'post', ruleItemLogic.create)
Mock.mock(/\/ruleItemLogic\/update/, 'post', ruleItemLogic.update)
Mock.mock(/\/ruleItemLogic\/delete/, 'post', ruleItemLogic.delete)

Mock.mock(/\/scoreCardDegree\/list/, 'get', scoreCardDegree.getList)
Mock.mock(/\/scoreCardDegree\/create/, 'post', scoreCardDegree.create)
Mock.mock(/\/scoreCardDegree\/update/, 'post', scoreCardDegree.update)
Mock.mock(/\/scoreCardDegree\/delete/, 'post', scoreCardDegree.delete)

export default Mock
