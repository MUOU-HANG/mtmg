<template>
  <div class="container">
    <div class="nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">军训申请</el-menu-item>
        <el-menu-item index="3">日记上传</el-menu-item>
        <el-menu-item index="4">训练计划</el-menu-item>
        <el-menu-item index="5">信息修改</el-menu-item>
        <el-menu-item index="6">军训评价</el-menu-item>
      </el-menu>
    </div>
    <div class="logo">
      <img src="../../assets/images/logo_03.jpg">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoInput: {
        name: ""
      },
      activeIndex: "1",
      msg:'admin'
    };
  },
  methods: {
    handleSelect(index) {
      if (index == 1) this.$router.push("/frontHome");
      if (index == 2) this.$router.push("/frontStudent");
      if (index == 3) this.$router.push("/diaryUpload");
      if (index == 4) this.$router.push("/trainTime");
      if (index == 5) this.$router.push("/stuChangeInfo");
      if (index == 6) this.$router.push("/comment");
    }
  }
};
</script>

<style>
body {
  background: url("../../assets/images/banner.jpg") no-repeat 0px 0px;
}
.nav {
  position: absolute;
  top: 20px;
  left: 40px;
  background-color: rgba(255, 255, 255, 0.5);
}
.el-menu  {
  background-color: rgba(255, 255, 255, 0.5);
}
.logo{
  position: absolute;
  top: 30px;
  right: 30px;
}
</style>


