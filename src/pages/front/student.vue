<template>
  <div class="home">
    <div class="container">
      <div class="stuInfo">
        <el-form :model="infoInput" inline :rules="rules" ref="infoInput">
          <el-form-item label="学号" prop="number">
            <el-input v-model="infoInput.number" placeholder></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="infoInput.password"></el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="stuInfo('infoInput')"
            size="small"
            style="margin-top:5px;"
          >查找</el-button>
        </el-form>
        <el-form :model="infoInput" inline>
          <el-form-item label="姓名">
            <el-input v-model="infoInput.name" disabled></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="infoInput" inline>
          <el-form-item label="学院">
            <el-input v-model="infoInput.college" disabled></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="infoInput" inline>
          <el-form-item label="班级">
            <el-input v-model="infoInput.class" disabled placeholder></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="trainInfo">
        <el-form :model="trainInfo">
          <el-form-item label="参加军训">
            <el-radio-group v-model="trainInfo.train" @change="train()">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-form :model="trainInfo" inline v-show="train_yes">
          <el-form-item label="军训服">
            <el-select v-model="trainInfo.cloths" placeholder=" 请选择衣服尺寸（套装）">
              <el-option
                v-for="item in cloths"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="trainInfo" v-show="train_yes">
          <el-form-item label="军训鞋">
            <el-select v-model="trainInfo.shoes" placeholder=" 请选择鞋子码数">
              <el-option
                v-for="item in shoes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="trainInfo" inline v-show="train_no">
          <el-form-item label="具体原因">
            <el-select v-model="trainInfo.reason" placeholder="请选择原因...  ">
              <el-option
                v-for="item in reason"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="reason" inline>
          <el-button type="primary" @click="stuUpdate()">提交</el-button>
          <el-button type="info">取消</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      infoInput: {
        name: "",
        college: "",
        class: ""
      },
      activeIndex: "2",
      labelPosition: "right",
      // trainInfo
      trainInfo: {
        train: "是",
        cloths: "",
        shoes: "",
        reason: ""
      },
      cloths: [
        {
          value: "选项1",
          label: "身高：165CM左右"
        },
        {
          value: "选项2",
          label: "身高：175CM左右"
        },
        {
          value: "选项3",
          label: "身高：180CM左右"
        },
        {
          value: "选项4",
          label: "身高：185CM左右"
        },
        {
          value: "选项5",
          label: "其他情况请联系辅导员"
        }
      ],
      shoes: [
        {
          value: "选项1",
          label: "鞋码：36码"
        },
        {
          value: "选项2",
          label: "鞋码：38码"
        },
        {
          value: "选项3",
          label: "鞋码：40码"
        },
        {
          value: "选项4",
          label: "鞋码：42码"
        },
        {
          value: "选项5",
          label: "其他情况请联系辅导员"
        }
      ],
      reason: [
        {
          value: "选项1",
          label: "身体原因（需三甲医院开具证明）"
        },
        {
          value: "选项2",
          label: "退役兵（需申请免修）"
        },
        {
          value: "选项3",
          label: "其他原因(请直接向辅导员申请)"
        }
      ],
      train_yes: true,
      train_no: false,
      // 验证规则
      rules: {
        number: [
          { required: true, message: "请输入学生学号", trigger: "blur" },
          { min: 9, max: 10, message: "请输入完整学号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    train() {
      if (this.trainInfo.train == "是") {
        this.train_yes = true;
        this.train_no = false;
      } else {
        this.train_yes = false;
        this.train_no = true;
      }
    },
    // 查找学生信息
    stuInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var number = this.infoInput.number;
          var password = this.infoInput.password;
          this.$http
            .post("/api/user/stuList", { number: number, begin: 0, end: 500 })
            .then(res => {
             if (res.data.length == 0) {
                this.$message({
                  message: "没有该生信息，请联系辅导员",
                  type: "warning"
                });
              } else if (res.data.length > 1) {
                this.$message({
                  message: "请输入完整的学号",
                  type: "warning"
                });
              } else if (res.data[0].password != password) {
                this.$message({
                  message: "密码错误，请重新输入！",
                  type: "warning"
                });
              }else {
                // this.infoInput.number = "";
                this.infoInput.password = "";
                this.infoInput.name = res.data[0].name;
                this.infoInput.college = res.data[0].college;
                this.infoInput.class = res.data[0].class;
              }
            });
        }
      });
    },
    stuUpdate() {
      var number = this.infoInput.number;
      this.$http
        .post("/api/user/stuList", { number: number, begin: 0, end: 500 })
        .then(res => {
          var name = res.data[0].name;
          var college = res.data[0].college;
          var class1 = res.data[0].class;
          var sex = res.data[0].sex;
          var cloths = this.trainInfo.cloths;
          var shoes = this.trainInfo.shoes;
          var reason = this.trainInfo.reason;
          var phone = res.data[0].phone;
          var teacher = res.data[0].teacher;
          this.$http
            .post("/api/user/stuUpdate", {
              number: number,
              name:name,
              sex: sex,
              college: college,
              class: class1,
              cloths: cloths,
              shoes: shoes,
              reason: reason,
              phone: phone,
              teacher: teacher
            })
            .then(res => {
              if (res) {
                this.$message({
                  message: "申请成功！",
                  type: "info"
                });
                this.reload()
              }
            });
        });
    }
  }
};
</script>

<style>
.home {
  width: 800px;
  height: 400px;
  padding: 40px;
  margin: 160px auto;
  border-radius: 10px;
  background: rgba(240, 240, 240, 0.87);
}
.stuInfo {
  float: left;
  margin-left: 0px;
  width: 400px;
}
.trainInfo {
  float: right;
  margin-right: 0px;
}
</style>

