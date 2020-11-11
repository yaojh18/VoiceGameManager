<template>
  <el-dialog style="text-align: center"
             title="修改"
             :visible.sync="dialogVisible"
             :show-close=false
             width="90%">
    <el-form label-width="80px">
      <el-form-item>
        <label>关卡ID </label>
        <input type="text" v-model="level"/>
      </el-form-item>
      <el-form-item >
        <label>修改数据ID </label>
        <input type='text' v-model="dataId"/>
      </el-form-item>
      <el-form-item >
        <label>修改数据类型ID </label>
        <input type='text' v-model="type_id"/>
      </el-form-item>
      <el-form-item>
        <label>题目  </label>
        <input type="text" v-model="title"/>
      </el-form-item>
      <el-form-item>
        <label>文案  </label>
        <input type="text" v-model="content"/>
      </el-form-item>
      <el-form-item>
        <label>上传音频   </label>
        <input type="file" @change="getFile($event,'audio_path')"/>
      </el-form-item>
      <el-form-item>
        <label>上传视频   </label>
        <input type="file" @change="getFile($event,'video_path')"/>
      </el-form-item>
      <button @click=submittt($event)>OK</button>
    </el-form>
    <span slot="footer" class="dialog-footer">
  <el-button  v-on:click="$emit('closeModify');dialogVisible=false">取 消</el-button>
  <el-button  v-on:click="$emit('addCalled',''),dialogVisible=false" type="primary" enabled>确 定</el-button>
</span>
  </el-dialog>
</template>
<script>
import {ModifyBack} from "@/utils/communication"
export default({
  name: "Modify",
  props:{
    dialogVisible: {
      type: Boolean,
      default: () => true
    },
    level:{
      type:Number,
      default: ()=>0
    },
    title:{
      type:String,
      default: ()=>""
    },
    dataId:{
      type:Number,
      default:()=>0
    },
    content:{
      type:String,
      default: ()=>""
    },
    type_id:{
      type:Number,
      default: ()=> 1
    },
  },
  data(){
    return {
      form: {
        title: this.title,
        content: this.content,
        level_id:this.level_id,
        dataId:this.dataId,
        type_id:this.type_id,
      },
      formData: new FormData(),
    }
  },
  mounted: function () {

  },
  methods: {
    getFile(e, input_file_name) {
      console.log(input_file_name);
      this.formData.append(input_file_name, e.target.files[0]);
      console.log(this.formData);
      console.log(e.target.files[0]);
    },
    submittt(e) {
      console.log("helloworld");
      e.preventDefault();
      this.formData.append("title",this.title);
      this.formData.append("content",this.content);
      this.formData.append("level_id",this.level);
      ModifyBack(this.formData,this.dataId).then((res)=>{
        if(res.status == 200){
          this.$message('修改成功');
        }else{
          this.$message('修改失败'+"\n"+"失败原因为"+String(res.body));
        }
      });
    }
  },

});
</script>


