import request from '@/utils/request'

export function fetchPermission() {
  return request({
    url: '/common/tree',
    method: 'get',
    params: {
      parentId: 0
    }
  })
}

export function fetchDataPermission() {
  return request({
    url: '/common/ruleSet',
    method: 'get'
  })
}