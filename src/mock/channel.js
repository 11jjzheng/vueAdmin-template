import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    fAutoId: '@increment',
    fAppId: 'credit-ndf',
    fChannelName: '测试',
    fChannelId: 'text',
    fCoefficient: '1',
    fCreateTime: new Date(),
    fCreateUser: 'xn071829',
    fUpdateTime: new Date(),
    fUpdateUser: 'xn071829'
  }))
}

export default {
  getList: config => {

    const {
        appId,
        name,
        id,
        coefficient, page = 1, limit = 20, sort } = param2Obj(config.url)

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
