import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    code: 'admin',
    name: '管理员',
    createTime: new Date(),
    createUser: 'xn071829',
    updateTime: new Date(),
    updateUser: 'xn071829'
  }))
}

export default {
  getList: config => {

   const { code, name, page = 1, limit = 20, sort } = param2Obj(config.url)

/*     let mockList = List.filter(item => {
      if (appId && item.fAppId !== appId) return false
      if (type && item.fType !== type) return false
      if (list && item.fKeywordList.indexOf(list) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }*/

    const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: List.length,
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