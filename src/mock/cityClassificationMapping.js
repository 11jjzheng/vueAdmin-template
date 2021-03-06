import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    fAppId: 'credit-ndf',
    fClassification: 'A',
    fCityName: '北京市',
    fCityNameAbbreviate: '北京',
    fProvinceName: '北京市',
    fProvinceCode: '123',
    fAdministrationLevel: '11'
  }))
}

export default {
  getList: config => {

    const { appId,
        name,
        classification,
        province,
        level, page = 1, limit = 20, sort } = param2Obj(config.url)

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
