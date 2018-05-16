import request from '@/utils/request'

///添加解决方案
export function addSolution(params) {
  return request({
    url: '/solution/addSolution',
    method: 'post',
    data:params
  })
}
///删除解决方案
export function delSolution(params) {
  return request({
    url: '/solution/delSolution',
    method: 'post',
    params
  })
}
///获取解决方案列表
export function solutionList(params) {
  return request({
    url: '/solution/list',
    method: 'post',
    params
  })
}
///更新解决方案
export function updateSolution(params) {
  return request({
    url: '/solution/updateSolution',
    method: 'post',
    params
  })
}