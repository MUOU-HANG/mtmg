<template>
  <div class="block">
    <h1 class="title">{{year}}年带训教官满意度汇总表</h1>
    <el-header class="mark_stration">
      <el-form inline>
        <ElFormItem label="输入辅导员工号：">
          <el-input
            v-model.trim="searchValue"
            placeholder="输入辅导员工号"
            ref="search"
            suffix-icon="el-icon-search"
          ></el-input>
        </ElFormItem>
      </el-form>
    </el-header>
    <el-container>
      <el-table :data="maMarkData" style="width: 100%">
        <el-table-column prop="number" label="代号" width="120" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="教官" align="center" width="150"></el-table-column>
        <el-table-column prop="clName" label="所带班级" align="center" width="150"></el-table-column>
        <el-table-column label="满意度汇总（以百分比形式）" align="center">
          <el-table-column prop="satisfied" label="十分满意" align="center"></el-table-column>
          <el-table-column prop="good" label="一般满意" align="center"></el-table-column>
          <el-table-column prop="common" label="一般" align="center"></el-table-column>
          <el-table-column prop="worse" label="不满意" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetails(scope.$index, scope.row)" round>详细</el-button>
            <el-button
              size="mini"
              @click="handleDel(scope.$index, scope.row)"
              round
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <div class="page">
      <el-pagination
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="count"
        :page-size="page_size"
      ></el-pagination>
    </div>
    <el-dialog
      title="评价详情"
      :visible.sync="dialogTableVisible"
      center
      show-close
      class="dialog"
      lock-scroll
    >
      <div class="tableBox">
        <el-table :data="issueListData" style="width: 40%" class="dialogTable1">
          <el-table-column label="问卷内容" align="center">
            <el-table-column prop="id" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="issue" label="评价项" align="center"></el-table-column>
          </el-table-column>
        </el-table>
        <el-table :data="markDetails" style="width: 55%" class="dialogTable2">
          <el-table-column label="满意度汇总（以百分比形式）" align="center">
            <el-table-column prop="satisfiedMark" label="十分满意" align="center"></el-table-column>
            <el-table-column prop="goodMark" label="一般满意" align="center"></el-table-column>
            <el-table-column prop="commonMark" label="一般" align="center"></el-table-column>
            <el-table-column prop="worseMark" label="不满意" align="center"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <el-button type="danger" @click="dialogTableVisible = false" class="backBtn">返回</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { Dialog } from "element-ui";
// 节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
export default {
  inject: ["reload"],
  name: "Mcomment",
  data() {
    return {
      year: "",
      maMarkData: [],
      markDetails: [],
      issueListData: [],
      count: "",
      page_size: 6,
      currentPage: 1,
      searchValue: "",
      dialogTableVisible: false
    };
  },
  created() {
    this.getYear();
    this.getMarkList();
  },
  watch: {
    searchValue() {
      delay(() => {
        this.getMarkList();
      }, 300);
    }
  },
  methods: {
    //   获取年份
    getYear() {
      var date = new Date();
      var year = date.getFullYear();
      this.year = year;
    },
    getMarkList() {
      var number = this.searchValue;
      var val = 1;
      this.$http
        .post(
          "/api/user/maMarkList",
          {
            number: number,
            begin: val * 5 - 5,
            end: val * 5
          },
          {}
        )
        .then(res => {
          if (res) {
            this.maMarkData = res.data
            this.$http
              .post("/api/user/maMarkCount", { number: number })
              .then(res => {
                this.count = res.data;
              });
          } else {
            this.$confirm("暂未有评价信息，请军训结束后再查看", "信息为空", {
              confirmButtonText: "返回主页",
              cancelButtonText: "好，我明白了",
              type: "warning"
            }).then(() => {
              this.$router.push("/index");
            });
          }
        });
    },
    handleCurrentChange(val) {
      const number = this.$refs.search.value;
      this.$http
        .post(
          "/api/user/maMarkList",
          {
            number: number,
            begin: val * 5 - 5,
            end: val * 5
          },
          {}
        )
        .then(res => {
            this.maMarkData = res.data
        });
    },
    handleDetails(index, row) {
      //   获取问题的评价
      this.$http
        .post("/api/user/issueAnswer_ma", { number: row.number })
        .then(res => {
          if (res.data != "") {
            this.markDetails = res.data;
            this.dialogTableVisible = true;
            this.$http.post("/api/user/issueList_ma").then(res => {
              this.issueListData = res.data;
            });
          } else {
            this.$message({
              message: "暂未有评价，请军训结束后再查看",
              type: "warning"
            });
          }
          this.markDetails = res.data;
        });
    },
    handleDel(index, row) {
      this.$confirm("是否删除" + row.name + "的评价信息？", "删除提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 在数据库中删除数据
          this.$http
            .post("/api/user/maMarkDel", { number: row.number })
            .then(res => {
              if (res.status) {
                this.$message({
                  message: "删除辅导员" + row.number + "成功",
                  type: "success"
                });
                this.reload();
              } else {
                this.$message({
                  message: "删除辅导员" + row.number + "失败，请联系维护人员！",
                  type: "warning"
                });
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
.title {
  margin: 5px auto;
  width: 350px;
}
.mark_stration {
  margin-bottom: -10px;
}
.page {
  width: 400px;
  margin: 10px auto;
}
.backBtn {
  margin-left: 800px;
  margin-top: 20px;
}
.dialog {
  width: 2000px;
  margin-left: -250px;
  margin-top: -70px;
  height: 700px;
}
.tableBox {
  margin-left: 20px;
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}
.dialogTable1 {
  width: 40%;
  float: left;
}
.dialogTable2 {
  width: 60%;
  margin-right: 45px;
  border-left: 0 none;
  float: right;
}
</style>
