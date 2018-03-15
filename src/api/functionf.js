import request from '@/utils/request'

export function fetchTree(query) {
  return request({
    url: '/function/tree',
    method: 'get',
    params: query
  })
}
