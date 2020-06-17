<template>
  <div id="app">
    <el-header>
      <p class="welcome">浙江水利水电学院欢迎你</p>
    </el-header>
    <el-row>
      <ElCol :span="16">
        <div class="card">
          <div class="card-header">
            <span class="el-icon-upload" style="margin-right:10px"></span>快速导入
          </div>
          <div class="card-body">
            <ul>
              <el-col :span="6">
                <li class="icon">
                  <div class="stuent">
                    <el-upload
                      action
                      :auto-upload="false"
                      :on-change="student_upload"
                    >
                      <!-- <img src="../../assets/user.jpg"> -->
                      <el-button type="primary" round style="height:40px;" icon="el-icon-upload2">导入学生信息</el-button>
                    </el-upload>
                  </div>
                </li>
              </el-col>
              <el-col :span="6">
                <li class="icon">
                  <div class="teacher">
                    <el-upload
                      action
                      :auto-upload="false"
                      :on-change="teacher_upload"
                    >
                      <!-- <img src="../../assets/user.jpg"> -->
                      <el-button type="primary" round icon="el-icon-upload2">导入导员信息</el-button>
                    </el-upload>
                  </div>
                </li>
              </el-col>
              <el-col :span="6">
                <li class="icon">
                  <div class="master">
                    <el-upload
                      action
                      :auto-upload="false"
                      :on-change="master_upload"
                    >
                      <!-- <img src="../../assets/user.jpg"> -->
                      <el-button type="primary" round icon="el-icon-upload2">导入教官信息</el-button>
                    </el-upload>
                  </div>
                </li>
              </el-col>
              <el-col :span="6">
                <li class="icon">
                  <div class="company">
                    <el-upload
                      action
                      :auto-upload="false"
                      :on-change="company_upload"
                    >
                      <el-button type="primary" round icon="el-icon-upload2">导入连排信息</el-button>
                    </el-upload>
                  </div>
                </li>
              </el-col>
            </ul>
          </div>
        </div>
      </ElCol>
      <ElCol :span="8">
        <div>
          <div class="card-header">
            <span class="el-icon-menu" style="margin-right:10px"></span>便捷链接
          </div>
          <div class="card-link">
            <ul>
              <el-col :span="8">
                <a href="http://www.zjweu.edu.cn/">
                  <li class="el-icon-share">学校官网</li>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="http://www.zjweu.edu.cn/406/list.htm">
                  <li class="el-icon-share">学院网站</li>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="http://www.zjweu.edu.cn/407/list.htm">
                  <li class="el-icon-share">部门网站</li>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="http://lib.zjweu.edu.cn/">
                  <li class="el-icon-share">校图书馆</li>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="http://jpkc.zjweu.edu.cn/">
                  <li class="el-icon-share">精品课程</li>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="http://ehall.zjweu.edu.cn/new/index.html">
                  <li class="el-icon-share">校内部网</li>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="http://mail.stu.zjweu.edu.cn/">
                  <li class="el-icon-share">学生邮箱</li>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="http://mail.zjweu.edu.cn/">
                  <li class="el-icon-share">教工邮箱</li>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="http://www.zjweu.edu.cn/2d/92/c409a11666/page.htm">
                  <li class="el-icon-share">书记/校长信箱</li>
                </a>
              </el-col>
            </ul>
          </div>
        </div>
      </ElCol>
    </el-row>
    <el-header>
      <p class="welcome message">信息统计</p>
      <h2>学生总数：{{student_count}}</h2>
      <h2>导员总数：{{teacher_count}}</h2>
      <h2>教官总数：{{master_count}}</h2>
      <h2>日记总数：{{diary_count}}</h2>
    </el-header>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "Home",
  data() {
    return {
      input: "",
      student_count: "",
      teacher_count: "",
      master_count: "",
      diary_count: "",
      fileList: [
        {   
        }
      ]
    };
  },
  created () {
    this.student()
    this.teacher()
    this.master()
    this.company()
    this.diary()
  },
  methods: {
    // 数据导入
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
              var number = json[i].学号; var name = json[i].姓名;var sex = json[i].性别;var college = json[i].学院;
              var class1 = json[i].班级;var phone = json[i].联系方式;var teacher = json[i].辅导员;
              // 插入数据库
              this.$http
                .post("/api/user/stuAdd", {
                  number: number,name: name,college: college,sex: sex,class: class1,phone: phone,teacher: teacher
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
    },
    // 数据统计
    student(){
      this.$http.post('/api/user/allStuList').then(res =>{
        var count = res.data.length
        this.student_count=count
      })
    },
    teacher(){
      this.$http.post('/api/user/allTeaList').then(res =>{
        var count = res.data.length
        this.teacher_count=count
      })
    },
    master(){
      this.$http.post('/api/user/allMasterList').then(res =>{
        var count = res.data.length
        this.master_count=count
      })
    },
    company(){
      this.$http.post('/api/user/allCompanyList').then(res =>{
        var count = res.data.length
        this.company_count=count
      })
    },
    diary(){
      this.$http.post('/api/user/allDiaryList').then(res =>{
        var count = res.data.length
        this.diary_count=count
      })
    }
  }
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
/* 主页 */
.welcome {
  margin-bottom: 10px;
  padding: 15px;
  line-height: 22px;
  border-radius: 0 2px 0 2px;
  border-left: 5px solid #009688;
  background-color: #f2f2f2;
  font-size: 15px;
}
/* 快捷方式 */
.card {
  margin-right: 5px;
}
.card-header {
  height: 42px;
  line-height: 42px;
  padding: 0 15px;
  border: 1px solid #f6f6f6;
  color: #333;
  border-radius: 2px 2px 0 0;
  font-size: 14px;
}
.card ul li {
  list-style: none;
  width: 100px;
}
.card-body {
  padding: 10px 15px;
  border: 1px solid #f6f6f6;
  height: 200px;
  padding-top: 40px;
}
.icon {
  display: block;
  height: 100px;
  text-align: center;
  line-height: 100px;
}
.card img {
  width: 80px;
  height: 80px;
}
/* 便捷链接 */
.card-link {
  padding: 5px 15px;
  border: 1px solid #f6f6f6;
  height: 200px;
  padding-top: 40px;
}
.card-link li {
  line-height: 40px;
  padding: 0px;
  font-size: 1.2em;
}
a {
  color: black;
}
/* 信息统计 */
.message {
  margin-top: 20px;
}
h2 {
  margin-top: 10px;
}
</style>