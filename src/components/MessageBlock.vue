<template>
  <div>
    <el-menu :default-openeds="[]" style="background: #98DFFF;border-radius: 0px;margin: 0px" :visible.sync="dialogVisible">
       <el-submenu index="view" style="text-align: left">
            <template slot="title" ><i class="el-icon-chat-square"/>
                <span class="messageblock-title" >title: {{ title }}</span>
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
          v-bind:id="Modify.form.id"
          v-bind:type_id="Modify.form.type_id"
          v-bind:audio_path="Modify.form.audio_path"
          v-bind:video_path="Modify.form.video_path"
    />
    <Chart
         v-bind:dialog-visible="Chart.dialogVisible"
         v-on:cancelChart="Chart.dialogVisible=false"
         v-bind:female_num="Chart.female_num"
         v-bind:female_scores="Chart.female_scores"
         v-bind:unknown_num="Chart.unknown_num"
         v-bind:unknown_scores="Chart.unknown_scores"
         v-bind:male_num="Chart.male_num"
         v-bind:male_scores="Chart.male_scores"
         v-bind:female_score_average="Chart.female_score_average"
         v-bind:male_score_average="Chart.male_score_average"
         v-bind:unknown_score_average="Chart.unknown_score_average"
         v-bind:played_num="Chart.played_num"
         v-bind:title="Chart.title"
         v-bind:type_id="Chart.type_id"
         />
</div>
</template>

<script>
import Modify from "@/components/Modify"
import Chart from "@/components/Chart"
import {searchBackId2,DataSingleSearch} from "@/utils/communication.js"
    export default {
        name: "MessageBlock",
        components:{
          Modify,
          Chart,
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
                id: this.id,
                audio_path:this.audio_path,
                video_path:this.video_path,
              },
              formData: new FormData(),
            },
            Chart:{
              dialogVisible:false,
              female_num:this.female_num,
              female_scores:this.female_scores,
              unknown_num:this.unknown_num,
              unknown_scores:this.unknown_scores,
              male_num:this.male_num,
              male_scores:this.male_scores,
              female_score_average:this.female_score_average,
              male_score_average:this.male_score_average,
              unknown_score_average:this.unknown_score_average,
              played_num:this.played_num,
              title:this.title,
              type_id:this.type_id, 
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
            searchBackId2(this.id).then((res)=>{
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
                  this.Modify.form.id = Number(r["id"]);
                  this.Modify.form.audio_path = r['audio_path'];
                  this.Modify.form.video_path = r['video_path'];
                  console.log(this.Modify.form.video_path);
                  console.log(this.Modify.form.audio_path);
              });
            this.Modify.form.level_id = this.level_id;
            console.log(this.Modify.form.audio_path);
            console.log(this.Modify.form.video_path);
            this.Modify.dialogVisible = true;
            console.log(this.Modify.dialogVisible);
          },
          detailBlock(){
            console.log("hello world");
            DataSingleSearch(this.Modify.form.level_id).then((res)=>{
              if(res.status == 200 || res.status == 201){
                this.$message("拉取成功");
              }else{
                this.$message("拉取失败");
              }
              return res.json();
            }).then((r)=>{
                  this.Chart.female_num = r["female_num"],
                  this.Chart.female_scores = r["female_scores"],
                  this.Chart.unknown_num = r["unknown_num"],
                  this.Chart.unknown_scores = r["unknown_scores"],
                  this.Chart.male_num = r["male_num"],
                      this.Chart.male_scores = r["male_scores"],
                  this.Chart.female_score_average = r["female_score_average"],
                  this.Chart.male_score_average = r["male_score_average"],
                  this.Chart.unknown_score_average = r["unknown_score_average"],
                  this.Chart.played_num = r["played_num"],
                  this.Chart.title = r["title"],
                  this.Chart.type_id = r["type_id"],
                      this.Chart.dialogVisible=true,
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