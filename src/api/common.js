import request from '@/utils/request'

export function fetchList(entityName, query) {
  return request({
    url: '/' + entityName + '/list',
    method: 'get',
    params: query
  })
}

export function createData(entityName, data) {
  return request({
    url: '/' + entityName + '/create',
    method: 'post',
    data
  })
}

export function updateData(entityName, data) {
  return request({
    url: '/' + entityName + '/update',
    method: 'post',
    data
  })
}

export function deleteData(entityName, data) {
  return request({
    url: '/' + entityName + '/delete',
    method: 'post',
    data
  })
}

export function fetchTree(url, data) {
  if (url.indexOf("/") != 0) {
    url = "/" + url
  }
  return request({
    url: url,
    method: 'get',
    data
  })
}