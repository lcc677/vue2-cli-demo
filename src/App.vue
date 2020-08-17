<template>
  <div id="app">
    <el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="eMail"
        label="Emali"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                users: []
            }
        }
    }
</script>