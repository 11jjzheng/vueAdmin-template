import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/keyword/list',
    method: 'get',
    params: query
  })
}

export function createKeyword(data) {
  return request({
    url: '/keyword/create',
    method: 'post',
    data
  })
}

export function updateKeyword(data) {
  return request({
    url: '/keyword/update',
    method: 'post',
    data
  })
}

export function deleteKeyword(data) {
  return request({
    url: '/keyword/delete',
    method: 'post',
    data
  })
}
