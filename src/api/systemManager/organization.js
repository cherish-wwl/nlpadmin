import request from '@/utils/request'


// 获取学校列表
export function getSchoolsList(params){
  return request({
    url: '/academy/list',
    method: 'post',
    params
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

// 获取教授相关信息 /academy/getProfessorRelateList
export function getProfessorRelateList(params) {
  return request({
    url: '/academy/getProfessorRelateList',
    method: 'post',
    params
  })
}

// 新增教授相关信息/academy/addProfessorRelate
export function addProfessorRelate(params) {
  return request({
    url: '/academy/addProfessorRelate',
    method: 'post',
    data:params
  })
}


// 编辑教授相关信息 /academy/updateProfessorRelate
export function updateProfessorRelate(params) {
  return request({
    url: '/academy/updateProfessorRelate',
    method: 'post',
    data:params
  })
}


// 删除教授相关信息 /academy/delProfessorRelate
export function delProfessorRelate(params) {
  return request({
    url: '/academy/delProfessorRelate',
    method: 'post',
    params
  })
}



