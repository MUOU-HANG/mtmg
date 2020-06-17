<template>
  <el-tabs v-model="activeName" class="tabs" tab-position="left">
    <el-tab-pane label="教师评价" name="first">
      <div class="search">
        <el-form :model="search" inline ref="search" :rules="rules">
          <el-form-item label="学号" prop="number">
            <el-input v-model="search.number" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="search.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleSearch('search')">查找</el-button>
          <el-form-item label="评价教师:" style="margin-left:100px;">
            <h3>{{search.teacher}}</h3>
          </el-form-item>
          <el-form-item label="评价问题数" style="margin-left:100px;">
            <h3>{{search.count+"/8"}}</h3>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="issueListData">
        <el-table-column label="序号" prop="id" width="50px" align="center"></el-table-column>
        <el-table-column label="问题" prop="issue" align="center"></el-table-column>
        <el-table-column label="评价" prop="comment" align="center">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.value"
              show-text
              :max="4"
              @change="handleComment(scope.$index, scope.row)"
            ></el-rate>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn">
        <el-button type="primary" @click="handleClick()">评价完成</el-button>
        <el-button type="danger" @click="handleClick()">退出</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="教官评价" name="second">
      <div class="search">
        <el-form :model="search" inline ref="search" :rules="rules">
          <el-form-item label="学号" prop="number">
            <el-input v-model="search.number" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="search.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleSearch('search')">查找</el-button>
          <el-form-item label="评价教官:" style="margin-left:100px;">
            <h3>{{search.teacher}}</h3>
          </el-form-item>
          <el-form-item label="评价问题数" style="margin-left:100px;">
            <h3>{{search.count+"/8"}}</h3>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="issueListData">
        <el-table-column label="序号" prop="id" width="50px" align="center"></el-table-column>
        <el-table-column label="问题" prop="issue" align="center"></el-table-column>
        <el-table-column label="评价" prop="comment" align="center">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.value"
              show-text
              :max="4"
              @change="handleComment(scope.$index, scope.row)"
            ></el-rate>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn">
        <el-button type="primary" @click="handleClick()">评价完成</el-button>
        <el-button type="danger" @click="handleClick()">退出</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      value: null,
      issueListData: [],
      search: {
        number: "",
        password: "",
        teacher: "",
        count: 0
      },
      rules: {
        number: [
          { required: true, message: "请输入学生学号", trigger: "blur" },
          { min: 9, max: 10, message: "请输入完整学号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    this.handleIssue();
  },
  methods: {
    // 获取评价的教师
    handleSearch(search) {
      this.$refs[search].validate(valid => {
        if (valid) {
          var number = this.search.number;
          var password = this.search.password;
          this.$http
            .post("/api/user/stuList", { number: number, begin: 0, end: 500 })
            .then(res => {
              if (res.data[0].password != password) {
                this.$message({
                  message: "密码错误，请重新输入！",
                  type: "warning"
                });
              } else if (res.data.length > 1) {
                this.$message({
                  message: "请输入完整的学号",
                  type: "warning"
                });
              } else if (res.data.length == 0) {
                this.$message({
                  message: "没有该生信息，请联系辅导员",
                  type: "warning"
                });
              } else {
                this.search.teacher = res.data[0].teacher;
              }
            });
        }
      });
    },
    // 获取教师问题
    handleIssue() {
      this.$http.post("/api/user/issueList_tc").then(res => {
        this.issueListData = res.data;
      });
    },
    handleComment(index, row) {
      var mark = row.value;
      var worse = 0,
        common = 0,
        good = 0,
        satisfied = 0;
      if (mark == 1) worse = 1;
      else if (mark == 2) common = 1;
      else if (mark == 3) good = 1;
      else satisfied = 1;
      var id = row.id;
      var teacher = this.search.teacher;
      // 判断该教师该问题是否评价过
      if (teacher) {
        this.$http
          .post("/api/user/tcCheck", { issueId: id, tcName: teacher })
          .then(res => {
            console.log(res);
            if(res.data.length!=0){
            this.$http
              .post("/api/user/tcMarkDetailsUpdate", {
                tcName: teacher,
                issueId: id,
                satisfied: satisfied,
                good: good,
                common: common,
                worse: worse
              })
              .then(res => {
                this.search.count = this.search.count + 1;
                if (this.search.count >= 8) this.search.count = 8;
              });
            }else{
              this.$http
              .post("/api/user/tcMarkDetailsAdd", {
                tcName: teacher,
                issueId: id,
                satisfied: satisfied,
                good: good,
                common: common,
                worse: worse
              })
              .then(res => {
                this.search.count = this.search.count + 1;
                if (this.search.count >= 8) this.search.count = 8;
              });
            }
          });
      } else {
        this.$message({
          message: "请先输入学号获取评价教师",
          type: "info"
        });
      }
    },
    handleClick() {
      if (this.search.count == 8) {
        this.$confirm("您已完成所有的评价!", "title", {
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push("/frontHome");
          })
          .catch(() => {});
      } else {
        this.$message({
          message: "请先完成所有评价!",
          type: "info"
        });
      }
    }
  }
};
</script>

<style>
.tabs {
  padding: 10px 30px;
  margin: 100px 20px;
  background: rgba(240, 240, 240, 0.87);
}
.table {
  border: 1px solid red;
}
.btn {
  margin: 10px auto;
  width: 200px;
}
</style>
