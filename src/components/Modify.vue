<template>
  <el-dialog style="text-align: center"
             title="修改"
             :visible.sync="dialogVisible"
             :show-close=false
             v-on:close="$emit('closeEmit','')"
             width="90%">
    <el-button v-on:click="retreat()">
      回退
    </el-button>
    <el-form label-width="80px">
      <el-form-item>
        <label>关卡ID </label>
        <input type="text" v-model="level_id"/>
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
        <audio controls="controls"
               autoplay="autoplay"
               class="audio"
               width="90%"
               loop="loop"
               style="border-radius:10px;margin:3px;">
            <source :src="audio_path"/>
        </audio>
      </el-form-item>
      <el-form-item >
        <label>上传视频   </label>
        <input type="file" @change="getFile($event,'video_path')"/>
        <video controls="controls"
               autoplay="autoplay"
               class="video"
               width="90%"
               loop="loop"
               style="border-radius:10px;margin:3px"
               >
          <source :src="video_path"/>
        </video>
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
import {ModifyBack, searchBackId} from "@/utils/communication"
export default({
  name: "Modify",
  props:{
    dialogVisible: {
      type: Boolean,
      default: () => true
    },
    level_id :{
      type:Number,
      default: ()=>0
    },
    const_level_id:{
      type:Number,
      default: ()=>1,
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
    audio_path:{
      type:String,
    },
    video_path:{
      type:String,
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
        audio_path:this.audio_path,
        video_path:this.video_path,
      },
      formData: new FormData(),
    }
  },
  mounted: function () {
    this.$refs.btn.onclick(function() {
      if (this.$refs.dialogVideo.paused) {
        this.$refs.dialogVideo.play();
      } else {
        this.$refs.dialogVideo.pause();
      }
    });
  },
  methods: {
    getFile(e, input_file_name) {
      console.log(input_file_name);
      this.formData.append(input_file_name, e.target.files[0]);
      console.log(this.formData);
      console.log(e.target.files[0]);
    },
    retreat(){
      console.log(this.const_level_id);
      searchBackId(Number(this.dataId)).then((res)=>{
        if(res.status == 200 || res.status == 201){
          this.$message("回退成功");
        }else{
          this.$message("退失败");
        }
        return res.json();
      }).then((r)=> {
        console.log(r);
        this.level_id =Number(r["level_id"]);
        this.type_id = Number(r["type_id"]);
        this.title = r["title"];
        this.form.content = r["content"];
        this.form.dataId = Number(r["dataId"]);
        this.form.audio_path = r['audio_path'];
        this.form.video_path = r['video_path'];
      });
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


