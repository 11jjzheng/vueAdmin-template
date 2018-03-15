import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/function/list',
    method: 'get',
    params: query
  })
}
