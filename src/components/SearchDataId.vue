<template>
  <el-dialog style="text-align: center" title="搜索" :visible.sync="dialogVisible" :show-close=false width="80%">
    <el-form label-width="80px">
      <el-form-item label="搜索">
        <el-input placeholder="请输入数据ID" v-model="data_id" @input="changeKey()">{{ data_id }}</el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button v-on:click="dialogVisible=false">取 消</el-button>
        <el-button v-on:click="$emit('searchDataIdCalled',{data_id:data_id}),dialogVisible=false" type="primary" enabled>确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
export default {
  name: "SearchDataId",
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => true
    },
    data_id: {
      type:Number,
      default :()=> 0
    }
  },
  data(){
    return {
      SearchId:{
        dialogVisible:true,
        form:{
          data_id:this.data_id,
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