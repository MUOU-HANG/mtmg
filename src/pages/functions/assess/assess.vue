<template>
  <div class="block">
    <el-header class="assess_stration">
      <el-form :model="form" inline>
        <ElFormItem label="输入学生学号：">
          <el-input
            v-model.trim="searchValue"
            placeholder="请输入学生学号"
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
          class="assessAdd"
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
    <el-table :data="assessData" style="width: 100%;margin-top:10px; " class="listTable" border >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="number" label="学号" align="center" width="100px" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="100px"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="80px"></el-table-column>
      <el-table-column prop="teacher" label="辅导员" align="center" width="120px"></el-table-column>
      <el-table-column prop="train" label="队列训练" align="center"></el-table-column>
      <el-table-column prop="interior" label="内务卫生" align="center"></el-table-column>
      <el-table-column prop="assess" label="结业总评" align="center" width="110px"></el-table-column>
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
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" inline>
        <el-form-item label="学生学号">
          <el-input v-model="form.number" autocomplete="off" disabled ref="number"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="form.name" autocomplete="off" ref="name"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline>
        <el-form-item label="学生性别">
          <el-radio-group v-model="form.sex" style="width:200px">
            <ElRadio label="男"></ElRadio>
            <ElRadio label="女"></ElRadio>
          </el-radio-group>
          <!-- <el-input v-model="form.sex" autocomplete="off" ref="sex"></el-input> -->
        </el-form-item>
       <el-form-item label="学生导员">
          <el-input v-model="form.teacher" autocomplete="off" ref="teacher"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline>
        <el-form-item label="队列训练">
          <el-input v-model="form.train" autocomplete="off" ref="train"></el-input>
        </el-form-item>
        <el-form-item label="内务卫生">
          <el-input v-model="form.interior" autocomplete="off" ref="interior"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline>
        <el-form-item label="结业总评">
          <el-input v-model="form.assess" autocomplete="off" ref="assess"></el-input>
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
        <el-form-item label="学生学号">
          <el-input v-model="form.numberAdd" autocomplete="off" ref="numberAdd"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="form.nameAdd" autocomplete="off" ref="nameAdd"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline>
        <el-form-item label="学生性别">
          <el-radio-group v-model="form.sexAdd" style="width:205px">
            <ElRadio label="男"></ElRadio>
            <ElRadio label="女"></ElRadio>
          </el-radio-group>
          <!-- <el-input v-model="form.sexAdd" autocomplete="off" ref="sexAdd"></el-input> -->
        </el-form-item>
        <el-form-item label="学生导员">
          <el-input v-model="form.teacherAdd" autocomplete="off" ref="teacherAdd"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline>
        <el-form-item label="队列训练">
          <el-input v-model="form.trainAdd" autocomplete="off" ref="trainAdd"></el-input>
        </el-form-item>
        <el-form-item label="内务卫生">
          <el-input v-model="form.interiorAdd" autocomplete="off" ref="interiorAdd"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline>
        <el-form-item label="结业总评">
          <el-input v-model="form.assessAdd" autocomplete="off" ref="assessAdd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="InfoAdd();dialogFormVisibleAdd = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 数据导出 -->
    <el-table
      :data="allListData"
      style="width: 100%"
      class="listTable"
      id="listTable"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="number" label="学号" align="center" width="100px" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="100px"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="80px"></el-table-column>
      <el-table-column prop="teacher" label="辅导员" align="center" width="80px"></el-table-column>
      <el-table-column prop="train" label="队列训练" align="center"></el-table-column>
      <el-table-column prop="interior" label="内务卫生" align="center"></el-table-column>
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
      // 数据导出
      allListData: [],
      assessData: [],
      interiorata: [],
      selectedOptions: [],
      //   编辑表单
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,
      searchValue: "",
      form: {
        number: "",
        name: "",
        train: "",
        sex: "",
        interior: "",
        assess: "",
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
    // this.getassessCount();
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
    // 获取所有学生数据
    allList() {
      this.$http.post("/api/user/allAssessList").then(res => {
        this.allListData = res.data;
        console.log(res.data);
      });
    },
    outExe() {
      this.$confirm("是否导出结业总评表?", "提示", {
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
            "学生信息表.xlsx"
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
          "/api/user/assessList",
          {
            number: number,
            begin: val * 6 - 6,
            end: val * 6
          },
          {}
        )
        .then(res => {
          this.assessData = res.data;
        });
        this.$http.post("/api/user/assessCount",{number: number}).then(res => {
        this.count = res.data;
      });
    },
    // 为dialog表单赋值
    handleChange(index, row) {
      this.form.number = row.number;
      this.form.name = row.name;
      this.form.train = row.train;
      this.form.sex = row.sex;
      this.form.interior = row.interior;
      this.form.assess = row.assess;
      this.form.teacher = row.teacher;
    },
    // 信息修改
    InfoUpdate() {
      var number = this.form.number;
      const name = this.form.name;
      const train = this.form.train;
      const sex = this.form.sex;
      const interior = this.form.interior;
      const assess = this.form.assess;
      const teacher = this.form.teacher;
      // 插入数据库，数据库返回的状态为result
      this.$http
        .post(
          "/api/user/assessUpdate",
          {
            number: number,
            name: name,
            train: train,
            sex: sex,
            interior: interior,
            assess: assess,
            teacher: teacher,
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
      const number = this.form.numberAdd;
      const name = this.form.nameAdd;
      const train = this.form.trainAdd;
      const sex = this.form.sexAdd;
      const interior = this.form.interiorAdd;
      const assess = this.form.assessAdd;
      const teacher = this.form.teacherAdd;
      // 插入数据库，数据库返回的状态为result
      this.$http
        .post("/api/user/assessAdd", {
          number: number,
          name: name,
          train: train,
          sex: sex,
          interior: interior,
          assess: assess,
          teacher: teacher
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
        "删除将不可恢复，是否确定删除" + row.name + "的信息？",
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
            .post("/api/user/assessDel", { number: row.number })
            .then(res => {
              if (res.status) {
                this.$message({
                  message: "删除" + row.name + "信息成功",
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
          "/api/user/assessList",
          {
            number: number,
            begin: val * 6 - 6,
            end:  6
          },
          {}
        )
        .then(res => {
          this.assessData = res.data
        });
    },
  }
};
</script>

<style>
.block {
  margin-left: 10px;
}
.assess_stration {
  margin-top: 20px;
}
.assessAdd {
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
#listTable{
  display: none
}
</style>


