<template>
  <el-dialog
        style="text-align: center"
        title="发表"
        :visible.sync="dialogVisible"
        :show-close=false
        width="80%">
    <el-form label-width="80px">
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
      <el-form-item label="上传音频文件" label-width="80px">
        <el-upload
            ref="uploadAudio"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit=1
            :auto-upload="false"
            accept=".wav"
            :before-upload="beforeUploadFile"
            :on-change="fileChangeAudio"
            :on-exceed="exceedFile"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileList">
          <el-button size="small" plain>选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传.wav音频文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传视频文件" label-width="80px">
        <el-upload
            ref="uploadVideo"
            action="https://jsonplaceholder.typicode.com/posts"
            :limit=1
            :auto-upload="false"
            accept=".mp4"
            :before-upload="beforeUploadFile"
            :on-change="fileChangeVideo"
            :on-exceed="exceedFile"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileList">
          <el-button size="small" plain>选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传.mp4视频文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
        <el-button size="small">取消</el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
                <!--请修改这两行注释中间的代码来产生相应按钮的点击事件-->
                <el-button  v-on:click="post,$emit('cancel','')">取 消</el-button>
                <el-button  v-on:click="$emit('postmsg',{title:title,content:content,username:state.username,timestamp:new Date().getTime()}),dialogVisible=false" type="primary"
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
    fileaudio: {
      type: File,
      default: () => ""
    },
    filevideo: {
      type: File,
      default: () => ""
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
          username_valid: false
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
          fileaudio: '',
          filevideo: '',
          title: this.title,
          content: this.content,
          username: this.state.username,
          datetime: this.timestamp,
          username_valid: this.state.username_valid
        }
      },
      fileList: []
    }
  },
  methods: {
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: '警告',
        message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
      });
    },
    // 文件状态改变时的钩子
    fileChangeAudio(file, fileList) {
      console.log('change')
      console.log(file)
      this.form.fileaudio = file.raw
      console.log(this.form.file)
      console.log(fileList)
    },
    fileChangeVideo(file, fileList) {
      console.log('change')
      console.log(file)
      this.form.filevideo = file.raw
      console.log(this.form.file)
      console.log(fileList)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log('before upload')
      console.log(file)
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if (extension !== 'mp4' && extension !== 'wav') {
        this.$notify.warning({
          title: '警告',
          message: `只能上传mp4或wav的文件`
        });
      }
      if (size > 10) {
        this.$notify.warning({
          title: '警告',
          message: `文件大小不得超过10M`
        });
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$notify.success({
        title: '成功',
        message: `文件上传成功`
      });
      console.log(res);
      console.log(file);
      console.log(fileList);
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      console.log(err);
      console.log(file);
      console.log(fileList);
      this.$notify.error({
        title: '错误',
        message: `文件上传失败`
      });
    },
    uploadFile() {
      this.$refs.uploadAudio.submit()
      this.$refs.uploadVideo.submit()
      let formData = new FormData()
      formData.append('audio_path', this.form.fileaudio)
      formData.append('video_path',this.form.filevideo)
      formData.append('title',this.title)
      axios.post('https://voicetestgame-dijkstra.app.secoder.net/api/manager/add',
          formData,
          {"Content-Type": "multipart/form-data"}
      )
          .then(res => {
            console.log('res')
            console.log(res)
          })
          .catch(err => {
            console.log("err")
            console.log(err)
          })
    },
  post() {
    var msg = this;
    this.dialogVisible = false;
    //获取密码
    return msg;
  },
  change(e) {
    this.$forceUpdate(e);
    this.state.username_valid=true;
  },
  changename(e) {
    this.$forceUpdate(e);
    this.setState({username_valid: true});
    console.log(this.state.username_valid);
  },
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