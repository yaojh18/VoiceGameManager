<template>
  <el-container>
    <el-card>个人信息修改
    </el-card>
    <ModifyPwd />
  </el-container>
</template>
<script>
import ModifyPwd from "@/components/ModifyPwd.vue";
export default {
    name: "Person",
    components: {
      ModifyPwd,
    }
}
</script>