<template>
  <el-dialog
    title="添加学员"
    :visible.sync="visible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <el-form :model="studentData" :rules="rules" ref="addForm">
      <!--      <el-form-item label="学员编号：" :label-width="formLabelWidth">-->
      <!--        <el-input-->
      <!--          v-model="studentData.number"-->
      <!--          auto-complete="off"-->
      <!--          :disabled="true"-->
      <!--        ></el-input>-->
      <!--      </el-form-item>-->

      <el-form-item label="姓名：" prop="name" :label-width="formLabelWidth">
        <el-input v-model="studentData.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄：" :label-width="formLabelWidth">
        <el-input
          v-model="studentData.age"
          auto-complete="off"
          @input="studentData.age = studentData.age.replace(/[^\d]/g, '')"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号：" :label-width="formLabelWidth">
        <el-input v-model="studentData.id_no" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="联系方式："
        prop="phone"
        :label-width="formLabelWidth"
      >
        <el-input v-model="studentData.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email" :label-width="formLabelWidth">
        <el-input v-model="studentData.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="缴费情况：" :label-width="formLabelWidth">
        <el-select v-model="studentData.payment" placeholder="请选择缴费情况">
          <el-option label="未缴交" value="未缴交"></el-option>
          <el-option label="部分缴交" value="部分缴交"></el-option>
          <el-option label="全部缴交" value="全部缴交"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="教练" prop="coach" :label-width="formLabelWidth">
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

      <el-form-item
        label="练车状态："
        prop="status"
        :label-width="formLabelWidth"
      >
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
      <el-form-item label="备注：" :label-width="formLabelWidth">
        <el-input
          v-model="studentData.remark"
          type="textarea"
          placeholder="请填写备注"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="handleClose">取消</el-button>
      <el-button type="primary" @click="SubmitForm('addForm')">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import apis from "@/apis/apis";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      studentData: {
        number: "",
        name: "",
        age: "",
        id_no: "",
        payment: "",
        coach: "",
        status: "未开始",
        email: "",
        phone: "",
        remark: ""
      },
      coachs: [
        {
          dept_no: "JLK001",
          name: "张三"
        },
        {
          dept_no: "JLK002",
          name: "李四"
        }
      ],
      formLabelWidth: "120px",
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        email: [{ required: true, message: "邮箱不可为空", trigger: "blur" }],
        status: [{ required: true, message: "状态不可为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不可为空", trigger: "blur" }],
        coach: [{ required: true, message: "教练不可为空", trigger: "blur" }],
        phone: [
          { required: true, message: "联系方式不可为空", trigger: "blur" }
        ]
      }
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.getCoach(); //调用接口获取动态数据
  },
  methods: {
    SubmitForm(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = new URLSearchParams();
          params.append("name", this.studentData.name);
          params.append("email", this.studentData.email);
          params.append("age", this.studentData.age);
          params.append("phone", this.studentData.phone);
          params.append("id_no", this.studentData.id_no);
          params.append("payment", this.studentData.payment);
          params.append("coach", this.studentData.coach);
          params.append("status", this.studentData.status);
          params.append("remark", this.studentData.remark);

          console.log(params);
          apis.studentApi
            .addStudent(params)
            .then(data => {
              console.log(data.status);
              if (data.status === "Success") {
                this.dialogText = data.message;
                this.dialogVisible = true;
                this.handleClose();
              } else {
                this.dialogText = data.message;
                this.dialogVisible = true;
              }
            })
            .catch(error => {
              this.dialogText = error.message;
              this.dialogVisible = true;
              console.log(error);
            });
        } else {
          this.dialogText = "请确认输入信息完整！";
          this.dialogVisible = true;
          return false;
        }
      });
    },
    getCoach() {
      apis.deptApi
        .getCoach() //在这里插入后端浏览列表
        .then(data => {
          if (data.status === "SUCCESS") {
            this.coachs = data.staffInfo; //获取教练列表
          }
        })
        .catch(error => {
          this.loading = false;
          this.dialogText = error.message;
          this.dialogVisible = true;
          console.log(error);
        });
    },
    // 关闭
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
