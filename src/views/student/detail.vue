<template>
  <div class="warp-main">
    <el-row :span="24" v-loading="loading" element-loading-text="拼命加载中">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="studentData"
        ref="ruleForm"
      >
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="学号" prop="number" width="60">
              <el-input
                v-model="studentData.number"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="姓名" prop="name" width="60">
              <el-input v-model="studentData.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="邮箱" prop="email" width="60">
              <el-input v-model="studentData.email"></el-input> </el-form-item
          ></el-col>

          <el-col :span="10">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="studentData.phone"></el-input> </el-form-item
          ></el-col>
        </el-row>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="更新时间" prop="update_at" width="60">
              <el-input
                v-model="studentData.update_at"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="创建时间" prop="create_at">
              <el-input
                v-model="studentData.create_at"
                :disabled="true"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="身份证号" prop="id_no">
              <el-input v-model="studentData.id_no"></el-input> </el-form-item
          ></el-col>

          <el-col :span="10">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="studentData.age" @input="studentData.age = studentData.age.replace(/[^\d]/g, '')"></el-input> </el-form-item
          ></el-col>
        </el-row>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="教练" prop="coach">
              <el-select v-model="studentData.coach" placeholder="请选择">
                <el-option
                  v-for="item in coachs"
                  :key="item.dept_no"
                  :label="item.name"
                  :value="item.dept_no"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="缴费情况" prop="payment">
              <el-select
                v-model="studentData.payment"
                placeholder="请选择缴费情况"
              >
                <el-option label="未缴交" value="未缴交"></el-option>
                <el-option label="部分缴交" value="部分缴交"></el-option>
                <el-option label="全部缴交" value="全部缴交"></el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="练车状态" prop="status">
              <el-select v-model="studentData.status" placeholder="请选择">
                <el-option label="未开始" value="未开始"></el-option>
                <el-option label="科目一预约" value="科目一预约"></el-option>
                <el-option label="科目一完成" value="科目一完成"></el-option>
                <el-option label="科目二预约" value="科目二预约"></el-option>
                <el-option label="科目二完成" value="科目二完成"></el-option>
                <el-option label="科目三预约" value="科目三预约"></el-option>
                <el-option label="科目三完成" value="科目三完成"></el-option>
                <el-option label="科目四预约" value="科目四预约"></el-option>
                <el-option label="完成练车" value="完成练车"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="备注" prop="remark" width="60">
              <el-input
                v-model="studentData.remark"
                type="textarea"
                placeholder="请填写备注"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="2" :offset="3">
            <el-button type="primary" @click="submitForm(studentData)"
              >修改</el-button
            >
          </el-col>

          <el-col :span="3">
            <el-button type="info" @click="goBack">返回</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ dialogText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import apis from "@/apis/apis";

export default {
  data() {
    return {
      labelPosition: "right",
      dialogText: "温馨提示",
      dialogVisible: false,
      loading: false,
      keyword: "用户",
      total: 5,
      currentPage: 1,
      pageSize: 10,
      studentData: {
        id: 1,
        name: "小黑",
        age: 23,
        id_no: "123123123123123",
        payment: "未缴交",
        status: "未开始",
        email: "123@qq.com",
        phone: "123456678",
        number: "STU1",
        coach: "JLK001",
        remark: "",
        create_at: "",
        update_at: ""
      },
      multipleSelection: [],
      state: "",
      coachs: [
        {
          dept_no: "JLK001",
          name: "张三"
        },
        {
          dept_no: "JLK002",
          name: "李四"
        }
      ]
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.studentData.id = this.$route.query.id; //将获取道德email发送给后端，让后端根据该邮箱查询用户所有信息
    this.fetchData(); //调用接口获取动态数据
  },
  methods: {
    //获取数据
    fetchData() {
      this.loading = true; //调出拼命加载中
      let params = { id: this.studentData.id };
      apis.studentApi
        .findStudebtByID(params)
        .then(data => {
          console.log(data.studentInfo);
          this.studentData.id = data.studentInfo.id;
          this.studentData.number = data.studentInfo.number;
          this.studentData.name = data.studentInfo.name;
          this.studentData.id_no = data.studentInfo.id_no;
          this.studentData.email = data.studentInfo.email;
          this.studentData.phone = data.studentInfo.phone;
          this.studentData.status = data.studentInfo.status;
          this.studentData.payment = data.studentInfo.payment;
          this.studentData.coach = data.studentInfo.coach;
          this.studentData.remark = data.studentInfo.remark;
          this.studentData.age = data.studentInfo.age;
          this.studentData.create_at = this.changeTimeFormat(
            data.studentInfo.create_at
          );
          this.studentData.update_at = this.changeTimeFormat(
            data.studentInfo.update_at
          );
          this.setLoding(false);
        })
        .catch(error => {
          this.loading = false;
          this.dialogText = error.message;
          this.dialogVisible = true;
          console.log(error);
        });
    },
    //修改用户
    submitForm() {
      var params = new URLSearchParams();
      params.append("id", this.studentData.id);
      params.append("name", this.studentData.name);
      params.append("email", this.studentData.email);
      params.append("phone", this.studentData.phone);
      params.append("id_no", this.studentData.id_no);
      params.append("age", this.studentData.age);
      params.append("coach", this.studentData.coach);
      params.append("payment", this.studentData.payment);
      params.append("status", this.studentData.status);
      params.append("remark", this.studentData.remark);
      this.$confirm("此操作将修改学生信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apis.studentApi
            .updateStudent(params)
            .then(data => {
              console.log(data.message);
              if (data.status === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.fetchData();
              } else {
                this.$message({
                  type: "info",
                  message: "修改失败!"
                });
              }
            })
            .catch(error => {
              this.loading = false;
              this.dialogText = error.message;
              this.dialogVisible = true;
              console.log(error);
              this.$message({
                type: "info",
                message: "修改失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "修改取消"
          });
        });
    },
    setLoding(bool) {
      this.loading = bool;
    },
    changeTimeFormat(time) {
      return new Date(parseInt(time)).toLocaleString();
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
