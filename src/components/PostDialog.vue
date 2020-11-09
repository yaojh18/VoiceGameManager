<template>
  <el-dialog
        style="text-align: center"
        title="发表"
        :visible.sync="dialogVisible"
        :show-close=false
        width="80%">
    <el-form label-width="80px" id="newform" ref="newform">
        <el-form-item label="标题">
            <!--请修改这两行注释中间的代码来输入消息标题-->
            <el-input placeholder="title" v-model="title" @input="change()">{{ title }}</el-input>
            <!--请修改这两行注释中间的代码来输入消息标题-->
        </el-form-item>
        <el-form-item label="内容">
            <!--请修改这两行注释中间的代码来输入消息内容-->
            <el-input  type="textarea" placeholder="message" v-model="content" @input="change()"> {{ content }}</el-input>
            <!--请修改这两行注释中间的代码来输入消息内容-->
        </el-form-item>
      <el-form-item>
          <el-upload class="xj-upload clearfix"
                     ref="upload"
                     :http-request="uploadFile"
                     accept="wav"
                     action="https://voicetestgame-dijkstra.app.secoder.net/api/manager/"
                     :v-model="audio_path"
                     :before-uplaod="beforeuploadAudio"
                     :before-remove="beforeRemove"
                     multiple
                     :limit="1"
                     :on-exceed="handleExceed"
                     name="audio_path"
                     :on-success="fileSuccessUploadAudio"
                     :on-error="fileError"
                     :auto-upload="false">
            <div class="btn">上传音频</div>
          </el-upload>
      </el-form-item>
      <el-form-item>
        <el-upload class="xj-upload clearfix"
                   ref="upload"
                   :http-request="uploadFile"
                   accept="mp4"
                   action="https://voicetestgame-dijkstra.app.secoder.net/api/manager/"
                   :v-model="video_path"
                   :before-uplaod="beforeuploadVideo"
                   :before-remove="beforeRemove"
                   multiple
                   :limit="1"
                   :on-exceed="handleExceed"
                   name="video_path"
                   :on-success="fileSuccessUploadVideo"
                   :on-error="fileError"
                   :auto-upload="false">
          <div class="btn">上传视频</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
                <!--请修改这两行注释中间的代码来产生相应按钮的点击事件-->
                <el-button  v-on:click="$emit('closePostDialog','')">取 消</el-button>
                <el-button  v-on:click="uploadForm();" type="primary"
                            :disabled="state.username_valid===false"
                            :enabled="state.username_valid===true"
                            >确 定</el-button>
                <!--请修改这两行注释中间的代码来产生相应按钮的点击事件-->
    </span>
  </el-dialog>
</template>

<script>
import axios from 'axios';
export default {
  name: "PostDialog",
  props: {
    audio_path: {
      type: File,
    },
    video_path: {
      type: File,
    },
    dialogVisible: {
      type: Boolean,
      default: () => true
    },
    state: {
      type: Object,
      default: () => {
        return {
          username: "",
          username_valid: true
        }
      }
    },
    content: {
      type: String,
      default: () => ""
    },
    title: {
      type: String,
      default: () => ""
    }
  },
  // 请在下方设计自己的数据结构以及事件函数
  data() {
    return {
      postDialog: {
        dialogVisible: true,
        form: {
          audio_path: '',
          video_path: '',
          title: this.title,
          content: this.content,
        },
        newform: new FormData(),
      },
    }
  },
  methods: {
    getFile(event, input_file_name) {
      this.state.username_valid = true;
    },
    change(){
      this.state.username_valie = true;
    },
    uploadAudio(){
      this.newform.append('audio_path', this.audio_path);
    },
    uploadVideo(){
      this.newform.append('video_path', this.video_path);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },

    // 选取文件超过数量提示
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    //监控上传文件列表
    handleChange(file, fileList) {
      let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name);
      if (existFile) {
        this.$message.error('当前文件已经存在!');
        fileList.pop();
      }
      this.fileList = fileList;
    },
    uploadForm(){
      this.$refs.upload.submit();
      const self = this;
      this.$refs['newform'].validate((valid)=>{
        if(valid){
          self.newform['title'] = self.form.title;
          self.newform['content'] = self.form.content;
          self.$axios({
            method:'post',
            url:"https://voicetestgame-dijkstra.app.secoder.net/api/manager/",
            data:self.newform,
            headers:{
              'Content-Type':"multipart/form-data",
              "Authorization":"JWT "+localStorage.getItem('token')
            }
          })
          .then(function(res){
            console.log(res)
            self.loading=false
            self.$message.success('上传成功')
            self.dialogVisible=false
          })
        }
      });
      this.$emit('postmsg',{'title':this.title,'content':this.content,'audio_path':this.audio_path,'video_path':this.video_path});
      this.submitForm();
    },
    submitForm(event) {
      event.preventDefault();
      for (let i in this.form) {
        this.formData.append(i.first, i.second);
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      this.$axios.post('https://voicetestgame-dijkstra.app.secoder.net/api/manager/', this.formData, config).then(function (res) {
        if (res.status === 200) {
          console.log(res);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  watch: { // 用于实时检测username是否合法
    "state.username": {
      handler(newName) {
        this.state.username_valid = /^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(newName)
      }
    }
  }
}
</script>