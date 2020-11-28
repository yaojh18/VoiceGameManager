<template>
<el-dialog style="text-align: center"
        title="添加"
        :visible.sync="dialogVisible"
        :show-close=false
           v-on:close="$emit('closeAdd','')"
        width="80%">
<el-form label-width="80px">
  <el-form-item>
    <label>关卡ID  </label>
    <input type="text" v-model="level"/>
  </el-form-item>
  <el-form-item>
    <label>类别ID  </label>
    <input type="text" v-model="type_id"/>
  </el-form-item>
  <el-form-item>
    <label>题目  </label>
    <input type="text" v-model="title"/>
  </el-form-item>
  <el-form-item>
    <label>文案  </label>
    <input type="text" v-model="content"/>
  </el-form-item>
  <el-form-item id="audiobox">
    <label>上传音频   </label>
    <input type="file" @change="getFile($event,'audio_path')"/>
  </el-form-item>
  <el-form-item id="videoBox">
    <label>上传视频   </label>
    <input type="file" id="filepicker" @change="getFile($event,'video_path')"/>
    <!--<video id="video" :src="video_url" controls="controls" preload="auto"></video>-->
  </el-form-item>
<el-button v-on:click="submitForm($event)">OK</el-button>
</el-form>
<span slot="footer" class="dialog-footer">
  <el-button  v-on:click="$emit('closeAdd',''),dialogVisible=false">关 闭</el-button>
  </span>
</el-dialog>
</template>
<script>
import {AddBack} from "@/utils/communication"
export default({
    name: "Add",
    props:{
      dialogVisible: {
        type: Boolean,
        default: () => true
      },
      level:{
        type:Number,
        default: ()=>0
      },
      type_id:{
        type:Number,
        default: ()=>1
      },
      title:{
         type:String,
         default: ()=>""
      },
      content:{
         type:String,
        default: ()=>""
      },
    },
    data(){
        return {
        form: {
            title: this.title,
            content: this.content,
            level_id:this.level_id,
            type_id:this.type_id,
        },
        formData: new FormData(),
        }
    },
    methods: {
        getFile(e, input_file_name) {
            this.formData.append(input_file_name, e.target.files[0]);
        },
        submitForm(e) {
            e.preventDefault();
            this.formData.append("title",this.title);
            this.formData.append("content",this.content);
            this.formData.append("level_id",this.level);
            this.formData.append("type_id",this.type_id);
            AddBack(this.formData).then((res)=>{
              if(res.status==201){
                this.$message('添加成功');
              }else{
                this.$message('添加失败'+"\n"+"失败原因为"+String(res.body));
              }
            });
        }
    },
});
</script>


