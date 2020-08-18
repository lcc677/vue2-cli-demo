import request from './request'

/**
 * 获取用户信息
 * @param {params} params
 */
export function user(params) {
    return request({
        url: '/user',
        method: 'get',
        params
    })
}
/**
 * 删除用户信息
 * @param {datas} datas
 */
export function deleteUser(data) {
    console.log(data)
    return request({
        url: '/user/delete/',
        method: 'post',
    })
}
/**
 * 添加用户信息
 * @param {datas} datas
 */
export function addUser(data) {
    console.log(data)
    return request({
        url: '/user/add/',
        method: 'post',
    })
}
/**
 * 
 * @param {id} id 
 */
export function updateUser(id) {
    console.log(id)
    return request({
        url: '/user/update/',
        method: 'post',

    })
}