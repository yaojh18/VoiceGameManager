<template>
<el-dialog style="text-align: center"
        title="登录"
        :visible.sync="loginvisible"
        :show-close=false
        width="80%">
<el-form label-width="80px">    
<input type="text" v-model="title">
<input type="text" v-model="content">
<input type="file" @change="getFile($event,'audio_path')">
<input type="file" @change="getFile($event,'video_path')">
<button @click="submitForm($event)">OK</button>
</el-form>
<span slot="footer" class="dialog-footer">
        <el-button  v-on:click="$emit('cancellogin',''),loginvisible=false">取 消</el-button>
        <el-button  v-on:click="$emit('logincalled',{username:username,password:password}),loginvisible=false" type="primary"
                            :disabled="state.username_valid===false"
                            :enabled="state.username_valid===true"
                            >确 定</el-button>
</span>
</el-dialog>
</template>
<script>
export default({
    name: "Add",
    el: '#app',
    data(){
        return {
        param: {
            title: this.title,
            content: this.content,
            audio_path: '',
            video_path: '',
        },
        formData: new FormData(),
        }
    },
    mounted: function () {

    },
    methods: {
        getFile(event, input_file_name) {
            this.formData.append(input_file_name, event.target.files[0]);
        },
        submitForm(event) {
            event.preventDefault();
            for (let i in this.param) {
                this.formData.append(i, this.param[i]);
            }
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            this.$http.post('/url', this.formData, config).then(function (res) {
                if (res.status === 200) {
                    console.log(res);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },

});
</script>


