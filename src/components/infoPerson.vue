<template>
  <el-dialog style="text-align: center;padding:2px;margin-left:2px" title="个人信息" :visible.sync="dialogVisible" :show-close=false width="80%"
  >
    <el-tag effect="dark" style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; margin-top:15px;" >
       用户名:
    </el-tag>
    <el-tag type="info"  style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; margin-top:15px;" v-model="name" label="用户名">{{name}}</el-tag><br>
    <el-tag effect="dark" style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; margin-top:15px;" >
      最后一次登录时间:
    </el-tag>
    <el-tag  style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; margin-top:15px;" type="info" v-model="last_login" effect="plain" label="最后一次登录时间">{{last_login}}</el-tag><br>
    <el-tag effect="dark" style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; margin-top:15px;" >
      加入时间:
    </el-tag>
    <el-tag type="info"  style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; margin-top:15px;" v-model="date_joined"
            effect="plain"
            label="加入时间">{{date_joined}}</el-tag><br>
    <el-button  style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; margin-top:15px;"  v-on:click="$emit('closeinfoPerson',''),dialogVisible=false">取 消</el-button>
    <el-button  style="display: inline-block; text-align:right; margin-left:15px; margin-right:15px; margin-top:15px;"  v-on:click="$emit('editinfoPerson',''),dialogVisible=false" type="primary" enabled>确 定</el-button>
  </el-dialog>
</template>

<script>
export default {
  name: "infoPerson",
  props: {
    name:{
      type:String,
      default: ()=> "unknown",
    },
    date_joined:{
       type:String,
       default: ()=> "unknown",
    },
    last_login:{
       type:String,
       default: () => "unknown",
    },
    dialogVisible: {
      type: Boolean,
      default: () => true
    },

  },
  data(){
    return {
      infoPerson:{
        dialogVisible:true,
        form:{
          name:this.name,
          last_login:this.last_login,
          date_joined:this.date_joined,
        }
      },
    }
  },
  methods:{
      change:function(name,last_login,date_joined){
        console.log(name);
        console.log(this.name);
        console.log(last_login);
        console.log(date_joined);
        this.name=name;
        //this.setState(this.name,name);
        this.last_login=last_login;
        this.date_joined=date_joined;
      }
  },
}
</script>

<style scoped>

</style>