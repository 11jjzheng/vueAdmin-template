import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    fAppId: 'credit-ndf',
    fName: '测试',
    fIdNum: '441234567891234567',
    fMobile: '12345678912',
    fReqId: '11111111111111111',
    fRuleId: 'testRuleSet',
    fRuleItemId: '1',
    fReason: '拒绝',
    fType: 1,
    fSubType: 5,
    fExpireDate: new Date(),
    fCreateTime: new Date(),
    fUpdateTime: new Date()
  }))
}

export default {
  getList: config => {

    const {
        appId,
        ruleSetId,
        name,
        idcard,
        phone,
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
