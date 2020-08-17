import request from './request'

/**
 * 获取用户信息
 * @param {params} params
 */
export function user(params){
  return request({
    url:'/user',
    method:'get',
    params
  })
}
/**
 * 删除用户信息
 * @param {datas} datas
 */
export function deleteUser(datas) {
  return request({
    url: '/user/delete/',
    method: 'post',
    datas
  })
}
/**
 * 添加用户信息
 * @param {datas} datas
 */
export function addUser(datas) {
  return request({
    url: '/user/add/',
    method: 'post',
    datas
  })
}
