function crateUser() {
    const list = []
    for (let i = 1; i <= 30; i++) {
        list.push({ 'id': i, 'name': `用户${i}`, 'email': `user${i}@email.com` })
    }
    return list
}
const users = crateUser()
export default [
    // get user info
    {
        url: '/user',
        type: 'get',
        response: (config) => {
            const { page = 1, limit = 10 } = config.query
            return {
                code: 1,
                data: { users: users.slice((page - 1) * limit, page * limit), count: users.length }
            }
        }
    },
    {
        url: '/user/delete',
        type: 'post',
        response: () => {
            return {
                code: 1,
                message: '删除用户成功'
            }
        }
    },
    {
        url: '/user/add',
        type: 'post',
        response: () => {
            return {
                code: 1,
                data: { id: users.length },
                message: '添加用户成功'
            }
        }
    },
    {
        url: '/user/update',
        type: 'post',
        response: () => {
            return {
                code: 1,
                message: '用户成功'
            }
        }
    },
]