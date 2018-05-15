import request from '@/utils/request'


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

// 添加机构
export function addAcademy(params) {
  return request({
    url: '/academy/addAcademy',
    method: 'post',
    params
  })
}

// 更新机构信息
export function updateAcademy(params) {
  return request({
    url: '/academy/updateAcademy',
    method: 'post',
    data:params
  })
}

// 删除机构
export function delAcademy(params) {
  return request({
    url: '/academy/delAcademy',
    method: 'post',
    params
  })
}

// 添加部门
export function addGroup(params) {
  return request({
    url: '/academy/addGroup',
    method: 'post',
    params
  })
}

// 更新部门信息
export function updateGroup(params) {
  return request({
    url: '/academy/updateGroup',
    method: 'post',
    data:params
  })
}

// 删除部门
export function delGroup(params) {
  return request({
    url: '/academy/delGroup',
    method: 'post',
    params
  })
}


// 添加教授信息
export function addProfessor(params) {
  return request({
    url: '/academy/addProfessor',
    method: 'post',
    params
  })
}
// 更新教授信息
export function updateProfessor(params) {
  return request({
    url: '/academy/updateProfessor',
    method: 'post',
    data:params
  })
}
// 删除教授信息
export function delProfessor(params) {
  return request({
    url: '/academy/delProfessor',
    method: 'post',
    params
  })
}




