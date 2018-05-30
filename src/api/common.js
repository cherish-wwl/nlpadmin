import request from '@/utils/request'

///查询字典表接口：/dict/list
export function dictList(params) {
  return request({
    url: '/dict/list',
    method: 'post',
    params
  })
}