import request from '@/utils/request'

export function deleteBatch(data) {
  return request({
  	url: '/ruleParam/deleteBatch',
  	method: 'post',
    transformRequest: [function(data) {
      return JSON.stringify(data)
    }],
  	data
  })
}