import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/classify/typeList',
    method: 'get',
    params
  })
}

export function addRowData(params) {
  return request({
    url: '/classify/typeAdd',
    method: 'post',
    params
  })
}

export function editRowData(params) {
  return request({
    url: '/classify/typeUpdate',
    method: 'post',
    data:params
  })
}


export function delRowData(params) {
  return request({
    url: '/classify/typeDel',
    method: 'post',
    params
  })
}

export function getServiceListById(params) {
  return request({
    url: '/classify/serviceList',
    method: 'post',
    params
  })
}

