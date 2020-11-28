<template>
    <div>
        <el-menu :default-openeds="[]" @open="handleOpen" @close="handleClose"
             style="background: #f3f3ff;border-radius: 0;margin: 0" :visible.sync="dialogVisible">
        <el-submenu index="view" style="text-align: left">
            <template slot="title" ><i class="el-icon-chat-square"/>
                <span class="messageblock-title" ><span class="messageblock-user" style="padding: 4px;"><strong>{{ level_id + 1 }}</strong></span> | {{ title }} </span>
                <el-button style="margin:1px;padding:4px;background-color: #f3f3ff;" @click="editBlock();$emit('editclicked','');"><i class="el-icon-edit"></i></el-button>
                <el-button style="margin:1px;padding:4px;background-color: #f3f3ff;" @click="detailBlock();$emit('detailclicked','');"><i class="el-icon-zoom-in"></i></el-button>
            </template>
            <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="12" style="text-align:center">
                <video controls="controls"
                       class="video"
                       loop="loop"
                       ref="video"
                       :src="video_path"
                       style="border-radius:10px;width:90%;margin-top:30px;"
                >
                </video>
                <br>
                <audio controls="controls"
                       class="audio"
                       loop="loop"
                       ref="audio"
                       :src="audio_path"
                       style="border-radius:10px;margin-top:10px">
                </audio>
                <el-divider content-position="left">文案</el-divider>
                <el-input
                        type="textarea"
                        placeholder="请输入文案"
                        v-model="content"
                        :autosize="{ minRows: 2, maxRows: 6 }"
                        readonly
                        style="width:95%;font-size:16px;margin-bottom:30px"
                ></el-input>
            </el-col>
        </el-submenu>
    </el-menu>
    <Modify v-bind:dialog-visible="Modify.dialogVisible"
            v-on:closeEmit="Modify.dialogVisible = false;"
            v-on:closeModify="Modify.dialogVisible = false;"
            v-bind:title="title"
            v-bind:content="content"
            v-bind:id="id"
            v-bind:type_id="type_id"
            v-bind:audio_path="audio_path"
            v-bind:video_path="video_path"
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
         v-bind:scores="Chart.scores"
         v-bind:score_average="Chart.score_average"
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
            content:{
                type:String,
                default: () => ""
            },
            level_id: {
                type:Number,
                default: () => 0
            },
            id: {
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
                    dialogVisible: false,
                    formData: new FormData(),
                },
            Chart: {
                scores: this.scores,
                score_average: this.score_average,
                dialogVisible: false,
                female_num: this.female_num,
                female_scores: this.female_scores,
                unknown_num: this.unknown_num,
                unknown_scores: this.unknown_scores,
                male_num: this.male_num,
                male_scores: this.male_scores,
                female_score_average: this.female_score_average,
                male_score_average: this.male_score_average,
                unknown_score_average: this.unknown_score_average,
                played_num: this.played_num,
                title: this.title,
                type_id: this.type_id,
            }
          }
        },
        mounted: function(){
            let that = this;
            searchBackId2(that.id).then((res) => {
                return res.json();
            }).then((r) => {
                that.type_id = Number(r.type_id);
                that.title = r.title;
                that.content = r.content;
                that.audio_path = r.audio_path;
                that.video_path = r.video_path;
            });
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
                this.Modify.dialogVisible = true;
            },
            handleOpen(){
                let that = this;
                searchBackId2(that.id).then((res) => {
                return res.json();
            }).then((r) => {
                that.type_id = Number(r["type_id"]);
                that.title = r["title"];
                that.content = r["content"];
                that.audio_path = r.audio_path;
                that.video_path = r.video_path;
            });
            },
            handleClose(){
                this.$refs.audio.stop();
                this.$refs.video.stop();
            },
            detailBlock(){
                DataSingleSearch(this.level_id).then((res)=>{
                    if(res.status === 200 || res.status === 201){
                        this.$message("拉取成功");
                    }else{
                        this.$message("拉取失败");
                    }
                return res.json();
            }).then((r)=>{
                this.Chart.female_num = r["female_num"]
                this.Chart.female_scores = r["female_scores"]
                this.Chart.unknown_num = r["unknown_num"]
                this.Chart.unknown_scores = r["unknown_scores"]
                this.Chart.male_num = r["male_num"]
                this.Chart.male_scores = r["male_scores"]
                this.Chart.female_score_average = r["female_score_average"]
                this.Chart.male_score_average = r["male_score_average"]
                this.Chart.unknown_score_average = r["unknown_score_average"]
                this.Chart.played_num = r["played_num"]
                this.Chart.title = r["title"]
                this.Chart.type_id = r["type_id"]
                this.Chart.scores=r["scores"]
                this.Chart.score_average=r["score_average"]
                this.Chart.dialogVisible=true
            })},
        }
    }
</script>

<style scoped>
    .messageblock-content{
        display: flex;
        color: #090607;
        padding-bottom: 0;
        font-size: large
    }

</style>