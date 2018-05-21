import request from '@/utils/request'

// 获取服务器列表
export function getServerList(params){
    return request({
      url:'/entry/serverport/list',
      method:'post',
      params
    })
}
// 更新服务器信息
export function updateServerInfo(params){
  return request({
    url:'/entry/serverport/update',
    method:'post',
    params
  })
}
// 保存服务器信息
export function addServerInfo(params){
  return request({
    url:'/classify/service/serviceEntry/add',
    method:'post',
    params
  })
}
// 删除服务器
export function delServerInfo(params){
    return request({
      url:'entry/server/delServer',
      method:'post',
      params
    })
}
