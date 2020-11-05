<template>
<el-dialog style="text-align: center"
        title="添加"
        :visible.sync="dialogVisible"
        :show-close=false
        width="80%">
<el-form label-width="80px">
  <el-form-item>
    <label>关卡ID  </label>
    <input type="text" v-model="level"/>
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
  </el-form-item>
  <el-form-item>
    <label>上传视频   </label>
    <input type="file" @change="getFile($event,'video_path')"/>
  </el-form-item>
<button @click=submitForm($event)>OK</button>
</el-form>
<span slot="footer" class="dialog-footer">
  <el-button  v-on:click="$emit('cancelAdd',''),dialogVisible=false">取 消</el-button>
  <el-button  v-on:click="$emit('addCalled',''),dialogVisible=false" type="primary" enabled>确 定</el-button>
</span>
</el-dialog>
</template>
<script>
import {AddBack} from "@/utils/communication"
export default({
    name: "Add",
    props:{
      dialogVisible: {
        type: Boolean,
        default: () => true
      },
      level:{
        type:Number,
        default: ()=>0
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
            level_id:this.level_id,
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
            this.formData.append("title",this.title);
            this.formData.append("content",this.content);
            this.formData.append("level_id",this.level);
            console.log("helloworld");
          let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : 'JWT '+localStorage.getItem("token")
                }
            };
          console.log("helloworld");
          console.log(this.formData);
          AddBack(this.formData);
          this.$axios({
            url:'https://voicetestgame-dijkstra.app.secoder.net/api/manager',
            method:'post',//method默认是get请求
            data: this.formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization' : 'JWT '+localStorage.getItem("token")
            }
          }).then(function(res){
            console.log(res)
            // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
          }).catch(err=>{
            console.log(err)
          });
          //this.$http.post('https://voicetestgame-dijkstra.app.secoder.net/api/users/', this.formData).then((res)=>console.log(res));
          //this.$http.post('https://voicetestgame-dijkstra.app.secoder.net/api/users/', "",config).then((res)=>console.log(res));
              this.$axios.post('https://voicetestgame-dijkstra.app.secoder.net/api/users/', this.formData, config).then(function (res) {
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


