<template>
  <el-dialog style="text-align: center" title="搜索" :visible.sync="dialogVisible" :show-close=false width="80%">
    <el-form label-width="80px">
      <el-form-item label="搜索">
        <el-input placeholder="请输入关键词" v-model="keyword" @input="changeKey()">{{ keyword }}</el-input>
      </el-form-item>
          </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('closeSearch',''),dialogVisible=false">取 消</el-button>
        <el-button v-on:click="$emit('searchCalled',{keyword:keyword}),dialogVisible=false" type="primary" enabled>确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
export default {
  name: "Search",
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => true
    },
    keyword: {
      type:String,
      default :()=>""
    }
  },
  data(){
    return {
      Search:{
        dialogVisible:true,
        form:{
          keyword:this.keyword,
        }
      },
    }
  },
  methods: {
    changeKey(e) {
      this.$forceUpdate(e);
    },
  },
}
</script>

<style scoped>

</style>