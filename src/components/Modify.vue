<template>
    <el-dialog style="text-align: center"
             title="修改"
             :visible.sync="dialogVisible"
             :show-close=false
             v-on:close="$emit('closeEmit','')"
             width="90%">
    <el-form label-width="80px">
        <el-form-item label="类别">
            <el-select v-model="selectOption[type_id]" style="width:80%" placeholder="请选择" @change="setTypeId">
                <el-option label="男性角色关卡" value=1></el-option>
                <el-option label="女性角色关卡" value=2></el-option>
                <el-option label="其他关卡" value=0></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题">
            <el-input placeholder="请输入标题" v-model="title" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="文案">
            <el-input placeholder="请输入文案" v-model="content" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item id="audiobox" label="音频">
            <el-upload action=""
                       accept="audio/wav"
                       limit="1"
                       :on-change="handleAudio"
                       :auto-upload="false">
                <el-button slot="trigger" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">
                    只能上传wav文件
                </div>
            </el-upload>
        </el-form-item>
        <el-form-item id="videoBox" label="视频">
            <el-upload action=""
                       accept="video/*"
                       limit="1"
                       :on-change="handleVideo"
                       :auto-upload="false">
                <el-button slot="trigger" type="primary">选取文件</el-button>
            </el-upload>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button  v-on:click="submittt()" type="primary" enabled>确 定</el-button>
        <el-button  v-on:click="$emit('closeModify');dialogVisible=false">取 消</el-button>
        <el-button v-on:click="retreat()" style="margin-left:40px">撤销更改</el-button>
    </span>
    </el-dialog>
</template>
<script>
import {ModifyBack, searchBackId2} from "@/utils/communication"
import {Loading} from "element-ui";
export default({
  name: "Modify",
  props:{
      dialogVisible: {
          type: Boolean,
          default: () => true
      },
      title:{
          type:String,
          default: ()=>""
      },
      id:{
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
              id:this.id,
              type_id:this.type_id,
              audio_path:this.audio_path,
              video_path:this.video_path,
          },
          formData: new FormData(),
          selectOption: [
              '其他关卡',
              '男性角色关卡',
              '女性角色关卡'
          ]
      }
  },
  methods: {
      retreat(){
          let that = this;
          searchBackId2(Number(this.id)).then((res)=>{
              if(res.status === 200 || res.status === 201){
                  that.$message("回退成功");
              }else{
                  that.$message("回退失败");
              }
              return res.json();
          }).then((r)=> {
              that.type_id = Number(r["type_id"]);
              that.title = r["title"];
              that.content = r["content"];
              that.form.id = Number(r["id"]);
              that.video_path = r['video_path'];
              that.audio_path = r['audio_path'];
          });
      },
      handleAudio(file) {
          this.formData.append('audio_path', file.raw);
      },
      handleVideo(file) {
          this.formData.append('video_path', file.raw);
      },
      setTypeId(val){
          console.log(val)
          this.type_id = val
          console.log(this.type_id)
      },
      submittt() {
          let loading = Loading.service({
              lock: true,
              text: '上传中……',
              background: 'rgba(0, 0, 0, 0.5)'
          });
          console.log(this.type_id)
          let that = this
          this.formData.append("title", this.title);
          this.formData.append("content",this.content);
          this.formData.append("type_id", this.type_id);
          ModifyBack(this.formData, this.id).then((res)=>{
              if(res.status === 200){
                  that.$message('添加成功');
                  that.$emit('modifySucceed')
              }else{
                  that.$message('添加失败，请填写全部信息');
              }
              loading.close()
              that.dialogVisible = false
          });
      }
  },
});
</script>


