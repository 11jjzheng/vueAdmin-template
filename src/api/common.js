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
    url: '/' + entityName + '/insert',
    method: 'post',
    transformRequest: [function(data) {
      return JSON.stringify(data)
    }],
    data
  })
}

export function updateData(entityName, data) {
  return request({
    url: '/' + entityName + '/update',
    method: 'post',
    transformRequest: [function(data) {
      return JSON.stringify(data)
    }],
    data
  })
}

export function deleteData(entityName, data) {
  return request({
    url: '/' + entityName + '/delete',
    method: 'post',
    transformRequest: [function(data) {
      return JSON.stringify(data)
    }],
    data
  })
}

export function fetchTree(url, params) {
  if (url.indexOf("/") != 0) {
    url = "/" + url
  }
  return request({
    url: url,
    method: 'get',
    params
  })
}