<template>
<el-dialog style="text-align: center"
        title="添加"
        :visible.sync="dialogVisible"
        :show-close=false
        width="80%">
<el-form label-width="80px">    
  <input type="text" v-model="title"/>
  <input type="text" v-model="content"/>
<input type="file" @change="getFile($event,'audio_path')"/>
<input type="file" @change="getFile($event,'video_path')"/>
<button @click=submitForm($event)>OK</button>
</el-form>
<span slot="footer" class="dialog-footer">
  <el-button  v-on:click="$emit('cancelAdd',''),dialogVisible=false">取 消</el-button>
  <el-button  v-on:click="$emit('addCalled',''),dialogVisible=false" type="primary" enabled>确 定</el-button>
</span>
</el-dialog>
</template>
<script>
export default({
    name: "Add",
    props:{
      dialogVisible: {
        type: Boolean,
        default: () => true
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
        },
        formData: new FormData(),
        }
    },
    mounted: function () {

    },
    methods: {
        getFile(e, input_file_name) {
            console.log(input_file_name);
            this.formData.append(input_file_name, e.target.files[0]);
            console.log(this.formData);
            console.log(e.target.files[0]);
        },
        submitForm(e) {
            console.log("helloworld");
            e.preventDefault();
            for (let i in this.param) {
                this.formData.append(i, this.form[i]);
            }
            console.log("helloworld");
          let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : 'JWT '+localStorage.getItem("token")
                }
            };
          console.log("helloworld");
            $http.post('https://voicetestgame-dijkstra.app.secoder.net/api/users/', this.formData, config).then(function (res) {
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


