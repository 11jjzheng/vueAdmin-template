import request from '@/utils/request'

export function fetchAllOrganization() {
  return request({
  	url: '/organization/options',
  	method: 'get',
  })
}