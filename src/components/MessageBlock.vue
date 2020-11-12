<template>
  <div>
    <el-menu :default-openeds="[]" style="background: #98DFFF;border-radius: 0px;margin: 0px" :visible.sync="dialogVisible">
       <el-submenu index="view" style="text-align: left">
            <template slot="title" ><i class="el-icon-chat-square"/>
                <span class="messageblock-title" >title: {{ title }}</span>
                <el-button style="margin:1px;padding:4px;align:right;background-color: #87CEFA;" @click="closeBlock();$emit('closeclicked','');"><i class="el-icon-close"></i></el-button>
                <el-button style="margin:1px;padding:4px;align:right;background-color: #87CEFA;" @click="editBlock();$emit('editclicked','');"><i class="el-icon-edit"></i></el-button>
                <el-button style="margin:1px;padding:4px;align:right;background-color: #87CEFA;" @click="detailBlock();$emit('detailclicked','');"><i class="el-icon-zoom-in"></i></el-button>
            </template>
            <div style="display:flex; margin-top: 3px; font-size: small;color: grey">
                <span class="messageblock-datetime" style="padding: 4px;">
                datetime: {{ datetime }}
                </span>
                <span class="messageblock-user" style="padding: 4px;">level_id: {{ level_id }}</span>
            </div>
            <div class="messageblock-content">id: {{ id }}</div>
        </el-submenu>
    </el-menu>
    <Modify v-bind:dialog-visible="Modify.dialogVisible"
            v-on:closeEmit="Modify.dialogVisible = false;"
          v-on:closeModify="Modify.dialogVisible = false;"
          v-bind:level_id="Modify.form.level_id"
          v-bind:title="Modify.form.title"
          v-bind:content="Modify.form.content"
          v-bind:dataId="Modify.form.dataId"
          v-bind:type_id="Modify.form.type_id"
          v-bind:audio_path="Modify.form.audio_path"
          v-bind:video_path="Modify.form.video_path"
    />
</div>
</template>

<script>
import Modify from "@/components/Modify"
import {searchBackIdLevel,DataSingleSearch} from "@/utils/communication.js"
    export default {
        name: "MessageBlock",
        components:{
          Modify,
        },
        props: {
            dialogVisible:{
              type:Boolean,
              default:()=> true
            },
            title: {
                type:String,
                default: () => "unknown title"
            },
            level_id: {
                type:Number,
                default: () => 0
            },
            id: {
                type:Number,
                default: () => 0
            },
            timestamp: {
                type:Number,
                default: () => 0
            },
            type_id:{
                 type:Number,
                 default: () => 0
            },
            audio_path:{
                 type:String,
            },
            video_path:{
                 type:String,
            },
        },
        data() {
          return {
            Modify: {
              dialogVisible:false,
              form: {
                title: this.title,
                content: this.content,
                level_id: this.level_id,
                dataId: this.dataId,
                audio_path:this.audio_path,
                video_path:this.video_path,
              },
              formData: new FormData(),
            }
          }
        },
        computed:{
            datetime:function () {
                var d = new Date()
                d.setTime(this.timestamp)
                return d.toLocaleString()
            }
        },
      methods:{
          closeBlock(){
            this.dialogVisible = false;
          },
          editBlock(){
            searchBackIdLevel(this.level_id).then((res)=>{
              if(res.status == 200 || res.status == 201){
                this.$message("拉取成功");
              }else{
                this.$message("拉取失败");
              }
              return res.json();
            }).then((r)=> {
              console.log(r);
              this.Modify.form.type_id = Number(r["type_id"]);
              this.Modify.form.title = r["title"];
              this.Modify.form.content = r["content"];
              this.Modify.form.dataId = Number(r["id"]);
              this.Modify.form.audio_path = r['audio_path'];
              this.Modify.form.video_path = r['video_path'];
            });
            this.Modify.form.level_id = this.level_id;
            console.log(this.Modify.form.audio_path);
            console.log(this.Modify.form.video_path);
            this.Modify.dialogVisible = true;
            console.log(this.Modify.dialogVisible);
          },
          detailBlock(){
            DataSingleSearch(this.level_id).then((res)=>{
              if(res.status == 200 || res.status == 201){
                this.$message("拉取成功");
              }else{
                this.$message("拉取失败");
              }
              return res.json();
            }).then((r)=>{
              console.log(r);
            })
          },
      }
    }
</script>

<style scoped>
    .messageblock-content{
        display: flex;
        color: #090607;
        padding-bottom: 10px;
        font-size: large
    }

</style>