<template>
  <div class="page">
    <div class="login-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="0px"
        class="login-ruleForm login-container"
        status-icon
      >
        <h3 class="title">学生登录</h3>
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="ruleForm.account"
            auto-complete="off"
            placeholder="账号"
            id="loginEmail"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            auto-complete="off"
            placeholder="密码"
            id="loginPassword"
          ></el-input>
          <label id="showPasswordToggle">
            <el-checkbox v-model="checked" id="showPasswordCheck">显示密码</el-checkbox>
          </label>
          <router-link to="/" style="float: right; color: #bbbbbb">忘记密码？</router-link>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleSearch('ruleForm')"
            :loading="logining"
          >登录</el-button>
        </el-form-item>
        <el-form-item style="width:100%;">
          <router-link to="/register">
            <el-button style="width:100%;">注册</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import sha256 from 'crypto-js/sha256'
// import {requestLogin} from '@/api/user'

export default {
  name: "app-login",
  data() {
    return {
      logining: false,
      fromUrl: "/index",
      ruleForm: {
        account: "201438039",
        checkPass: "053918"
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  methods: {
    handleSearch(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var number = this.ruleForm.account
          var password = this.ruleForm.checkPass
          console.log(password)
         this.$http
            .post("/api/user/stuList", { number: number, begin: 0, end: 500 })
            .then(res => {
              console.log(res)
              if (res.data[0].password != password) {
                this.$message({
                  message: "密码错误，请重新输入！",
                  type: "warning"
                });
              }else if (res.data.length > 1) {
                this.$message({
                  message: "请输入完整的学号",
                  type: "warning"
                });
              } else if (res.data.length == 0) {
                this.$message({
                  message: "没有该生信息，请联系辅导员",
                  type: "warning"
                });
              } else{
                setTimeout(() => {
                this.$router.replace("/frontHome");
              }, 100)
              sessionStorage.setItem('account',this.ruleForm.account)
              }
            })
        }
      });
    },
    
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 15px;
}

.page {
  background-color: #eff3f4;
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  margin: 0;
  padding: 2.25em;
  box-sizing: border-box;
  border: solid 1px #ddd;
  border-radius: 0.5em;
  font-family: "Source Sans Pro", sans-serif;
}
</style>
