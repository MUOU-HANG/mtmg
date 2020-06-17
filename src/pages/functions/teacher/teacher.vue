<template>
  <div class="block">
    <el-header class="stu_stration">
      <el-form :model="form" inline>
        <ElFormItem label="输入教师学号：">
          <el-input
            v-model.trim="searchValue"
            placeholder="输入教师学号"
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
          class="stuAdd"
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
    <el-table :data="teaData" style="width: 100%" class="listTable">
      <el-table-column prop="number" label="工号" align="center" width="100px"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="100px"></el-table-column>
      <el-table-column prop="college" label="所在学院" align="center"></el-table-column>
      <el-table-column prop="major" label="所带专业" align="center"></el-table-column>
      <el-table-column prop="class" label="所带班级" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center" width="110px"></el-table-column>
      <el-table-column prop="master" label="教官" align="center" width="80px"></el-table-column>
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
        <el-form-item label="教师工号">
          <el-input v-model="form.number" disabled autocomplete="off" ref="number"></el-input>
        </el-form-item>
        <el-form-item label="教师姓名">
          <el-input v-model="form.name" autocomplete="off" ref="name"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline>
        <el-form-item label="所在学院">
          <el-input v-model="form.college" autocomplete="off" ref="college"></el-input>
        </el-form-item>
        <el-form-item label="所带专业">
          <el-input v-model="form.major" autocomplete="off" ref="major"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline>
        <el-form-item label="所带班级">
          <el-input v-model="form.class" autocomplete="off" ref="class"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" autocomplete="off" ref="phone"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline>
        <el-form-item label="方阵教官">
          <el-input v-model="form.master" autocomplete="off" ref="master"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;InfoUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加表单 -->
    <el-dialog title="增加信息" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form" inline class="formStyle">
        <el-form-item label="教师工号">
          <el-input v-model="form.numberAdd" autocomplete="off" ref="numberAdd"></el-input>
        </el-form-item>
        <el-form-item label="教师姓名" class="formItem">
          <el-input v-model="form.nameAdd" autocomplete="off" ref="nameAdd"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline class="formStyle">
        <el-form-item label="所在学院">
          <el-input v-model="form.collegeAdd" autocomplete="off" ref="collegeAdd"></el-input>
        </el-form-item>
        <el-form-item label="所带专业" class="formItem">
          <el-input v-model="form.majorAdd" autocomplete="off" ref="majorAdd"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline class="formStyle">
        <el-form-item label="所带班级">
          <el-input v-model="form.classAdd" autocomplete="off" ref="classAdd"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" class="formItem">
          <el-input v-model="form.phoneAdd" autocomplete="off" ref="phoneAdd"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline class="formStyle">
        <el-form-item label="方阵教官" class="formItemLast">
          <el-input v-model="form.masterAdd" autocomplete="off" ref="masterAdd"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="InfoAdd();dialogFormVisibleAdd = false">添加</el-button>
      <el-button type="danger" @click="dialogFormVisibleAdd = false">取消</el-button>
    </el-dialog>
    <!-- 数据导出 -->
    <el-table :data="allListData" style="width: 100%" class="listTable" id="listTable">
      <el-table-column prop="number" label="工号" align="center" width="100px"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="100px"></el-table-column>
      <el-table-column prop="college" label="所在学院" align="center"></el-table-column>
      <el-table-column prop="major" label="所带专业" align="center"></el-table-column>
      <el-table-column prop="class" label="所带班级" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center" width="110px"></el-table-column>
      <el-table-column prop="master" label="教官" align="center" width="80px"></el-table-column>
    </el-table>
  </div>
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
      teaData: [],
      selectedOptions: [],
      //   编辑表单
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,
      searchValue: "",
      form: {
        number: "",
        name: "",
        college: "",
        major: "",
        class: "",
        phone: "",
        teacher: "",
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
    // 数据导出
     allList() {
      this.$http.post("/api/user/allTeaList").then(res => {
        this.allListData = res.data;
      });
    },
    outExe() {
      this.$confirm("是否导出辅导员信息表?", "提示", {
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
            "辅导员信息表.xlsx"
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
      var number = this.searchValue;
      var val = 1;
      this.$http
        .post(
          "/api/user/teaList",
          {
            number: number,
            begin: val * 6 - 6,
            end: val * 6
          },
          {}
        )
        .then(res => {
          this.teaData = res.data;
          this.$http
            .post("/api/user/teaCount", { number: number })
            .then(res => {
              this.count = res.data;
            });
        });
    },
    // 为dialog表单赋值
    handleChange(index, row) {
      this.form.number = row.number;
      this.form.name = row.name;
      this.form.college = row.college;
      this.form.major = row.major;
      this.form.class = row.class;
      this.form.phone = row.phone;
      this.form.master = row.master;
    },
    // 信息修改
    InfoUpdate() {
      var number = this.$refs.number.value;
      const name = this.$refs.name.value;
      const college = this.$refs.college.value;
      const major = this.$refs.major.value;
      const class1 = this.$refs.class.value;
      const phone = this.$refs.phone.value;
      const master = this.$refs.master.value;
      // 插入数据库，数据库返回的状态为result
      this.$http
        .post(
          "/api/user/teaUpdate",
          {
            number: number,
            name: name,
            college: college,
            major: major,
            class: class1,
            phone: phone,
            master: master
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
    // 增加教师信息
    InfoAdd() {
      const number = this.$refs.numberAdd.value;
      const name = this.$refs.nameAdd.value;
      const college = this.$refs.collegeAdd.value;
      const major = this.$refs.majorAdd.value;
      const class1 = this.$refs.classAdd.value;
      const phone = this.$refs.phoneAdd.value;
      const master = this.$refs.masterAdd.value;
      // 插入数据库，数据库返回的状态为result
      this.$http
        .post("/api/user/teaAdd", {
          number: number,
          name: name,
          college: college,
          major: major,
          class: class1,
          phone: phone,
          master: master
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
        "删除将不可恢复，是否确定删除工号" + row.number + "的所有信息？",
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
            .post("/api/user/teaDel", { number: row.number })
            .then(res => {
              if (res.status) {
                this.$message({
                  message: "删除工号" + row.number + "成功",
                  type: "success"
                });
                this.reload();
              } else {
                this.$message({
                  message: "删除" + row.name + "信息失败",
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
.stuAdd {
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
/* 数据导出 */
#listTable {
  display: none;
}
</style>
