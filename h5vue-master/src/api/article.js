import request from '@/utils/request'

export function fetchList (query) {
  const { pageSize = 10, pageNum = 1, ...rest } = query || {}
  return request({
    url: '/manage/getArticleList',
    method: 'get',
    params: {
      pageSize,
      pageNum,
      ...rest
    },
    showLoading: false
  })
}

export function getUserList () {
  return request({
    url: '/users/getUserList',
    method: 'get',
    showLoading: false
  })
}

export function getArticleDetail (query) {
  const { _id } = query;
  return request({
    url: '/manage/getArticleDetail',
    method: 'get',
    params: {
      _id,
    }
  })
}
