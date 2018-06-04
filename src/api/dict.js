import request from '@/utils/request'

///查询字典表接口：/dictTree/getDictTreeList
export function dictList(params) {
  return request({
    url: '/dictTree/getDictListByPage',
    method: 'post',
    params
  })
}