<template>
<el-dialog style="text-align: center" title="登录" :visible.sync="modify" :show-close=false width="80%">
    <el-form label-width="80px">
        <el-form-item label="标题">
            <el-input placeholder="请输入修改标题" v-model="title" @input="changeTitle()">{{ title }}</el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input placeholder="请输入内容" v-model="content" @input="changeContent()">{{ content }}</el-input>
        </el-form-item>
        <el-form-item label="音频">
            <el-input placeholder="请输入音频" v-model="audiofile" @input="changeAudio()">{{ audiofile }}</el-input>
        </el-form-item>
        <el-form-item label="视频">
            <el-input placeholder="请输入视频" v-model="videofile" @input="changeVideo()">{{ videofile }}</el-input>
        </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('cancelmodify',''),loginvisible=false">取 消</el-button>
        <el-button v-on:click="$emit('logincalled',{username:username,password:password}),loginvisible=false" type="primary" :disabled="state.username_valid===false" :enabled="state.username_valid===true">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
    name: "Modify",
    props: {
        modifyvisible: {
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
        audiofile:{
            type:File,
            default: ()=> ""
        },
        videofile:{
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
        changename(e) {
            this.$forceUpdate(e);
            this.setState({
                username_valid: true
            });
            console.log(this.state.username_valid);
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
