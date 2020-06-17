<template>
  <div class="block">
    <el-header class="stu_stration">
      <el-form :model="form" inline>
        <ElFormItem label="输入作者名字：">
          <el-input
            v-model.trim="searchValue"
            placeholder="输入作者名字"
            ref="search"
            suffix-icon="el-icon-search"
          ></el-input>
        </ElFormItem>
      </el-form>
    </el-header>
    <!-- 表格输出 -->
    <div>
      <el-table :data="diaryData" style="width: 100%" class="listTable" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column prop="diaryId" label="序号" align="center" width="60px"></el-table-column> -->
        <el-table-column prop="stuId" label="学号" align="center" width="100px" sortable></el-table-column>
        <el-table-column prop="diaryAuthor" label="作者" align="center" width="100px"></el-table-column>
        <el-table-column prop="diaryTitle" label="日记标题" align="center" width="200"></el-table-column>
        <el-table-column prop="diaryContent" label="内容" align="center"></el-table-column>
        <el-table-column prop="diaryDate" label="日期" align="center" width="100"></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="dialogFormVisible = true;handleChange(scope.$index, scope.row)"
              round
            >查看</el-button>

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              round
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
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
      <!-- 日记详情 -->
      <el-dialog title="日记详情" :visible.sync="dialogFormVisible" center show-close >
        <el-form :model="form" inline>
          <el-form-item label="日记标题" :label-width="formLabelWidth">
            <h2>{{diaryTitle}}</h2>
          </el-form-item>
          <el-form-item label="作者" class="formItem" :label-width="formLabelWidth">
            <h4>{{diaryAuthor}}</h4>
          </el-form-item>
        </el-form>
        <el-form :model="form" inline>
          <el-form-item label="正文内容" :label-width="formLabelWidth">
            <p class="content">{{diaryContent}}</p>
          </el-form-item>
        </el-form>
        <el-form :model="form" inline>
          <el-form-item label="撰写日期" class="formItem" :label-width="formLabelWidth">
            <h4>{{diaryDate}}</h4>
          </el-form-item>
        </el-form>
        <el-button type="danger" @click="dialogFormVisible = false" class="backBtn">返回</el-button>
      </el-dialog>
    </div>
    <!-- <el-button type="primary" @click="handleChange(scope.$index, scope.row)"></el-button> -->
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
  data() {
    return {
      diaryData: [],
      //   编辑表单
      diaryTitle: "",
      diaryAuthor: "",
      diaryContent: "",
      diaryDate: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      searchValue: "",
      form: {
        diaryTitle: "",
        diaryAuthor: "",
        diaryContent: "",
        diaryDate: ""
      },
      // 分页
      count: "",
      page_size: 6,
      currentPage: 1
    };
  },
  created() {
    this.getList()
  },
  watch: {
    searchValue() {
      delay(() => {
        this.getList()
      }, 300);
    }
  },
  methods: {
    // 获取日记列表
    getList() {
      var diaryAuthor = this.searchValue;
      var val = 1;
      this.$http
        .post(
          "/api/user/diaryList",
          {
            diaryAuthor: diaryAuthor,
            begin: val * 6 - 6,
            end: val * 6
          },
          {}
        )
        .then(res => {
          this.diaryData = res.data;
          for (var i in res.data) {
            //  分割内容
            var content = res.data[i].diaryContent.substring(0, 20) + "......";
            this.diaryData[i].diaryContent = content
            this.$http
            .post("/api/user/diaryCount", { diaryAuthor: diaryAuthor })
            .then(res => {
              this.count = res.data;
            });
          }
        });
    },
    // 为dialog表单赋值
    handleChange(index, row) {
      this.diaryTitle = row.diaryTitle;
      this.diaryAuthor = row.diaryAuthor;
      var diaryAuthor = this.searchValue;
      var val = 1;
      this.$http
        .post(
          "/api/user/diaryList",
          {
            diaryAuthor: diaryAuthor,
            begin: val * 6 - 6,
            end: val * 6
          },
          {}
        )
        .then(res => {
          this.diaryData = res.data;
          this.diaryContent = res.data[index].diaryContent;
          var date = res.data[index].diaryDate.substring(0, 10);
          this.diaryDate = date;
          for (var i in res.data) {
            //  分割内容
            var content = res.data[i].diaryContent.substring(0, 15) + "......";
            this.diaryData[i].diaryContent = content;
          }
        });
    },
    // 信息删除
    handleDelete(index, row) {
      this.$confirm("是否删除日记" + row.diaryTitle + "？", "删除提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 在数据库中删除数据
          this.$http
            .post("/api/user/diaryDel", { diaryId: row.diaryId })
            .then(res => {
              if (res.status) {
                this.$message({
                  message: "删除日记——" + row.diaryTitle + "成功",
                  type: "success"
                });
                this.reload();
              } else {
                this.$message({
                  message: "删除日记——" + row.diaryTitle + "失败",
                  type: "warning"
                });
              }
            });
        })
        .catch(() => {});
    },
    // 分页
    handleCurrentChange(val) {
      const number = this.$refs.search.value;
      this.$http
        .post(
          "/api/user/stuList",
          {
            number: number,
            begin: val * 6 - 6,
            end: val * 6 - 1
          },
          {}
        )
        .then(res => {
          this.stuData = res.data;
        });
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
.block {
  margin-left: 10px;
}
.stu_stration {
  margin-top: 20px;
}

.listTable {
  position: relative;
  top: 20px;
}
/* 分页功能 */
.page {
  width: 400px;
  margin: 30px auto;
}
.backBtn {
  width: 100px;
  margin-left: 400px;
}
.content {
  border: 1px solid rgb(233, 236, 236);
  padding: 10px;
  width: 500px;
  height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
