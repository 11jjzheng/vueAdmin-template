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

export function fetchDynamicTableList(entityName, tableName, query) {
  let url = '/' + entityName + '/list' + ((tableName !== undefined && tableName !== '') ? '/' + tableName : '') 
  return request({
    url: url,
    method: 'get',
    params: query
  })
}

export function createDynamicTableData(entityName, tableName, data) {
  let url = '/' + entityName + '/insert' + ((tableName !== undefined && tableName !== '') ? '/' + tableName : '') 
  return request({
    url: url,
    method: 'post',
    transformRequest: [function(data) {
      return JSON.stringify(data)
    }],
    data
  })
}

export function updateDynamicTableData(entityName, tableName, data) {
  let url = '/' + entityName + '/update' + ((tableName !== undefined && tableName !== '') ? '/' + tableName : '') 
  return request({
    url: url,
    method: 'post',
    transformRequest: [function(data) {
      return JSON.stringify(data)
    }],
    data
  })
}

export function deleteDynamicTableData(entityName, tableName, data) {
  let url = '/' + entityName + '/delete' + ((tableName !== undefined && tableName !== '') ? '/' + tableName : '') 
  return request({
    url: url,
    method: 'post',
    transformRequest: [function(data) {
      return JSON.stringify(data)
    }],
    data
  })
}