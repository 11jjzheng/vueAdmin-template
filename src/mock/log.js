import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    fLocalAddress: '10.17.2.16',
    fRemoteAddress: '10.14.2.122',
    fUrl: '/ruleengine-web/test',
    fMethod: '测试',
    fModule: '测试模块',
    fSubModule: '测试子模块',
    fOperate: '查询',
    fOperator: 'xn071829',
    fCreateTime: new Date(),
    fData: '{"fromItem":["1"],"ruleItemId":["11664"],"ruleItemLogicId":["555"],"startIndex":["0"],"rows":["10"],"_":["1522044312037"]}'
  }))
}

export default {
  getList: config => {

    const { module, operator, page = 1, limit = 20, sort } = param2Obj(config.url)

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
