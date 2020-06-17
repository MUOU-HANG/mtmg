<template>
  <div class="diaryBox" style="width:600px;">
    <el-form :model="form" class="formStyle" :rules="rules" ref="form">
      <el-form-item label="标题" :label-width="formLabelWidth" style="width:300px;" prop="diaryTitle">
        <el-input v-model="form.diaryTitle" placeholder="请输入日记标题"></el-input>
      </el-form-item>
      <el-form-item
        label="学号"
        class="formItem"
        :label-width="formLabelWidth"
        style="width:300px;"
        prop="diaryNumber"
      >
        <el-input v-model="form.diaryNumber" placeholder="请输入学号"></el-input>
      </el-form-item>
      <el-form-item
        label="作者"
        class="formItem"
        :label-width="formLabelWidth"
        style="width:300px;"
        prop="diaryAuthor"
      >
        <el-input v-model="form.diaryAuthor" placeholder="请输入日记作者"></el-input>
      </el-form-item>
      <el-form-item label="内容" :label-width="formLabelWidth" prop="diaryContent">
        <el-input
          type="textarea"
          :rows="7"
          v-model="form.diaryContent"
          placeholder="请输入日记内容"
          style="width:450px;"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="撰写日期"
        class="formItem"
        :label-width="formLabelWidth"
        style="width:300px;"
      >
        <h4>{{diaryDate}}</h4>
      </el-form-item>
    </el-form>
    <el-button type="danger" @click="submitForm('form')" class="backBtn">上传</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        diaryTitle: "",
        diaryNumber: "",
        diaryAuthor: "",
        diaryContent: "",
        diaryDate: ""
      },
      formLabelWidth: "70px",
      rules: {
        diaryTitle: [
          { required: true, message: "请输入日记标题", trigger: "blur" }
        ],
        diaryNumber: [
          { required: true, message: "请输入学号", trigger: "blur" }
        ],
        diaryAuthor: [
          { required: true, message: "请输入日记作者", trigger: "blur" }
        ],
        diaryContent: [
          { required: true, message: "请输入日记内容", trigger: "blur" },
          { min: 100, message: "日记内容不得低于100字", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    this.nowDate();
  },
  methods: {
    nowDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      this.diaryDate = currentdate;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 获取表单内容
          var diaryTitle = this.form.diaryTitle;
          var diaryNumber = this.form.diaryNumber;
          var diaryAuthor = this.form.diaryAuthor;
          var diaryContent = this.form.diaryContent;
          var diaryDate = this.diaryDate;
          console.log(diaryDate)
          this.$http
            .post(
              "/api/user/diaryAdd",
              {
                diaryTitle: diaryTitle,
                diaryNumber: diaryNumber,
                diaryAuthor: diaryAuthor,
                diaryContent: diaryContent,
                diaryDate: diaryDate
              },
              {}
            )
            .then(res => {
              if (res) {
                this.$message({
                  message: "上传成功！",
                  type: "info"
                });
              }else{
                this.$message({
                  message: "上传失败！",
                  type: "warning"
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
.diaryBox {
  text-align: center;
  margin: 100px auto;
  padding: 40px;
  background: rgba(240, 240, 240, 0.87);
}
</style>
