<template>
  <div class="all-container">
    <div class="all-container-padding bg">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="infoBox">
        <el-tab-pane label="基本信息" name="first">
          <el-form :model="userlist" :rules="rules" ref="EditorUserForms">
            <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
              <el-col :span="20">
                <el-input v-model="userlist.username" disabled></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
              <el-col :span="20">
                <el-input v-model="userlist.phone" placeholder="请输入电话"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
              <el-col :span="20">
                <el-input v-model="userlist.email" placeholder="请输入邮箱"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="用户角色" prop="full_name" :label-width="formLabelWidth">
              <el-col :span="20">
                <el-input v-model="userlist.full_name" disabled></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple">
            <el-button
              type="primary"
              @click="EditorUserClick('userlist')"
              style="margin-left:150px;"
            >保存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="原密码" prop="pass" :label-width="formLabelWidth">
              <el-col :span="20">
                <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="新密码" prop="newpass" :label-width="formLabelWidth">
              <el-col :span="20">
                <el-input
                  v-model="ruleForm.newpass"
                  placeholder="请输入新密码"
                  id="newkey"
                  type="password"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="重复新密码" prop="checknewpass" :label-width="formLabelWidth">
              <el-col :span="20">
                <el-input
                  v-model="ruleForm.checknewpass"
                  placeholder="请再次输入新密码"
                  id="newkey1"
                  type="password"
                ></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="submitForm()">保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
//这些不要在意，这些是我们自定义的接口，用的时候就直接拿来了
// import {fetchAll,fetchByID,fetchList,postData,putData,deleteByID,deleteAllByID,guid,bytesToSize} from "@/api/dbhelper";
//这一步很重要，一般我们直接从后台拿过来输出来会是在data里面，但是我发现却在store里面，这里就要用到vuex
// import { mapGetters } from "vuex";
export default {
    inject: ["reload"],
  data() {
    /*****检验两次密码是否一致***/
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checknewpass !== "") {
          this.$refs.ruleForm.validateField("checknewpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {}, //修改密码的表单
      activeName: "first",
      loading: true,
      baseUrl: process.env.BASE_API,
      userlist: {
        username: "",
        phone: "",
        email: "",
        full_name: ""
      }, //用户信息表单
      formLabelWidth: "80px",
      /***校验***/
      rules: {
        phone: [
          {
            required: true,
            message: "请输入电话号码"
          },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: "手机格式不对"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入电子邮箱"
          },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
            message: "请输入有效的邮箱"
          }
        ],
        pass: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码"
          }
        ],
        newpass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checknewpass: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getUser();
  },
  //   computed: {
  //     ...mapGetters(["username"])
  //   },
  methods: {
    //获取个人用户的信息
    getUser() {
      this.$http
        .post("/api/user/login", {
          userName: sessionStorage.getItem("account")
        })
        .then(res => {
          this.userlist.username = res.data[0].userName;
          this.userlist.phone = res.data[0].userPhone;
          this.userlist.email = res.data[0].userEmail;
          this.userlist.full_name = res.data[0].userType;
        });
    },
    //tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //修改密码
    submitForm() {
       this.$http
        .post("/api/user/passUpdate", {
          userName: sessionStorage.getItem("account"),
          userPass: this.ruleForm.newpass
        })
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            })
            this.reload()
          } else {
            this.$message({
              message: "修改失败" + res.message,
              type: "error"
            });
          }
        });
    },
    // 编辑提交的方法
    EditorUserClick() {
      this.$refs.EditorUserForms.validate(valid => {
        if (valid) {
          this.$http
            .post("/api/user/userUpdate", {
              userName: this.userlist.username,
              userPhone: this.userlist.phone,
              userEmail: this.userlist.email
            })
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
                this.reload();
              } else {
                this.$message({
                  message: "修改失败" + res.message,
                  type: "error"
                });
              }
            });
        }
      });
    }
  }
};
</script>

<style>
.infoBox {
  background: rgb(243, 242, 242);
  width: 500px;
  margin: 0 auto;
  padding: 20px;
}
</style>
