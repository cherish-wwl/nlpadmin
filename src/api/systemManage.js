import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/academy/list',
    method: 'post',
    params
  })
}

export function addAcademy(params) {
  return request({
    url: '/academy/addAcademy',
    method: 'post',
    params
  })
}

export function delAcademy(params) {
  return request({
    url: '/academy/delAcademy',
    method: 'post',
    params
  })
}

export function academyGroupList(params) {
  return request({
    url: '/academy/grouplist',
    method: 'post',
    params
  })
}

export function professorlist(params) {
  return request({
    url: '/academy/professorlist',
    method: 'post',
    params
  })
}

export function updateAcademy(params) {
  return request({
    url: '/academy/updateAcademy',
    method: 'post',
    data:params
  })
}


export function updateProfessor(params) {
  return request({
    url: '/academy/updateProfessor',
    method: 'post',
    params
  })
}

