<template>
<el-dialog style="text-align: center"
        title="添加"
        :visible.sync="dialogVisible"
        :show-close=false
           v-on:close="$emit('closeAdd','')"
        width="80%">
    <el-form label-width="120px">
        <el-form-item label="类别">
            <el-select v-model="type_id" style="width:80%" placeholder="请选择">
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
        <el-button v-on:click="submitForm();" type="primary" >确 定</el-button>
        <el-button v-on:click="$emit('closeAdd','');dialogVisible=false">取 消</el-button>
    </span>
</el-dialog>
</template>
<script>
import { AddBack } from "@/utils/communication"
import { Loading } from 'element-ui';
export default({
    name: "Add",
    props:{
        dialogVisible: {
            type: Boolean,
            default: () => true
        },
        type_id:{
            type:Number,
            default: () => '请选择'
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
                type_id:this.type_id,
            },
            formData: new FormData(),
        }
    },
    methods: {
        handleAudio(file) {
            this.formData.append('audio_path', file.raw);
        },
        handleVideo(file) {
            this.formData.append('video_path', file.raw);
        },
        submitForm() {
            let loading = Loading.service({
                lock: true,
                text: '上传中……',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            let that = this
            this.formData.append("title",this.title);
            this.formData.append("content",this.content);
            this.formData.append("type_id",this.type_id);
            AddBack(this.formData).then((res)=>{
                if(res.status === 201){
                    that.$message('添加成功');
                    that.$emit('addSucceed')
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


