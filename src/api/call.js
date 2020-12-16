import request from '@/utils/request'


export function getStatistic(query) {
  return request({
    url: '/api/call/statistic',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return request({
    url: '/api/call/list',
    method: 'get',
    params: query
  })
}

export function fetchAgentList(query) {
  return request({
    url: '/api/agent/list',
    method: 'get',
    params: query
  })
}

export function fetchCall(id) {
  return request({
    url: '/api/call/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/call/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/call/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/call/update',
    method: 'post',
    data
  })
}
