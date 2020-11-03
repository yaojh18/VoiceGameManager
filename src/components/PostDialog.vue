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
      <el-form-item>
        <el-input type="file" v-model="audio_path" @change="getFile($event,'audio_path')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="file" v-model="video_path" @change="getFile($event,'video_path')"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
                <!--请修改这两行注释中间的代码来产生相应按钮的点击事件-->
                <el-button  v-on:click="$emit('cancel','')">取 消</el-button>
                <el-button  v-on:click="$emit('postmsg',{'title':this.title,'content':this.content,'audio_path':this.audio_path,'video_path':this.video_path});submitForm($event);dialogVisible=false;" type="primary"
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
      default: () => ""
    },
    video_path: {
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
        formData: new FormData(),
      },
    }
  },
  methods: {
    getFile(event, input_file_name) {
      this.formData.append(input_file_name, event.target.files[0]);
      this.state.username_valid = true;
    },
    change(){
      this.state.username_valie = true;
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