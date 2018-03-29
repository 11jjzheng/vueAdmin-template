import Mock from 'mockjs'
import { param2Obj } from '@/utils'

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
  name: 'orgnization', 
  functions: ['create', 'update', 'delete']
}, 
]

const dataPermission = [
{
  id:1,
  name:'测试1'
},
{
  id:2,
  name:'测试2'
},
{
  id:3,
  name:'测试3'
},
{
  id:4,
  name:'测试4'
},
{
  id:5,
  name:'测试5'
}
]

export default {
  getList: data => {
    return List
  },
  getDataPermission: data => {
    if (data.url.length < 33) {
      return dataPermission
    }
    dataPermission.push({id:6, name:'测试6'})
    return dataPermission
  }
}
