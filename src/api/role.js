import request from '@/utils/request'

export function updateFunctionPermission(data) {
  return request({
  	url: '/role/permission/update',
  	method: 'post',
  	data
  })
}

export function updateDataPermission(data) {
  return request({
  	url: '/role/data/permission/update',
  	method: 'post',
  	data
  })
}