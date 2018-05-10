import request from '@/utils/request'

// 教授管理所需接口

// 获取学校列表
export function getSchoolsList(){
  return request({
    url: '/academy/list',
    method: 'post'
  })

}
// 根据学校 获取学院 列表
export function getGrouplist(params){
  return request({
    url: '/academy/grouplist',
    method: 'post',
    params
  })

}
// 获取教授列表
export function getProfessorlist(params){
  return request({
    url: '/academy/professorlist',
    method: 'post',
    params
  })

}