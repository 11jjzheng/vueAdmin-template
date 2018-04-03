import request from '@/utils/request'

export function fetchRole(jobNumber) {
  return request({
  	url: '/user/role/list',
  	method: 'get',
  	params: {
  		'jobNumber': jobNumber
  	}
  })
}

export function fetchChooseRole(jobNumber) {
  return request({
  	url: '/user/role/list/choose',
  	method: 'get',
  	params: {
  		'jobNumber': jobNumber
  	}
  })
}

export function insertRole(jobNumber, id) {
  return request({
  	url: '/user/role/insert',
  	method: 'post',
  	data: {
  		'jobNumber': jobNumber,
  		'id': id
  	}
  })
}

export function deleteRole(jobNumber, id) {
  return request({
  	url: '/user/role/delete',
  	method: 'post',
  	data: {
  		'jobNumber': jobNumber,
  		'id': id
  	}
  })
}

export function fetchPermission(jobNumber) {
  return request({
  	url: '/user/permission/list',
  	method: 'get',
  	params: {
  		'jobNumber': jobNumber
  	}
  })
}