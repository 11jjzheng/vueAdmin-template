import request from '@/utils/request'

export function fetchPermission(data) {
  return request({
    url: '/permission/list',
    method: 'get',
    params: data
  })
}

export function fetchDataPermission(data) {
  return request({
    url: '/permission/data',
    method: 'get',
    params: data
  })
}