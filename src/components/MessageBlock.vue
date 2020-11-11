<template>
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
</template>

<script>
    export default {
        name: "MessageBlock",
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
            console.log("hello");
          },
          detailBlock(){
            console.log("hello");
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