import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    jobNumber: username,
    password
  }
  return request({
    url: '/common/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/common/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/common/user',
    method: 'get'
  })
}

