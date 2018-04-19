import request from '@/utils/request'

export function queryData(id) {
  return request({
    url: '/ruleItem/query/' + id,
    method: 'get'
  })
}

export function enableData(src) {
  let data = {"id":src.fAutoId}
  return request({
  	url: '/ruleItem/enable',
  	method: 'post',
  	data
  })
}

export function disableData(src) {
  let data = {"id":src.fAutoId}
  return request({
  	url: '/ruleItem/disable',
  	method: 'post',
  	data
  })
}