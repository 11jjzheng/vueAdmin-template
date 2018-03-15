import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    fAutoId: '@increment',
    fAppId: 'credit-ndf',
    fType: '@title(5, 10)',
    fKeywordList: '@title(5, 10)',
    fCreateTime: new Date(),
    fCreateUser: 'xn071829',
    fUpdateTime: new Date(),
    fUpdateUser: 'xn071829'
  }))
}

export default {
  getList: config => {

    const { appId, list, type, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (appId && item.fAppId !== appId) return false
      if (type && item.fType !== type) return false
      if (list && item.fKeywordList.indexOf(list) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  createKeyword: () => ({
    data: 'success'
  }),
  updateKeyword: () => ({
    data: 'success'
  }),
  deleteKeyword: () => ({
    data: 'success'
  })
}
