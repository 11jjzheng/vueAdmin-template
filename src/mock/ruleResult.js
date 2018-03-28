import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    fAppId: 'credit-ndf',
    fReqId: '11111111111111111',
    fRuleSet: 'testRuleSet',
    fOrder: '1',
    fIdNum: '441234567891234567',
    fCostTime: '123',
    fRuleScore: '123',
    fRemark: '测试',
    fRuleResult: 1,
    fVersion: '',
    fCreateTime: new Date()
  }))
}

export default {
  getList: config => {

    const { tableTime,
        appId,
        ruleSetId,
        reqId,
        idcard,
        result,
        startDate,
        endDate, page = 1, limit = 20, sort } = param2Obj(config.url)

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
