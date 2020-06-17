<template>
  <div class="home">
    <div class="container">
      <div class="stuInfo">
        <el-form :model="infoInput" inline :rules="rules" ref="infoInput">
          <el-form-item label="学号" prop="number">
            <el-input v-model="infoInput.number" placeholder></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="infoInput.password" :disabled="disabled" placeholder></el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="stuInfo('infoInput')"
            size="small"
            style="margin-top:5px;"
          >查询</el-button>
        </el-form>
        <el-form :model="infoInput" inline ref="infoInput">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="infoInput.name" placeholder></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="college">
            <el-input v-model="infoInput.college" placeholder></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model="infoInput.class" placeholder></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="trainInfo">
        <el-form :model="trainInfo" ref="trainInfo">
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
          <el-button type="primary" @click="stuInfoChange('infoInput','trainInfo')">修改</el-button>
          <el-button type="danger" @click="reset()">清空</el-button>
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
        number: "",
        password: "",
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
          value: "165CM-170CM",
          label: "165CM-170CM"
        },
        {
          value: "170CM-175CM",
          label: "170CM-175CM"
        },
        {
          value: "175CM-180CM",
          label: "175CM-180CM"
        },
        {
          value: "180CM-185CM",
          label: "180CM-185CM"
        },
        {
          value: "其他情况请联系辅导员",
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
          value: "身体原因（需三甲医院开具证明）",
          label: "身体原因（需三甲医院开具证明）"
        },
        {
          value: "退役兵（需申请免修）",
          label: "退役兵（需申请免修）"
        },
        {
          value: "其他原因(请直接向辅导员申请)",
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
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        college: [{ required: true, message: "请输入学院", trigger: "blur" }],
        class: [{ required: true, message: "请输入班级", trigger: "blur" }],
        cloths: [
          { required: true, message: "请选择衣服尺码", trigger: "blur" }
        ],
        shoes: [{ required: true, message: "请输入鞋子尺码", trigger: "blur" }]
      },
      disabled: 0
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
              } else {
                this.infoInput.password = "";
                this.disabled = 1;
                this.infoInput.name = res.data[0].name;
                this.infoInput.college = res.data[0].college;
                this.infoInput.class = res.data[0].class;
                this.trainInfo.train = res.data[0].train;
                this.trainInfo.cloths = res.data[0].cloths;
                this.train();
                this.trainInfo.shoes = res.data[0].shoes;
                this.trainInfo.reason = res.data[0].reason;
              }
            });
        }
      });
    },
    stuInfoChange() {
      const number = this.infoInput.number;
      const name = this.infoInput.name;
      const college = this.infoInput.college;
      const class1 = this.infoInput.class;
      const train = this.trainInfo.train;
      const cloths = this.trainInfo.cloths;
      const shoes = this.trainInfo.shoes;
      const reason = this.trainInfo.reason;
      if (
        name == "" ||
        (college == "") | (class1 == "") ||
        train == "" ||
        cloths == "" ||
        shoes == ""
      ) {
        this.$message({
          message: "内容输入不能为空",
          type: "warning"
        });
      } else {
        // 插入数据库，数据库返回的状态为result
        this.$confirm("是否提交修改，该过程不可撤销", "警告提示", {
          confirmButtonText: "确定修改",
          cancelButtonText: "取消修改",
          type: "warning"
        })
          .then(() => {
            this.$http
              .post(
                "/api/user/stuInfoUpdate",
                {
                  number: number,
                  name: name,
                  college: college,
                  class: class1,
                  train: train,
                  cloths: cloths,
                  shoes: shoes,
                  reason: reason
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
          .catch(() => {});
      }
    },
    reset() {
      this.infoInput.number = "";
      this.infoInput.password = "";
      this.disabled = 0;
      this.infoInput.name = "";
      this.infoInput.college = "";
      this.infoInput.class = "";
      this.trainInfo.train = "";
      this.trainInfo.cloths = "";
      this.trainInfo.shoes = "";
      this.trainInfo.reason = "";
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
  width: 400px;
}
.trainInfo {
  float: right;
}
</style>

