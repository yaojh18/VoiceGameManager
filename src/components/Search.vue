<template>
  <el-dialog style="text-align: center" title="搜索" :visible.sync="dialogVisible" :show-close=false width="80%">
    <el-form label-width="80px">
      <el-form-item label="搜索">
        <el-input placeholder="请输入关键词" v-model="keyword" @input="changeKey()">{{ keyword }}</el-input>
      </el-form-item>
          </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('cancellogin',''),dialogVisible=false">取 消</el-button>
        <el-button v-on:click="$emit('loginfunc',{username:username,password:password}),dialogVisible=false" type="primary" :disabled="state.username_valid===false" :enabled="state.username_valid===true">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
export default {
name: "Search"
}
</script>

<style scoped>

</style>