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


// 保存服务接口：classify/addService
export function addServiceInfo(params) {
    return request({
      url: 'classify/addService',
      method: 'post',
      data: params
    })
}


// 获取服务详情信息
export function getServiceInfo(params){
  return request({
    url:'/classify/serviceDetail',
    method:'post',
    params
  })
}

// 添加服务接入信息接口 /entry/ServiceEntry/add
export function addServiceEntryInfo(params){
  return request({
    url:'/classify/service/serviceEntry/add',
    method:'post',
    params
  })
}




// 保存编辑服务信息接口   (谷跃飞)
export function updataServiceInfo(params){
  return request({
    url:'classify/updateService',
    method:'post',
    data:params
  })
}



// // 删除服务接口 （谷跃飞）
export function delService(params){
  return request({
    url:'/classify/delService',
    method:'post',
    params
  })
}



// 获取服务接入信息接口  serviceId  (谷跃飞)
export function getServiceEntryInfo(params){
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
