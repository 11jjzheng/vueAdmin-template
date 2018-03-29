import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    fAutoId: '@increment',
    fAppId: 'credit-ndf',
    fRuleId: 'testRule',
    fDegree: 'A',
    fRemark: '测试',
    fRuleItemId: 1,
    fLeftInterval: 1,
    fRightInterval: 2,
    fPeriod: '',
    fCoefficient: '',
    fCreditLimit: 2000,
    fCreateTime: new Date(),
    fCreateUser: 'xn071829',
    fUpdateTime: new Date(),
    fUpdateUser: 'xn071829'
  }))
}

export default {
  getList: config => {

    const {
        ruleId,
        degree,
        remark, page = 1, limit = 20, sort } = param2Obj(config.url)

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
