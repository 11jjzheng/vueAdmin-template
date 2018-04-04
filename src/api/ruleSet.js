import request from '@/utils/request'

export function fetchAllRuleSet() {
  return request({
  	url: '/ruleSet/options',
  	method: 'get',
  })
}