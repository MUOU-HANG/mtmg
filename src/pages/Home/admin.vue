<template>
  <div class="block">
    <el-header class="admin_stration">
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
          class="adminAdd"
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
    <el-table :data="adminData" style="width: 100%" class="listTable">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="userId" label="工号" align="center" width="100px" sortable></el-table-column>
      <el-table-column prop="userName" label="姓名" align="center" width="100px"></el-table-column>
      <el-table-column prop="userPass" label="密码" align="center" width="150px"></el-table-column>
      <el-table-column prop="userPhone" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="userEmail" label="电子邮箱" align="center"></el-table-column>
      <el-table-column prop="userType" label="账号类型" align="center" width="110px"></el-table-column>
      <el-table-column prop="status" label="权限" align="center" width="150px">
        <template slot-scope="scope">
          <el-switch
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="0"
            v-model="scope.row.status"
            @change="statusChange(scope.$index,scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
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
        <el-form-item label="用户工号" prop="userId">
          <el-input v-model="form.userId" autocomplete="off" disabled ref="userId"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="useruserName">
          <el-input v-model="form.userName" autocomplete="off" ref="userName"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="userPass">
          <el-input v-model="form.userPass" autocomplete="off" ref="userPass"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="userPhone">
          <el-input v-model="form.userPhone" autocomplete="off" ref="phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="userEmail">
          <el-input v-model="form.userEmail" autocomplete="off" ref="status"></el-input>
        </el-form-item>
        <el-form-item label="账号类型" prop="userType">
          <el-select v-model="form.userType" >
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;InfoUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加表单 -->
    <el-dialog title="增加信息" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form" inline :rules="rules" ref="formAdd">
        <el-form-item label="用户工号" prop="userIdAdd">
          <el-input v-model="form.userIdAdd"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="userNameAdd">
          <el-input v-model="form.userNameAdd"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="userPassAdd">
          <el-input v-model="form.userPassAdd"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="userPhoneAdd">
          <el-input v-model="form.userPhoneAdd"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="userEmailAdd">
          <el-input v-model="form.userEmailAdd"></el-input>
        </el-form-item>
        <el-form-item label="账号类型" prop="userTypeAdd">
          <el-select v-model="form.userTypeAdd">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
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
      <el-table-column prop="userId" label="工号" align="center" width="100px" sortable></el-table-column>
      <el-table-column prop="userName" label="姓名" align="center" width="70px"></el-table-column>
      <el-table-column prop="userPass" label="密码" align="center" width="50px"></el-table-column>
      <el-table-column prop="userPhone" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="userEmail" label="电子邮箱" align="center"></el-table-column>
      <el-table-column prop="userType" label="账号类型" align="center" width="110px"></el-table-column>
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
      adminData: [],
      userEmailData: [],
      selectedOptions: [],
      //   编辑表单
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,
      searchValue: "",
      form: {
        userId: "",
        useruserName: "",
        userPass: "",
        userPhone: "",
        userEmail: "",
        status: ""
      },
      // 分页
      count: "",
      page_size: 6,
      currentPage: 1,
      status: 1,
      // 表单验证
      rules: {
        userIdAdd: [
          { required: true, message: "请输入工号", trigger: "blur" },
          { min: 5, max: 5, message: "请输入完整工号", trigger: "blur" }
        ],
        userNameAdd: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        userPassAdd: [{ required: true, message: "请输入密码",trigger: "blur" }],
        userPhoneAdd: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        userEmailAdd: [
          {
            type: "email",
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
    // this.getadminCount();
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
      this.$http.post("/api/user/alladminList").then(res => {
        this.allListData = res.data;
      });
    },
    outExe() {
      this.$confirm("是否导出管理信息表?", "提示", {
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
      var userId = this.searchValue;
      var val = 1;
      this.$http
        .post(
          "/api/user/adminList",
          {
            userId: userId,
            begin: val * 6 - 6,
            end: val * 6
          },
          {}
        )
        .then(res => {
          this.adminData = res.data;
        });
      this.$http.post("/api/user/adminCount", { userId: userId }).then(res => {
        this.count = res.data;
      });
    },
    statusChange(index, row) {
      if(row.userType==="超级管理员"){
        this.$message({
          message: '请勿对超级管理员进行权限操作!',
          type: 'warning'
        });
        row.status='1'
        this.reload();
      }
      var userId = row.userId;
      var status = row.status;
      this.$http
        .post("/api/user/statusUpdate", { userId: userId, status: status })
        .then(res => {
          console.log(res);
        });
    },
    // 为dialog表单赋值
    handleChange(index, row) {
      this.form.userId = row.userId;
      this.form.userName = row.userName;
      this.form.userPass = row.userPass;
      this.form.userPhone = row.userPhone;
      this.form.userEmail = row.userEmail;
      if (row.status == "1") {
        this.form.userType = "超级管理员";
      } else {
        this.form.userType = "普通管理员";
      }
    },
    // 信息修改
    InfoUpdate() {
      var userId = this.form.userId;
      const userName = this.form.userName;
      const userPass = this.form.userPass;
      const userPhone = this.form.userPhone;
      const userEmail = this.form.userEmail;
      const userType = this.form.userType;
      // 插入数据库，数据库返回的状态为result
      this.$http
        .post(
          "/api/user/adminUpdate",
          {
            userId: userId,
            userName: userName,
            userPass: userPass,
            userPhone: userPhone,
            userEmail: userEmail,
            userType: userType
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
    InfoAdd(formName) {
       this.$refs[formName].validate(valid => {
        if (valid) {
      const userId = this.form.userIdAdd;
      const userName = this.form.userNameAdd;
      const userPass = this.form.userPassAdd;
      const userPhone = this.form.userPhoneAdd;
      const userEmail = this.form.userEmailAdd;
      const userType = this.form.userTypeAdd;
      const status = 1;
      // 插入数据库，数据库返回的状态为result
          this.$http
            .post("/api/user/adminAdd", {
              userId: userId,
              userName: userName,
              userPass: userPass,
              userPhone: userPhone,
              userEmail: userEmail,
              userType: userType,
              status: status
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
            this.dialogFormVisibleAdd = false
        }

      });
    },
    // 信息删除
    handleDelete(index, row) {
      this.$confirm(
        "删除将不可恢复，是否确定删除" + row.userName + "的信息？",
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
            .post("/api/user/adminDel", { userId: row.userId })
            .then(res => {
              if (res.status) {
                this.$message({
                  message: "删除" + row.userName + "信息成功",
                  type: "success"
                });
                this.reload();
              } else {
                this.$message({
                  message: "删除" + row.userName + "信息失败",
                  type: "warning"
                });
              }
            });
        })
        .catch(() => {});
    },
    // 分页
    handleCurrentChange(val) {
      const userId = this.$refs.search.value;
      this.$http
        .post(
          "/api/user/adminList",
          {
            userId: userId,
            begin: val * 6 - 6,
            end: 6
          },
          {}
        )
        .then(res => {
          this.adminData = res.data;
        });
    }
  }
};
</script>

<style>
.block {
  margin-left: 10px;
}
.admin_stration {
  margin-top: 20px;
}
.adminAdd {
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
.statusTrue {
  background: #5b7bfa;
  color: white;
}
.statusTrue:hover {
  background: #5b7bfa;
  color: white;
}
</style>


