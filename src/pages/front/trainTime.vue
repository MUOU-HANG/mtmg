<template>
<div class="box">
<el-table :data="trainData" border row-style="height:35px" cell-style="padding:0" style="padding:20px" class="table">
    <el-table-column label="时间" prop="time" width="300px" align="center"></el-table-column>
    <el-table-column label="训练科目" prop="train" width="400px" align="center" ></el-table-column>
  </el-table>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      trainData: []
    };
  },
  created() {
    this.getTrainTime();
  },
  methods: {
    // 获取训练时间表
    getTrainTime() {
      this.$http.post("/api/user/getTrainTime").then(res => {
        this.trainData = res.data;
      });
    }
  }
};
</script>


<style>
.box {
  width: 750px;
  height: 800%;
  margin: 100px auto;
}

</style>

