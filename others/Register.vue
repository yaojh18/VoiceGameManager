<template>
<el-dialog
        style="text-align: center"
        title="登录"
        :visible.sync="dialogVisible"
        :show-close=false
        width="80%">
        <el-form label-width="80px">
        <el-form-item label="标题">
            <!--请修改这两行注释中间的代码来输入消息标题-->
            <el-input placeholder="title" v-model="title" @input="change()">{{ title }}</el-input>
            <!--请修改这两行注释中间的代码来输入消息标题-->
        </el-form-item>
        <el-form-item label="用户名">
            <!--请修改这两行注释中间的代码来输入消息内容-->
            <el-input  type="textarea" placeholder="用户名" v-model="username" @input="change()"> {{ username }}</el-input>
            <!--请修改这两行注释中间的代码来输入消息内容-->
        </el-form-item>
        <el-form-item label="密码">
            <!--请修改这两行注释中间的代码来输入用户名-->
            <el-input : type='password'
                        placeholder="" 
                        v-model="state.password" 
                        @input="changename()"
            > {{ password }} </el-input>
            <!--请修改这两行注释中间的代码来输入用户名-->
            <span v-if="state.username_valid===false" style="color: red" >请设置合法用户名!</span>
        </el-form-item>
    </el-form>
    </el-dialog>
</template>

<script>
    export default {
        name: "Register",
        props: {
                 dialogVisible: {
      type: Boolean,
      default: () => true
    },
    state: {
      type: Object,
      default: () => {
          return {
          username: "",
          password: "",
          username_valid: false
        }
      }
    },
            username: {
                type:String,
                default: () => "unknown username"
            },
            password: {
                type:String,
                default: () => "unknown password"
            },
            password2: {
                type:String,
                default: () => "unknown password2"
            }
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