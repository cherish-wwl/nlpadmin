import request from '@/utils/request'
// 查询公司列表
export function academyList(params) {
  return request({
    url: '/academy/list',
    method: 'get',
    params
  })
}

//查询服务提供者所属部门机构列表：/academy/grouplist
export function academyGroupList(params) {
    return request({
      url: '/academy/grouplist',
      method: 'get',
      params
    })
}
// 查询服务提供者(教授)列表：/academy/professorlist
export function academyProfessorList(params) {
    return request({
      url: '/academy/professorlist',
      method: 'get',
      params
    })
}
///查询字典表接口：/dict/list
export function dictList(params) {
    return request({
      url: '/dict/list',
      method: 'get',
      params
    })
}

// 保存服务接口：classify/addService
export function addService(params) {
    return request({
      url: 'classify/addService',
      method: 'post',
      data: params
    })
}

// 获取服务器接入信息
export function getServerList(params){
    return request({
      url:'/classify/serviceDetail',
      method:'post',
      params
    })
}
// 获取服务信息
export function getServiceInfo(params){
  return request({
    url:'/classify/serviceDetail',
    method:'post',
    params
  })
}

// 保存接入信息接口 /entry/ServiceEntry/add

export function addServer(params){
  return request({
    url:'entry/ServiceEntry/add',
    method:'post',
    params
  })
}