<template>
    <el-menu :default-openeds="[]" style="background: #b0c7e7;border-radius: 4px;margin: 5px">
        <el-submenu index="view" style="text-align: left">
            <template slot="title" ><i class="el-icon-chat-square"/>
                
                <span class="messageblock-title" >{{ title }}</span>
                
            </template>
            <div style="display:flex; margin-top: 3px; font-size: small;color: grey">
                <span class="messageblock-datetime" style="padding: 4px;">
                
                {{ datetime }}
                </span>
                <span class="messageblock-user" style="padding: 4px;">{{ level_id }}</span>
            </div>
            <div class="messageblock-content">{{ id }}</div>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "MessageBlock",
        props: {
            title: {
                type:String,
                default: () => "unknown title"
            },
            level_id: {
                type:String,
                default: () => "unknown level_id"
            },
            id: {
                type:String,
                default: () => "unknown id"
            },
            timestamp: {
                type:Number,
                default: () => 0
            },
        },
        computed:{
            datetime:function () {
                var d = new Date()
                d.setTime(this.timestamp)
                return d.toLocaleString()
            }
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