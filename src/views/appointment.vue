<template>
  <el-dialog
    title="预约练车"
    :visible.sync="visible"
    :student_no.sync="student_no"
    :student_name.sync="form.student_name"
    :coach_no.sync="form.coach_no"
    :coach_name.sync="form.coach_name"
    :coach_phone.sync="form.coach_phone"
    :subject.sync="subject"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <el-form :model="form">
      <el-form-item label="学生编号：" :label-width="formLabelWidth">
        <el-input
          v-model="student_no"
          auto-complete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="学生姓名：" :label-width="formLabelWidth">
        <el-input
          v-model="student_name"
          auto-complete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="教练：" :label-width="formLabelWidth">
        <el-input
          v-model="coach_name"
          auto-complete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="教练联系方式：" :label-width="formLabelWidth">
        <el-input
          v-model="coach_phone"
          auto-complete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="科目：" :label-width="formLabelWidth">
        <el-input
          v-model="subject"
          auto-complete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注：" :label-width="formLabelWidth">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="可以填写备注"
        ></el-input>
      </el-form-item>
      <el-form-item label="预约日期：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          :picker-options="pickerOptions0"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="练车时长：" :label-width="formLabelWidth">
        <el-radio-group v-model="form.time">
          <el-radio label="上午">上午</el-radio>
          <el-radio label="下午">下午</el-radio>
          <el-radio label="全天">全天</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否接送：" :label-width="formLabelWidth">
        <el-radio-group v-model="form.pickUp">
          <el-radio label="是">是</el-radio>
          <el-radio label="否">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="车辆"
        prop="car"
        :label-width="formLabelWidth"
        v-show="this.carChooseVisible"
      >
        <el-select v-model="form.car" placeholder="请选择">
          <el-option
            v-for="item in cars"
            :key="item.carNumber"
            :label="item.carNumber"
            :value="item.carNumber"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="handleClose">取消</el-button>
      <el-button type="primary" @click.native="editFormSubmit">提交</el-button>
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
    },
    student_no: {
      type: String,
      default: ""
    },
    student_name: {
      type: String,
      default: ""
    },
    coach_no: {
      type: String,
      default: ""
    },
    coach_name: {
      type: String,
      default: ""
    },
    coach_phone: {
      type: String,
      default: ""
    },
    subject: {
      type: String,
      default: ""
    }
  },
  created: function() {
    console.log(this.status);
    // this.getSubject(this);
    console.log(this.subject)
    if (this.subject === "科目二" || this.subject === "科目三") {
      //只有是在科目二或者科目三的情况下才能够
      this.getCars(this.subject); //调用接口后去车辆信息
      this.carChooseVisible = true;
    }
  },
  data() {
    return {
      form: {
        student_no: "",
        student_name: "",
        coach_name: "",
        coach_phone: "",
        coach_no: "",
        subject: "",
        remark: "",
        date: Date.now(),
        time: "",
        pickUp: "",
        car: ""
      },
      cars: [{ carNumber: "任意" }, { carNumber: "任意" }, { carNumber: "任意" }],
      formLabelWidth: "120px",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      warmDialogVisible: false,
      carChooseVisible: false,
      dialogText: "您已经完成所有科目的学习，无需预约！"
    };
  },
  methods: {
    editFormSubmit() {
      console.log(this.form.date.toString());
      var params = new URLSearchParams();
      params.append("student_no", this.student_no);
      params.append("coach_no", this.coach_no);
      params.append("subject", this.subject);
      params.append("dat", this.form.date.toString());
      params.append("pickUp", this.form.pickUp);
      params.append("time", this.form.time);
      params.append("remark", this.form.remark);
      params.append("car", this.form.car);

      apis.appointmentApi
        .makeAppointment(params)
        .then(data => {
          if (data.status === "Success") {
            this.$message.success("预约成功！");
            this.handleClose();
          } else if (data.status === "Fail") {
            this.$message.info(data.message);
          }
        })
        .catch(error => {
          this.$message.info("预约失败！");
          this.handleClose();
          console.log(error);
        });
    },
    // 关闭
    handleClose() {
      this.$emit("update:visible", false);
    },
    getCars(subject) {
      let params = {
        subject: subject,
        coach: this.coach_no
      };
      console.log(subject);
      apis.vehicleApi
        .studentGetCars(params) //在这里插入后端浏览列表
        .then(data => {
          if (data.status === "Success") {
            console.log(data.cars);
            this.cars = data.cars;
          } else if (data.status === "Empty") {
            console.log(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
