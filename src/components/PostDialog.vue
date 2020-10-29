<template>
  <el-dialog
        style="text-align: center"
        title="发表"
        :visible.sync="dialogVisible"
        :show-close=false
        width="80%">
    <el-form label-width="80px">
        <el-form-item label="标题">
            <!--请修改这两行注释中间的代码来输入消息标题-->
            <el-input placeholder="title" v-model="title" @input="change()">{{ title }}</el-input>
            <!--请修改这两行注释中间的代码来输入消息标题-->
        </el-form-item>
        <el-form-item label="内容">
            <!--请修改这两行注释中间的代码来输入消息内容-->
            <el-input  type="textarea" placeholder="message" v-model="content" @input="change()"> {{ content }}</el-input>
            <!--请修改这两行注释中间的代码来输入消息内容-->
        </el-form-item>
        <el-form-item label="用户名">
            <!--请修改这两行注释中间的代码来输入用户名-->
            <el-input placeholder="name" v-model="state.username" @input="changename()"> {{ username }} </el-input>
            <!--请修改这两行注释中间的代码来输入用户名-->
            <span v-if="state.username_valid===false" style="color: red" >请设置合法用户名!</span>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
                <!--请修改这两行注释中间的代码来产生相应按钮的点击事件-->
                <el-button  v-on:click="post,$emit('cancel','')">取 消</el-button>
                <el-button  v-on:click="$emit('postmsg',{title:title,content:content,username:state.username,timestamp:new Date().getTime()}),dialogVisible=false" type="primary"
                            :disabled="state.username_valid===false"
                            :enabled="state.username_valid===true"
                            >确 定</el-button>
                <!--请修改这两行注释中间的代码来产生相应按钮的点击事件-->
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "PostDialog",
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
          username_valid: false
        }
      }
    },
    content:{
      type:String,
      default:() => ""
    },
    title:{
      type:String,
      default:() =>""
    }
  },
  // 请在下方设计自己的数据结构以及事件函数
  data(){
    return {
      postDialog:{
                  dialogVisible:true,
                  form:{
                      title:this.title,
                      content:this.content,
                      username:this.state.username,
                      datetime:this.timestamp,
                      username_valid:this.state.username_valid
                    }
                },
    }
  },
  methods: {
      post(){
        var msg=this;
        this.dialogVisible = false;
				//获取密码
        return msg;
      },
      change(e){
        this.$forceUpdate(e);
      },
      changename(e){
        this.$forceUpdate(e);
        this.setState({username_valid : true});
        console.log(this.state.username_valid);
      }
  },
  watch: { // 用于实时检测username是否合法
    "state.username": {
      handler(newName) {
        this.state.username_valid = /^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(newName)
      }
    }
  }
}
</script>