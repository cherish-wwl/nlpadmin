import request from '@/utils/request'

// 获取服务技术文档详情
export function getTechDocument(params){
    return request({
      url:'/classify/techDocument/doAdd',
      method:'post',
      params
    })
}
// 添加服务技术文档
export function addTechDocument(params){
  return request({
    url:'/classify/techDocument/doAdd',
    method:'post',
    data:params
  })
}
// 更新服务技术文档
export function updateTechDocument(params){
  return request({
    url:'/classify/techDocument/Update',
    method:'post',
    data:params
  })
}
