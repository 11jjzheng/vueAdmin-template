import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    fAppId: 'credit-ndf',
    fReqId: '11111111111111111',
    fRespRetcode: '-1',
    fCostTime: '234',
    fRuleId: 'testRuleSet',
    fDataSource: 'xxxxxx',
    fInterfaceName: 'xxxxxInterfaceName',
    fRemark: '测试接口',
    fCreateTime: new Date(),
    fReqContent: '{"accessToken":"LAUyvwRfR9qZ4sKq3I9TtxL0Mwctugt4ZPEVB+l7WLPVYuxlxjPKRL5XAMKiD2HUR8QIqwitOCECKaVJFg3ieurFPHzCvOQGoZwVXjG9fjk=","appId":"credit-ndf","body":{"afSwiftNumber":"9MYxfpBp0MLcjlequy+0oZLZTJdFTjwjDrTM6BgTIY/fVHmXjO72P2vRde3dHfYxZDP8w/b098FrSMayPUGrCrJwk01JMeXYSaFEimlCRdY=209d360a6e9437cpm7S2"},"reqId":"1111111111111111111111"}',
    fRespContent: '{"tongDunPreLoanData":{"apply_time":1522121986000,"risk_items":[],"final_decision":"Accept","report_time":1522121987000,"report_id":"ER20180327113946DEAAA7AD","final_score":0,"success":true},"internalBlackListData":{},"personalBlackListModelData":[{"status":2,"data":[{"checkCode":"0","userId":"130129198012128735","criminalCount":"0","userName":"许敏"}],"msg":"查询无结果","metaCode":"00009_00002_00001"}],"zxt3DVerifyData":{"id":"79533cbe-2ce2-4432-a2a1-8e16e2466006","status_code":"200","data":{"verify_3d_real_name":"N"},"msg":"查询成功"},"zxtPhoneNetworkPeriodsData":{"status_code":"200","id":"c803e053-c5e5-42e3-a77b-ca447f05fe0c","data":{"phone_network_periods":"E"},"msg":"查询成功"}}'
  }))
}

export default {
  getList: config => {

    const { tableTime,
        appId,
        ruleSetId,
        reqId,
        interfaceName,
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
