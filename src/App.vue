<template>
    <div id="app">
        <div style="padding:10px 20px;">
            <h1>用户管理案例分析</h1>
            <el-button type="primary" @click="dialogVisible = true">新增</el-button>
            <el-table :data="users" border style="width: 100%">
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="email" label="Email" />
                <el-table-column label="操作">
                    <template v-slot:default="scope">
                        <el-button @click="deleteUser(scope.row.id)">删除</el-button>
                        <el-button @click="updateUser(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :current-page.sync="currentPage" :total="count" @current-change="getUser" />
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @closed="closeDialog">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="email" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdateUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { user, deleteUser, addUser, updateUser } from './api/user'
    export default {
        name: 'App',
        data() {
            return {
                users: [],
                count: 0,
                currentPage: 1,
                limit: 10,
                dialogVisible: false,
                form: {
                    id: '',
                    name: '',
                    email: ''
                }
            }
        },
        created() {
            this.getUser();
        },
        methods: {

            getUser() {
                const page = this.currentPage
                const limit = this.limit
                user({ page, limit }).then(response => {
                    console.log(response)
                    const { users, count } = response.data.data
                    this.users = users
                    this.count = count
                })
            },
            deleteUser(id) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser({
                        id
                    }).then(response => {
                        this.$message({
                            message: response.data.message,
                            type: 'success'
                        });
                        this.users = this.users.filter(item => {
                            return item.id !== id
                        })
                        console.log(this.users)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            addOrUpdateUser() {
                if (this.form.id) {
                    updateUser(user.id).then(response => {
                        this.$message({
                            message: response.data.message,
                            type: 'success'
                        });
                        this.users.forEach(item => {
                            if (item.id === this.form.id) {
                                item.name = this.form.name
                                item.email = this.form.email
                            }
                        })
                    }).finally(() => {
                        this.dialogVisible = false
                    })
                } else {
                    const user = {
                        name: this.form.name,
                        email: this.form.email
                    }
                    addUser(user).then(response => {
                        this.$message({
                            message: response.data.message,
                            type: 'success'
                        });
                        user.id = response.data.data.id
                        this.users.push(user)
                    }).finally(() => {
                        this.dialogVisible = false
                    })
                }
            },
            updateUser(user) {
                this.dialogVisible = true
                this.form.name = user.name
                this.form.email = user.email
                this.form.id = user.id
            },
            closeDialog() {
                console.log(this.$refs)
                this.form.id = ''
                this.form.name = ''
                this.form.email = ''
            }
        }
    }
</script>