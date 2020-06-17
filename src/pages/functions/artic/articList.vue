<template>
  <div class="upload_box">
    <div class="stuent">
      <el-upload action :auto-upload="false" :file-list="fileList" :on-change="student_upload">
        <el-button>上传学生信息表</el-button>
      </el-upload>
    </div>
    <div class="teacher">
      <el-upload action :auto-upload="false" :file-list="fileList" :on-change="teacher_upload">
        <el-button>上传导员信息表</el-button>
      </el-upload>
    </div>
    <div class="master">
      <el-upload action :auto-upload="false" :file-list="fileList" :on-change="master_upload">
        <el-button>上传教官信息表</el-button>
      </el-upload>
    </div>
    <div class="company">
      <el-upload action :auto-upload="false" :file-list="fileList" :on-change="company_upload">
        <el-button>上传连排信息</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "articList",
  // 数据导入
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    // 学生导入
    importSuccess(res) {
      // 后端的返回码--上传成功
      if (res == "success") {
        // 显示√图标
        let e = document.getElementsByClassName(
          "el-upload-list__item-status-label"
        );
        e[0].setAttribute("style", "display:block !important");
        // 成功提示
        this.$message.success("上传成功");
        // 后端的返回码--上传失败
      } else {
        // 隐藏√图标
        let e = document.getElementsByClassName(
          "el-upload-list__item-status-label"
        );
        e[0].setAttribute("style", "display:none !important");
        // 失败提示--及后端返回的失败详情
        this.$message.error({
          dangerouslyUseHTMLString: true,
          duration: 4500,
          message: res.remark + ",<br/>请删除上传失败的文件，修改后重新上传"
        });
      }
    },
    student_upload(file, fileList) {
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          console.log(workbook);
          if (workbook) {
            var res = "success";
            this.importSuccess(res);
          }
          //   循环excel里面的sheet表
          for (var i in workbook.SheetNames) {
            let sheet = Object.keys(workbook.Sheets)[i];
            const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); //获得以第一列为键名的sheet数组对象
            // 通过循环获取需要的数据
            for (var i in json) {
              var number = json[i].学号; //获取学生学号
              var name = json[i].姓名;
              var sex = json[i].性别;
              var college = json[i].学院;
              var class1 = json[i].班级;
              var phone = json[i].联系方式;
              var teacher = json[i].辅导员;
              // 插入数据库
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
                .then(res => {})
                .catch(function(res) {
                  console.log(res);
                });
            }
            console.log(json);
          }
        } catch (e) {
          console.log(e);
        }
      };
      fileReader.readAsBinaryString(file.raw);
    },
    teacher_upload(file, fileList) {
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          console.log(workbook);
          if (workbook) {
            var res = "success";
            this.importSuccess(res);
          }
          //   循环excel里面的sheet表
          for (var i in workbook.SheetNames) {
            let sheet = Object.keys(workbook.Sheets)[i];
            const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); //获得以第一列为键名的sheet数组对象
            // 通过循环获取需要的数据
            for (var i in json) {
              var tcNumber = json[i].工号; //获取学生学号
              var name = json[i].姓名;
              var college = json[i].所在学院;
              var major = json[i].所带专业;
              var class1 = json[i].所带班级;
              var phone = json[i].联系方式;
              var master = json[i].教官;
              // 插入数据库
              this.$http
                .post("/api/user/teaAdd", {
                  tcNumber: tcNumber,
                  name: name,
                  college: college,
                  major: major,
                  class: class1,
                  phone: phone,
                  master: master
                })
                .then(res => {})
                .catch(function(res) {});
            }
            console.log(json);
          }
        } catch (e) {
          console.log(e);
        }
      };
      fileReader.readAsBinaryString(file.raw);
    },
    master_upload(file, fileList) {
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          console.log(workbook);
          if (workbook) {
            var res = "success";
            this.importSuccess(res);
          }
          //   循环excel里面的sheet表
          for (var i in workbook.SheetNames) {
            let sheet = Object.keys(workbook.Sheets)[i];
            const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); //获得以第一列为键名的sheet数组对象
            // 通过循环获取需要的数据
            for (var i in json) {
              var number = json[i].代号; //获取学生学号
              var name = json[i].姓名;
              var college = json[i].所带学院;
              var major = json[i].所带专业;
              var class1 = json[i].所带班级;
              var phone = json[i].联系方式;
              var teacher = json[i].辅导员;
              // 插入数据库
              this.$http
                .post("/api/user/masterAdd", {
                  number: number,
                  name: name,
                  college: college,
                  major: major,
                  class: class1,
                  phone: phone,
                  teacher: teacher
                })
                .then(res => {})
                .catch(function(res) {});
            }
            console.log(json);
          }
        } catch (e) {
          console.log(e);
        }
      };
      fileReader.readAsBinaryString(file.raw);
    },
    company_upload(file, fileList) {
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          console.log(workbook);
          if (workbook) {
            var res = "success";
            this.importSuccess(res);
          }
          //   循环excel里面的sheet表
          for (var i in workbook.SheetNames) {
            let sheet = Object.keys(workbook.Sheets)[i];
            const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); //获得以第一列为键名的sheet数组对象
            // 通过循环获取需要的数据
            for (var i in json) {
              var clCode = json[i].班级编号; //获取学生学号
              var clGrade = json[i].年级;
              var clName = json[i].班级;
              var diName = json[i].系别;
              var clRowName = json[i].连排名称;
              var tcName = json[i].辅导员;
              var maName = json[i].教官;
              var clMaxCount = json[i].剩余名额;
              // 插入数据库
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
                .then(res => {})
                .catch(function(res) {});
            }
            console.log(json);
          }
        } catch (e) {
          console.log(e);
        }
      };
      fileReader.readAsBinaryString(file.raw);
    }
  }
};
</script>

<style scoped>
</style>
