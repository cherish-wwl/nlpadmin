import request from '@/utils/request'

///查询字典表接口：/dictTree/getDictTreeList
export function dictList(params) {
  return request({
    url: '/dictTree/getDictListByPage',
    method: 'post',
    params
  })
}

///添加字典表接口：/dict/dictadd
export function addDict(params) {
  return request({
    url: '/dict/dictadd',
    method: 'post',
    data:params
  })
}

///更新字典表接口：/dict/updatedict
export function updateDict(params) {
  return request({
    url: '/dict/updatedict',
    method: 'post',
    data:params
  })
}

// 删除字典表接口：/dict/delDict
export function delDict(params) {
  return request({
    url: '/dict/delDict',
    method: 'post',
    params
  })
}