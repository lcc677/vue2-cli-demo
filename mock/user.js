
export default [
  // get user info
  {
    url: '/user',
    type: 'get',
    response: () => {
      return {
        code: 1,
        data: [
          {
          'id':1,
          'name':'用户A',
          'email':'userA@email.com'
          }, {
            'id': 2,
            'name': '用户B',
            'email': 'userB@email.com'
          }
        ]
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
        data:{
          id:3
        },
        message: '添加用户成功'
      }
    }
  },
]
