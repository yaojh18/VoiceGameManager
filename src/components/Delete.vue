<template>
  <div>
  <el-dialog style="text-align: center" title="删除" :visible.sync="dialogVisible" :show-close=false width="80%">
    <el-form label-width="80px">
      <el-form-item label="删除">
        <el-input placeholder="请输入数据ID" v-model="data_id" @input="changeKey()">{{ data_id }}</el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('closeDelete',''),dialogVisible=false">取 消</el-button>
        <el-button v-on:click="changeState()" type="primary" enabled>确 定</el-button>
    </span>
  </el-dialog>
    <el-dialog style="text-align: center" :title="alertDialog.text" :visible.sync="alertDialog.dialogVisible" width="40%">
      <el-button v-on:click="$emit('closeDelete');dialogVisible=false">取 消</el-button>
      <el-button v-on:click="changeStateAgain()" type="primary" enabled>确 定</el-button>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "Delete",
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
      alertDialog: {
        "text": "您是否真的要删除该数据?",
        dialogVisible: false
      },
    }
  },
  methods: {
    changeKey(e) {
      this.$forceUpdate(e);
    },
    changeState(){
      this.alertDialog.dialogVisible=true;
      this.SearchId.dialogVisible=false;
    },
    changeStateAgain(){
      this.$emit('DeleteCalledAgain',{data_id:this.data_id});
      this.alertDialog.dialogVisible=false
    }
  },
}
</script>

<style scoped>
</style>