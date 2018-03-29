import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    fAutoId: '@increment',
    fRuleExpression: 'string.startsWith(string.substring(linkCell, string.indexOf(linkCell, \';\') +1), string.substring(linkCell, 0, string.indexOf(linkCell, \';\')))',
    fRuleVariableList: 'linkCell',
    fRuleParamList: '',
    fRemark: '\'第一联系人手机同第二联系人手机\'',
    fBlacklistType: '0'
  }))
}

export default {
  getList: config => {

    const {
        ruleExpression,
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
