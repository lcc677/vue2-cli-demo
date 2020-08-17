<template>
  <div id="app">
    <div style="padding:10px 20px;">
      <h1>用户管理案例分析</h1>
      <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      <el-table
        :data="users"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="Email"
          width="180">
        </el-table-column>
        <el-table-column>
          <template v-slot:default="scope">
            <el-button @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {user,deleteUser,addUser} from './api/user'
export default {
    name: 'App',
    data() {
        return {
          users: [],
          dialogVisible:false,
          form:{
            name:'',
            email:''
          }
        }
    },
    created () {
      this.getUser();
    },
    methods: {
      getUser() {
        user().then(response=>{
          console.log(response)
          this.users = response.data.data
        })
      },
      deleteUser(id){
        console.log(id)
        deleteUser({ id }).then(response =>{
          this.$message({
            message: response.data.message,
            type: 'success'
          });
          this.users = this.users.filter(item =>{
            return item.id !== id
          })
          console.log(this.users)
        })
      },
      addUser(){
        const user = this.form
        console.log(user)
        addUser(user).then(response =>{
          this.$message({
            message: response.data.message,
            type: 'success'
          });
          user.id = response.data.data.id
          this.users.push(user)
        }).finally(()=>{
          this.dialogVisible = false
        })
      }
    },
}
</script>
