import request from '@/utils/request'

// GET /manage/file/list
export function getFileList(){
    return request({
      url: '/manage/file/list',
      method: 'post'
    })
}
// 保存文件
export function addFileInfo(params){
  return request({
    url: '/manage/file/updateImgFile',
    method: 'post',
    params
  })
}