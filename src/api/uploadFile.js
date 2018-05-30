import request from '@/utils/request'

// GET /manage/file/list
export function getFileList(params){
    return request({
      url: '/manage/file/list',
      method: 'post',
      params
    })
}
// 保存文件
export function addFileInfo(params){
  return request({
    url: '/manage/file/addImgFile',
    method: 'post',
    params
  })
}
// 更新文件信息
export function updateImgFile(params){
  return request({
    url: '/manage/file/updateImgFile',
    method: 'post',
    params
  })
}
// 删除文件 POST /manage/file/deleteImg
 export function deleteImg(params){
  return request({
    url: '/manage/file/deleteImg',
    method: 'post',
    params
  })
 }