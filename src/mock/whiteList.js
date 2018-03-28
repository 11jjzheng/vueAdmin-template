import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    fAppId: 'credit-ndf',
    fidNum: '4420001234567898',
    fName: '测试',
    fMobile: '19912345678',
    fCompany: '大公司',
    fPosition: '老总',
    fType: 1,
    fRemark: '备注'
  }))
}

export default {
  getList: config => {

    const {
        appId,
        name,
        idcard,
        phone, page = 1, limit = 20, sort } = param2Obj(config.url)

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
