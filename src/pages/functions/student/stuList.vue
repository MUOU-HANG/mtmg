<template>
  <div class="block">
    <el-header class="stu_stration">
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
    <el-table :data="stuData" style="width: 100%" class="listTable">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="number" label="学号" align="center" width="100px" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="70px"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="50px"></el-table-column>
      <el-table-column prop="college" label="学院" align="center"></el-table-column>
      <el-table-column prop="class" label="班级" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center" width="110px"></el-table-column>
      <el-table-column prop="teacher" label="辅导员" align="center" width="80px"></el-table-column>
      <el-table-column prop="train" label="是否军训" align="center" width="50px"></el-table-column>
      <el-table-column prop="reason" label="备注" align="center" width="120px"></el-table-column>
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
        <el-form-item label="学生学院">
          <el-select
            v-model.trim="form.college"
            placeholder="请选择学院"
            filterable
            @change="getClass()"
            style="width:200px;"
          >
            <el-option
              v-for="item in collegeData"
              :key="item.value"
              :label="item.college"
              :value="item.college"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生班级">
          <el-select v-model.trim="form.class" filterable>
            <el-option
              v-for="item in classData"
              :key="item.value"
              :label="item.class"
              :value="item.class"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline>
        <el-form-item label="学生性别">
          <el-radio-group v-model="form.sex" style="width:205px">
            <ElRadio label="男"></ElRadio>
            <ElRadio label="女"></ElRadio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" autocomplete="off" ref="phone"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" inline>
        <el-form-item label="学生辅导员">
          <el-input v-model="form.teacher" autocomplete="off" ref="teacher"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;InfoUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加表单 -->
    <el-dialog title="增加信息" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="formAdd" inline :rules="rules" ref="formAdd">
        <el-form-item label="学生学号" prop="numberAdd">
          <el-input v-model="form.numberAdd" autocomplete="off" ref="numberAdd"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="nameAdd">
          <el-input v-model="form.nameAdd" autocomplete="off" ref="nameAdd"></el-input>
        </el-form-item>
        <el-form-item label="学生学院" prop="collegeAdd">
          <el-select
            v-model.trim="form.collegeAdd"
            placeholder="请选择学院"
            filterable
            @change="getMajor()"
            style="width:200px;"
          >
            <el-option
              v-for="item in collegeData"
              :key="item.value"
              :label="item.college"
              :value="item.college"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生专业" prop="classAdd">
          <el-select v-model.trim="form.majorAdd" filterable @change="getClass()">
            <el-option
              v-for="item in majorData"
              :key="item.value"
              :label="item.major"
              :value="item.major"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生班级" prop="classAdd">
          <el-select v-model.trim="form.classAdd" filterable @change="getClass()">
            <el-option
              v-for="item in classData"
              :key="item.value"
              :label="item.class"
              :value="item.class"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生性别" prop="sexAdd">
          <el-radio-group v-model="form.sexAdd" style="width:205px">
            <ElRadio label="男"></ElRadio>
            <ElRadio label="女"></ElRadio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneAdd">
          <el-input v-model="form.phoneAdd" autocomplete="off" ref="phoneAdd"></el-input>
        </el-form-item>
        <el-form-item label="学生辅导员" prop="teacherAdd">
          <el-input v-model="form.teacherAdd" autocomplete="off" ref="teacherAdd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="InfoAdd('formAdd')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 数据导出 -->
    <el-table :data="allListData" style="width: 100%" class="listTable" id="listTable">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="number" label="学号" align="center" width="100px" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="100px"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="80px"></el-table-column>
      <el-table-column prop="college" label="学院" align="center"></el-table-column>
      <el-table-column prop="class" label="班级" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center" width="110px"></el-table-column>
      <el-table-column prop="teacher" label="辅导员" align="center" width="80px"></el-table-column>
      <el-table-column prop="cloths" label="军训服" align="center" width="80px"></el-table-column>
      <el-table-column prop="shoes" label="军训鞋" align="center" width="80px"></el-table-column>
      <el-table-column prop="train" label="是否军训" align="center" width="50px"></el-table-column>
      <el-table-column prop="reason" label="备注" align="center" width="120px"></el-table-column>
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
      stuData: [],
      classData: [],
      majorData:[],
      collegeData: [],
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
        sex: "",
        class: "",
        phone: "",
        teacher: "",
        search_number: ""
      },
      formAdd: {
        numberAdd: "",
        nameAdd: "",
        collegeAdd: "",
        sexAdd: "",
        classAdd: "",
        phoneAdd: "",
        teacherAdd: "",
        search_number: ""
      },
      // 分页
      count: 1,
      page_size: 6,
      currentPage: 1,
      // 验证规则
        rules: {
          numberAdd: [
            { required: true, message: "请输入学生学号", trigger: "blur" },
            { min: 9, max: 10, message: "请输入完整学号", trigger: "blur" }
          ],
          nameAdd: [{ required: true, message: "请输入名字", trigger: "blur" }],
          sexAdd: [{ required: true, message: "请选择性别", trigger: "blur" }],
          collegeAdd: [
            { required: true, message: "请输入学院", trigger: "blur" }
          ],
          classAdd: [{ required: true, message: "请输入班级", trigger: "blur" }],
          teacherAdd: [
            { required: true, message: "请输入教师姓名", trigger: "blur" }
          ],
          phoneAdd: [{ required: true, message: "请输入手机号", trigger: "blur" }]
        }
    };
  },
  created() {
    this.getList();
    this.getCollege();
    this.allList();
  },
  watch: {
    //用来监听页面变量的改变
    //监听搜索，300ms执行一次fetchData方法（去搜索）
    searchValue() {
      delay(() => {
        this.getList();
        this.getClass();
        this.getMajor();
      }, 300);
    }
  },
  methods: {
    // 数据导出
    // 获取所有学生数据
    allList() {
      this.$http.post("/api/user/allStuList").then(res => {
        this.allListData = res.data;
        console.log(res.data);
      });
    },
    outExe() {
      this.$confirm("是否导出学生信息表?", "提示", {
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
          "/api/user/stuList",
          {
            number: number,
            begin: val * 6 - 6,
            end: val * 6
          },
          {}
        )
        .then(res => {
          this.stuData = res.data;
        });
      this.$http.post("/api/user/count", { number: number }).then(res => {
        this.count = res.data;
      });
    },
    // 为dialog表单赋值
    handleChange(index, row) {
      this.form.number = row.number;
      this.form.name = row.name;
      this.form.college = row.college;
      this.form.sex = row.sex;
      this.form.class = row.class;
      this.form.phone = row.phone;
      this.form.teacher = row.teacher;
    },
    // 信息修改
    InfoUpdate() {
      var number = this.form.number;
      const name = this.form.name;
      const college = this.form.college;
      const sex = this.form.sex;
      const class1 = this.form.class;
      const phone = this.form.phone;
      const teacher = this.form.teacher;
      const reason = '无'
      // 插入数据库，数据库返回的状态为result
      this.$http.post('api/user/stuList',{
            number: number,
            begin: 0,
            end: 6
          },).then(res =>{
            var cloths=res.data[0].cloths
            var shoes = res.data[0].shoes
            var reason = res.data[0].reason
            this.$http
        .post(
          "/api/user/stuUpdate",
          {
            number: number,
            name: name,
            college: college,
            sex: sex,
            class: class1,
            phone: phone,
            teacher: teacher,
            cloths:cloths,
            shoes: shoes,
            reason:reason
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
          })
    },
    // 增加学生信息
    InfoAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const number = this.form.numberAdd;
          const name = this.form.nameAdd;
          const college = this.form.collegeAdd;
          const sex = this.form.sexAdd;
          const class1 = this.form.classAdd;
          const phone = this.form.phoneAdd;
          const teacher = this.form.teacherAdd;
          // 插入数据库，数据库返回的状态为result
          this.$http
            .post("/api/user/stuAdd", {
              number: number,
              name: name,
              college: college,
              sex: sex,
              class: class1,
              phone: phone,
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
          this.dialogFormVisibleAdd = false;
        } else {
          console.log("error submit!!");
          return false;
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
            .post("/api/user/stuDel", { number: row.number })
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
          "/api/user/stuList",
          {
            number: number,
            begin: val * 6 - 6,
            end: 6
          },
          {}
        )
        .then(res => {
          this.stuData = res.data;
        });
    },
    // 获取学院信息
    getCollege() {
      this.$http.post("/api/user/getCollege").then(res => {
        this.collegeData = res.data;
      });
    },
    // 获取专业信息
    getMajor() {
      var college = this.form.collegeAdd
      this.$http.post("/api/user/getMajor",{college:college}).then(res => {
        this.majorData = res.data;
      });
    },
    // 获取班级信息
    getClass() {
      var major = this.form.majorAdd;
      this.$http.post("/api/user/getClass", { major: major }).then(res => {
        this.classData = res.data;
      });
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
#listTable {
  display: none;
}
</style>


