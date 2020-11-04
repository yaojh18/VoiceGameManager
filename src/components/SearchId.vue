<template>
  <el-dialog style="text-align: center" title="搜索" :visible.sync="dialogVisible" :show-close=false width="80%">
    <el-form label-width="80px">
      <el-form-item label="搜索">
        <el-input placeholder="请输入关卡ID" v-model="level_id" @input="changeKey()">{{ level_id }}</el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('cancelsearch',''),dialogVisible=false">取 消</el-button>
        <el-button v-on:click="$emit('searchIdCalled',{level_id:level_id}),dialogVisible=false" type="primary" enabled>确 定</el-button>
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
    level_id: {
      type:String,
      default :()=>""
    }
  },
  data(){
    return {
      SearchId:{
        dialogVisible:true,
        form:{
          level_id:this.level_id,
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