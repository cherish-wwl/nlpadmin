import request from '@/utils/request'
// 数据集 
// 获取一级目录
export function getlevelOneData() {
  return request({
    url: '/dataset/attrlist',
    method: 'get'
  })
}
//根据一级目录id ，获取二级目录 
export function getlevelTwoData(params) {
  return request({
    url: '/dataset/dataTypelist',
    method: 'get',
    params
  })
}
// 根据二级目录id ，获取子集列表
export function getTableList(params) {
    return request({
      url: '/dataset/datalist',
      method: 'post',
      params
    })
}

// 增加一级目录 id，name
export function addlevelOneData(params) {
    return request({
      url: '/dataset/attr/add',
      method: 'post',
      params
    })
}
// 增加二级目录
export function addlevelTwoData(params) {
  return request({
    url: '/dataset/dataType/add',
    method: 'post',
    params
  })
}
// 增加子集
export function addTableList(params) {
    return request({
      url: '/dataset/data/add',
      method: 'post',
      params
    })
}

// 删除一级目录
export function deletelevelOneData(params) {
    return request({
      url: '/dataset/attr/del',
      method: 'post',
      params
    })
}
// 删除二级目录
export function deletelevelTwoData(params) {
  return request({
    url: '/dataset/dataType/del',
    method: 'post',
    params
  })
}
// 删除子集
export function deleteTableList(params) {
    return request({
      url: '/dataset/data/del',
      method: 'post',
      params
    })
}

// 编辑一级目录
export function editlevelOneData(params) {
    return request({
      url: '/dataset/updateAttr',
      method: 'post',
      params
    })
}
// 编辑二级目录
export function editlevelTwoData(params) {
  return request({
    url: '/dataset/updateType',
    method: 'post',
    params
  })
}
// 编辑子集
export function editTableList(params) {
    return request({
      url: '/dataset/updateData',
      method: 'post',
      params
    })
}