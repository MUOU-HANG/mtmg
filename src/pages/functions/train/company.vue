<template>
  <div class="block">
    <el-header class="company_stration">
      <el-form :model="form" inline>
        <ElFormItem label="输入查询班级：">
          <el-input
            v-model.trim="searchValue"
            placeholder="请输入查询班级"
            ref="search"
            suffix-icon="el-icon-search"
          ></el-input>
        </ElFormItem>
        <!-- <el-button type="primary" @click="handleSearch();handCount()">查找</el-button> -->
        <el-button
          type="info"
          icon="el-icon-circle-plus"
          round
          plain
          class="companyAdd"
          @click="dialogFormVisibleAdd = true"
        >增加信息</el-button>
        <!-- 数据导出 -->
        <el-button
          @click="outExe()"
          icon="el-icon-download"
          round
          plain
          type="success"
          style="margin-left:480px;"
        >导出</el-button>
      </el-form>
    </el-header>
    <!-- 表格输出 -->
    <el-table :data="companyData" style="width: 100%" class="listTable">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="clCode" label="班级编号" align="center" width="100px"></el-table-column>
      <el-table-column prop="clGrade" label="年级" align="center" width="50px"></el-table-column>
      <el-table-column prop="clName" label="班级" align="center"></el-table-column>
      <el-table-column prop="diName" label="系别" align="center"></el-table-column>
      <el-table-column prop="clRowName" label="连排名称" align="center" width="90px"></el-table-column>
      <el-table-column prop="tcName" label="辅导员" align="center" width="90px"></el-table-column>
      <el-table-column prop="maName" label="教官" align="center" width="90px"></el-table-column>
      <el-table-column prop="clMaxCount" label="剩余名额/班级容量" align="center" width="90px"></el-table-column>
      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="dialogFormVisible = true;handleChange(scope.$index, scope.row)"
            round
          >编辑</el-button>
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
    <!-- 编辑表单 -->
    <el-dialog title="信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" inline>
        <el-form-item label="班级编号">
          <el-input v-model="form.clCode" autocomplete="off" ref="clCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="form.clGrade" autocomplete="off" ref="clGrade"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.clName" autocomplete="off" ref="clName"></el-input>
        </el-form-item>
        <el-form-item label="系别/连队">
          <el-input v-model="form.diName" autocomplete="off" ref="diName"></el-input>
        </el-form-item>
        <el-form-item label="排名称">
          <el-input v-model="form.clRowName" autocomplete="off" ref="clRowName"></el-input>
        </el-form-item>
        <el-form-item label="辅导员">
          <el-input v-model="form.tcName" autocomplete="off" ref="tcName"></el-input>
        </el-form-item>
        <el-form-item label="教官">
          <el-input v-model="form.maName" autocomplete="off" ref="maName"></el-input>
        </el-form-item>
        <el-form-item label="剩余名额">
          <el-input v-model="form.clMaxCount" autocomplete="off" ref="clMaxCount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;InfoUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加表单 -->
    <el-dialog title="增加信息" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form" inline>
        <el-form-item label="班级编号">
          <el-input v-model="form.clCode" autocomplete="off" ref="clCodeAdd"></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="form.clGrade" autocomplete="off" ref="clGradeAdd"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.clName" autocomplete="off" ref="clNameAdd"></el-input>
        </el-form-item>
        <el-form-item label="系别/连队">
          <el-input v-model="form.diName" autocomplete="off" ref="diNameAdd"></el-input>
        </el-form-item>
        <el-form-item label="排名称">
          <el-input v-model="form.clRowName" autocomplete="off" ref="clRowNameAdd"></el-input>
        </el-form-item>
        <el-form-item label="辅导员">
          <el-input v-model="form.tcName" autocomplete="off" ref="tcNameAdd"></el-input>
        </el-form-item>
        <el-form-item label="教官">
          <el-input v-model="form.maName" autocomplete="off" ref="maNameAdd"></el-input>
        </el-form-item>
        <el-form-item label="剩余人数">
          <el-input v-model="form.clMaxCount" autocomplete="off" ref="clMaxCountAdd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="InfoAdd();dialogFormVisibleAdd = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 数据导出 -->
    <el-table :data="allListData" style="width: 100%" class="listTable" id="listTable">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="clCode" label="班级编号" align="center" width="100px"></el-table-column>
      <el-table-column prop="clGrade" label="年级" align="center" width="50px"></el-table-column>
      <el-table-column prop="clName" label="班级" align="center"></el-table-column>
      <el-table-column prop="diName" label="系别" align="center"></el-table-column>
      <el-table-column prop="clRowName" label="连排名称" align="center" width="90px"></el-table-column>
      <el-table-column prop="tcName" label="辅导员" align="center" width="90px"></el-table-column>
      <el-table-column prop="maName" label="教官" align="center" width="90px"></el-table-column>
      <el-table-column prop="clMaxCount" label="剩余名额" align="center" width="90px"></el-table-column>
    </el-table>
  </div>
  <!-- <el-button type="primary" @click="handleChange(scope.$index, scope.row)"></el-button> -->
</template>

<script>
import { Dialog } from "element-ui";
import FileSaver from "file-saver";
import XLSX from "xlsx";
// 节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
// import data from '../../../mock/mock.js'
export default {
  inject: ["reload"],
  data() {
    return {
      allListData: [],
      companyData: [],
      //   编辑表单
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,
      searchValue: "",
      form: {
        clCode: "",
        clGrade: "",
        clName: "",
        diName: "",
        clRowName: "",
        tcName: "",
        maName: "",
        clMaxCount: "",
        search_number: ""
      },
      // 分页
      count: "",
      page_size: 6,
      currentPage: 1
    };
  },
  created() {
    this.getList();
    this.allList();
  },
  watch: {
    //用来监听页面变量的改变
    //监听搜索，300ms执行一次fetchData方法（去搜索）
    searchValue() {
      delay(() => {
        this.getList();
      }, 300);
    }
  },
  methods: {
    allList() {
      this.$http.post("/api/user/allCompanyList").then(res => {
        this.allListData = res.data;
      });
    },
    outExe() {
      this.$confirm("是否导出连排信息表?", "提示", {
        confirmButtonText: "确定导出",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.exportExcel();
        })
        .catch(() => {});
    },
    exportExcel() {
      this.pagesize = "30"; //表格长度变长
      this.currentPage = "1";
      this.$nextTick(function() {
        let wb = XLSX.utils.table_to_book(document.querySelector("#listTable"));
        /* get binary string as output */
        let wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            "连排信息表.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        this.pagesize = "10"; //表格还原
        return wbout;
      });
    },
    // 获取学生列表
    getList() {
      var clName = this.searchValue;
      var val = 1;
      this.$http
        .post(
          "/api/user/companyList",
          {
            clName: clName,
            begin: val * 6 - 6,
            end: val * 6
          },
          {}
        )
        .then(res => {
          this.companyData = res.data;
          this.$http
            .post("/api/user/companyCount", { clName: clName })
            .then(res => {
              this.count = res.data;
            });
        });
    },
    // 为dialog表单赋值
    handleChange(index, row) {
      this.form.clCode = row.clCode;
      this.form.clGrade = row.clGrade;
      this.form.clName = row.clName;
      this.form.diName = row.diName;
      this.form.clRowName = row.clRowName;
      this.form.tcName = row.tcName;
      this.form.maName = row.maName;
      this.form.clMaxCount = row.clMaxCount;
    },
    // 信息修改
    InfoUpdate() {
      var clCode = this.$refs.clCode.value;
      const clGrade = this.$refs.clGrade.value;
      const clName = this.$refs.clName.value;
      const diName = this.$refs.diName.value;
      const clRowName = this.$refs.clRowName.value;
      const tcName = this.$refs.tcName.value;
      const maName = this.$refs.maName.value;
      const clMaxCount = this.$refs.clMaxCount.value;
      // 插入数据库，数据库返回的状态为result
      this.$http
        .post(
          "/api/user/companyUpdate",
          {
            clCode: clCode,
            clGrade: clGrade,
            clName: clName,
            diName: diName,
            clRowName: clRowName,
            tcName: tcName,
            maName: maName,
            clMaxCount: clMaxCount
          },
          {}
        )
        .then(res => {
          console.log(res);
          if (res) {
            this.$message({
              message: "修改成功",
              type: "info"
            });
            this.reload();
          } else {
            this.$message({
              message: "修改失败",
              type: "warning"
            });
          }
        });
    },
    // 增加学生信息
    InfoAdd() {
      const clCode = this.$refs.clCodeAdd.value;
      const clGrade = this.$refs.clGradeAdd.value;
      const clName = this.$refs.clNameAdd.value;
      const diName = this.$refs.diNameAdd.value;
      const clRowName = this.$refs.clRowNameAdd.value;
      const tcName = this.$refs.tcNameAdd.value;
      const maName = this.$refs.maNameAdd.value;
      const clMaxCount = this.$refs.clMaxCountAdd.value;
      // 插入数据库，数据库返回的状态为result
      this.$http
        .post("/api/user/companyAdd", {
          clCode: clCode,
          clGrade: clGrade,
          clName: clName,
          diName: diName,
          clRowName: clRowName,
          tcName: tcName,
          maName: maName,
          clMaxCount: clMaxCount
        })
        .then(res => {
          if (res.status) {
            this.$message({
              message: "增加成功",
              type: "success"
            });
            this.reload();
          } else {
            this.$message({
              message: "增加失败",
              type: "warning"
            });
          }
        });
    },
    // 信息删除
    handleDelete(index, row) {
      this.$confirm(
        "删除将不可恢复，是否确定删除" + row.clName + "的信息？",
        "删除提醒",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          // 在数据库中删除数据
          this.$http
            .post("/api/user/companyDel", { clCode: row.clCode })
            .then(res => {
              if (res.status) {
                this.$message({
                  message: "删除" + row.clName + "信息成功",
                  type: "success"
                });
                this.reload();
              } else {
                this.$message({
                  message: "删除" + row.clName + "信息失败",
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
          "/api/user/companyList",
          {
            number: number,
            begin: val * 6 - 6,
            end: val * 6 - 1
          },
          {}
        )
        .then(res => {
          this.companyData = res.data;
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
.company_stration {
  margin-top: 20px;
}
.companyAdd {
  position: absolute;
  right: 30px;
}
.listTable {
  position: relative;
  top: -20px;
}
/* 分页功能 */
.page {
  width: 400px;
  margin: 5px auto;
}
#listTable {
  display: none;
}
</style>


