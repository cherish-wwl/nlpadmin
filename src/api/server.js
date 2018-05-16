import request from '@/utils/request'

// 获取服务器列表
export function getServerList(params){
    return request({
      url:'/entry/serverport/list',
      method:'post',
      params
    })
}
// 更新服务接入信息
export function updateServerInfo(params){
    return request({
      url:'/entry/serverport/update',
      method:'post',
      params
    })
}
// 保存服务接入信息信息
export function addServerInfo(params){
  return request({
    url:'/classify/service/serviceEntry/add',
    method:'post',
    params
  })
}
// 删除服务接入信息
export function delServerInfo(params){
    return request({
      url:'entry/server/delServer',
      method:'post',
      params
    })
}

// 获取服务接入信息接口  serviceId  (谷跃飞)
export function serviceEntryInfo(params){
  return request({
    url:'/classify/service/serviceEntryInfo',
    method:'post',
    params
  })
}
// 保存编辑服务接入信息接口  serviceId  (谷跃飞)
export function updateServiceEntryInfo(params){
  return request({
    url:'entry/update/serviceEntry',
    method:'post',
    params
  })
}