import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = [
{ id:1, name:"父节点1 - 展开", open:true,
  children: [
    { id:2, name:"父节点11 - 折叠",
      children: [
        { id:3, name:"叶子节点111"},
        { id:4, name:"叶子节点112"},
        { id:5, name:"叶子节点113"},
        { id:6, name:"叶子节点114"}
      ]},
    { id:7, name:"父节点12 - 折叠",
      children: [
        { id:8, name:"叶子节点121"},
        { id:9, name:"叶子节点122"},
        { id:10, name:"叶子节点123"},
        { id:11, name:"叶子节点124"}
      ]},
    { id:12, name:"父节点13 - 没有子节点", isParent:true}
  ]},
{ id:13, name:"父节点2 - 折叠",
  children: [
    { id:14, name:"父节点21 - 展开", open:true,
      children: [
        { id:15, name:"叶子节点211"},
        { id:16, name:"叶子节点212"},
        { id:17, name:"叶子节点213"},
        { id:18, name:"叶子节点214"}
      ]},
    { id:20, name:"父节点22 - 折叠",
      children: [
        { id:21, name:"叶子节点221"},
        { id:22, name:"叶子节点222"},
        { id:23, name:"叶子节点223"},
        { id:24, name:"叶子节点224"}
      ]},
    { id:25, name:"父节点23 - 折叠",
      children: [
        { id:26, name:"叶子节点231"},
        { id:27, name:"叶子节点232"},
        { id:28, name:"叶子节点233"},
        { id:29, name:"叶子节点234"}
      ]}
  ]},
{ id:30, name:"父节点3 - 没有子节点", isParent:true}
]

const childList = []
const count = 100

for (let i = 0; i < count; i++) {
  childList.push(Mock.mock({
    id: '@increment',
    code: 'test-function',
    name: '测试功能',
    url: '/test/test/test',
    type: 1,
    icon: '',
    global: 0,
    createTime: new Date(),
    createUser: 'xn071829',
    updateTime: new Date(),
    updateUser: 'xn071829'
  }))
}

export default {
  getList: config => {

    return List
  },
  getChildList: config => {

   const { code, name, parentId, page = 1, limit = 20, sort } = param2Obj(config.url)

/*     let mockList = List.filter(item => {
      if (appId && item.fAppId !== appId) return false
      if (type && item.fType !== type) return false
      if (list && item.fKeywordList.indexOf(list) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }*/

    const pageList = childList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: childList.length,
      items: pageList
    }
  },
  create: () => ({
    data: 'success'
  }),
  update: () => ({
    data: 'success'
  }),
  delete: () => ({
    data: 'success'
  })
}