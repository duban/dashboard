import request from '@/utils/request-api'

export function callingGroup(data) {
  return request({
    url: '/calling/group',
    method: 'post',
    data
  })
}
