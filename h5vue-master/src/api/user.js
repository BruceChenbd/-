import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}
export function regist (data) {
  return request({
    url: '/users/regist',
    method: 'post',
    data
  })
}

export function loginOut () {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}
// 关注作者
export function attention (data) {
  return request({
    url: '/userAction/attention',
    method: 'post',
    data
  })
}
// 评论
export function comment (data) {
  return request({
    url: '/userAction/comment',
    method: 'post',
    data
  })
}

// 获取关注信息
export function getAttention (data) {
  return request({
    url: '/userAction/getAttention',
    method: 'post',
    data
  })
}

// 取消关注

export function delAttention (data) {
  return request({
    url: '/userAction/delAttention',
    method: 'post',
    data
  })
}

export function getComment (data) {
  return request({
    url: '/userAction/getComment',
    method: 'post',
    data
  })
}

export function reply (data) {
  return request({
    url: '/userAction/reply',
    method: 'post',
    data
  })
}

export function getReply (data) {
  return request({
    url: '/userAction/getReply',
    method: 'post',
    data
  })
}
