<template>
<el-dialog style="text-align: center" title="修改" :visible.sync="dialogVisible" :show-close=false width="80%">
    <el-form label-width="80px">
        <el-form-item label="标题">
            <el-input placeholder="请输入修改标题" v-model="title" @input="changeTitle()">{{ title }}</el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input placeholder="请输入内容" v-model="content" @input="changeContent()">{{ content }}</el-input>
        </el-form-item>
        <el-form-item label="音频">
            <el-input placeholder="请输入音频" v-model="audio_path" @input="changeAudio()">{{ audio_path }}</el-input>
        </el-form-item>
        <el-form-item label="视频">
            <el-input placeholder="请输入视频" v-model="video_path" @input="changeVideo()">{{ video_path }}</el-input>
        </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('cancelmodify',''),dialogVisible=false">取 消</el-button>
        <el-button v-on:click="dialogVisible=false" type="primary" :disabled="state.username_valid===false" :enabled="state.username_valid===true">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
    name: "Modify",
    props: {
        dialogVisible: {
            type: Boolean,
            default: () => false
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
        title: {
            type: String,
            default: () => ""
        },
        content: {
            type: String,
            default: () => ""
        },
        audio_path:{
            type:File,
            default: ()=> ""
        },
        video_path:{
            type:File,
            default: ()=> ""
        },
    },
    // 请在下方设计自己的数据结构以及事件函数
    data() {
        return {
            form: {
                username: this.username,
                password: this.password
            },
        }
    },
    methods: {
        post() {
            var msg = this;
            this.dialogVisible = false;
            //获取密码
            return msg;
        },
        change(e) {
            this.$forceUpdate(e);
        },
        changeTitle(e) {
            this.$forceUpdate(e);
            this.setState({
                username_valid: true
            });
        },
        changeContent(e){
          this.$forceUpdate(e);
          this.setState({
            username_valid: true
          });
        },
        changeAudio(e){
          this.$forceUpdate(e);
          this.setState({
            username_valid: true
          });
        },
        changeVideo(e){
          this.$forceUpdate(e);
          this.setState({
            username_valid: true
          });
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
