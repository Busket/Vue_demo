<template>
  <div class="warp-main">
    <el-row :span="24" v-loading="loading" element-loading-text="拼命加载中">
      <el-row :span="24">
        <el-col>
          <el-steps :active="step" align-center>
            <el-step title="未开始" description="尚未开始内容的学习"></el-step>
            <el-step
              title="科目一预约"
              description="已经开始学习科目的内容，并准备或者正在预约科目一"
            ></el-step>
            <el-step
              title="科目一完成"
              description="已经完成科目一的考试，转入学习科目二的内容"
            ></el-step>
            <el-step title="科目二预约" description="正在预约科目二"></el-step>
            <el-step
              title="科目二完成"
              description="已经完成科目二的考试，转入学习科目三的内容"
            ></el-step>
            <el-step title="科目三预约" description="正在预约科目三"></el-step>
            <el-step
              title="科目三完成"
              description="已经完成科目三的考试，转入学习科目四的内容"
            ></el-step>
            <el-step title="科目四预约" description="正在预约科目四"></el-step>
            <el-step
              title="全部完成"
              description="通过科目四的考试，完成所有学车内容"
            ></el-step>
          </el-steps>
        </el-col>
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
                <el-input
                  v-model="studentData.name"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="10">
              <el-form-item label="邮箱" prop="email" width="60">
                <el-input
                  v-model="studentData.email"
                  :disabled="true"
                ></el-input> </el-form-item
            ></el-col>

            <el-col :span="10">
              <el-form-item label="联系方式" prop="phone">
                <el-input
                  v-model="studentData.phone"
                  :disabled="true"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="10">
              <el-form-item label="身份证号" prop="id_no">
                <el-input
                  v-model="studentData.id_no"
                  :disabled="true"
                ></el-input> </el-form-item
            ></el-col>

            <el-col :span="10">
              <el-form-item label="年龄" prop="age">
                <el-input
                  v-model="studentData.age"
                  @input="
                    studentData.age = studentData.age.replace(/[^\d]/g, '')
                  "
                  :disabled="true"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="10">
              <el-form-item label="教练" prop="coach">
                <el-input
                  v-model="studentData.coach_name"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="教练手机" prop="coach">
                <el-input
                  v-model="studentData.coach_phone"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="10">
              <el-form-item label="科目一" prop="subject_1">
                <el-input
                  v-model="studentData.subject_1"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="科目二" prop="subject_2">
                <el-input
                  v-model="studentData.subject_2"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="10">
              <el-form-item label="科目三" prop="subject_3">
                <el-input
                  v-model="studentData.subject_3"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="科目四" prop="subject_4">
                <el-input
                  v-model="studentData.subject_4"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="10">
              <el-form-item label="缴费情况" prop="payment">
                <el-input
                  v-model="studentData.payment"
                  :disabled="true"
                ></el-input> </el-form-item
            ></el-col>

            <el-col :span="10">
              <el-form-item label="课程" prop="typeOfClass">
                <el-input
                  v-model="studentData.typeOfClass"
                  :disabled="true"
                ></el-input> </el-form-item
            ></el-col>

            <el-row :gutter="60">
              <el-col :span="2" :offset="3">
                <el-button type="primary" @click="showApDialog"
                  >预约练车</el-button
                >
              </el-col>
            </el-row>
          </el-row>
        </el-form>
      </el-row>
      <el-row :span="8">
        <br />
        <div><h3>预约记录：</h3></div>
      </el-row>
      <el-col :span="6">
        <br />
        <el-card
          class="box-card"
          v-for="ap in this.aps"
          :key="ap"
          v-show="cardVisible"
        >
          <div slot="header" class="clearfix">
            <span>练车预约</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="deleteAp(ap.id)"
            >
              取消练车</el-button
            >
          </div>
          <el-date-picker
            v-model="ap.date"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            :disabled="true"
          >
          </el-date-picker>
<!--          {{ ap.date }}<br />-->
          <div class="text item">

            {{ ap.time }}<br />
            {{ ap.subject }}<br />
          </div>
        </el-card>
        <h3 v-show="lableVisible">暂时还没有预约！</h3>
      </el-col>
    </el-row>
    <!--添加-->
    <Appointment
      ref="makeAppointment"
      v-if="appointmentVisible"
      :visible.sync="appointmentVisible"
      :student_no.sync="this.studentData.number"
      :student_name.sync="studentData.name"
      :coach_no.sync="studentData.coach"
      :coach_name.sync="studentData.coach_name"
      :coach_phone.sync="studentData.coach_phone"
      :subject.sync="subject"
    ></Appointment>

    <el-dialog
      title="温馨提示"
      :visible.sync="warmDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ dialogText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="warmDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import apis from "@/apis/apis";
import Appointment from "@/views/appointment";

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
  data() {
    return {
      step: 1,
      labelPosition: "right",
      appointmentVisible: false,
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
        coach_name: "小张",
        coach_phone: "123123123",
        subject_1: "",
        subject_2: "",
        subject_3: "",
        subject_4: "",
        typeOfClass: ""
      },
      warmDialogVisible: false,
      dialogText: "您已经完成所有科目的学习，无需预约！",
      aps: [
        { id: "1", date: "2021年4月5日", time: "全天", subject: "科目二" },
        { id: "2", date: "2021年4月6日", time: "上午", subject: "科目二" },
        { id: "3", date: "2021年4月7日", time: "下午", subject: "科目三" }
      ],
      cardVisible: false,
      lableVisible: false
    };
  },
  components: {
    Appointment: Appointment
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.studentData.email = JSON.parse(
      window.sessionStorage.getItem("userInfo")
    ).userEmail; //获取登录用户的邮箱
    this.fetchData(); //调用接口获取动态数据
  },
  methods: {
    //获取数据
    fetchData() {
      this.loading = true; //调出拼命加载中
      let params = { email: this.studentData.email };
      apis.studentApi
        .findStudebtByEmail(params)
        .then(data => {
          console.log(data.studentInfo);
          this.studentData.id = data.studentInfo.id;
          this.studentData.number = data.studentInfo.number;
          this.studentData.name = data.studentInfo.name;
          this.studentData.id_no = data.studentInfo.id_no;
          this.studentData.email = data.studentInfo.email;
          this.studentData.phone = data.studentInfo.phone;
          this.studentData.status = data.studentInfo.status;
          console.log(this.studentData.status);
          if (this.studentData.status === "未开始") {
            this.step = 0;
          } else if (this.studentData.status === "科目一预约") {
            this.step = 1;
          } else if (this.studentData.status === "科目一完成") {
            this.step = 2;
          } else if (this.studentData.status === "科目二预约") {
            this.step = 3;
          } else if (this.studentData.status === "科目二完成") {
            this.step = 4;
          } else if (this.studentData.status === "科目三预约") {
            this.step = 5;
          } else if (this.studentData.status === "科目三完成") {
            this.step = 6;
          } else if (this.studentData.status === "科目四预约") {
            this.step = 7;
          } else if (this.studentData.status === "完成练车") {
            this.step = 8;
          }
          this.studentData.payment = data.studentInfo.payment;
          this.studentData.coach = data.studentInfo.coach;

          this.studentData.age = data.studentInfo.age;
          this.studentData.subject_1 = data.studentInfo.subject_1;
          this.studentData.subject_2 = data.studentInfo.subject_2;
          this.studentData.subject_3 = data.studentInfo.subject_3;
          this.studentData.subject_4 = data.studentInfo.subject_4;
          this.studentData.typeOfClass = data.studentInfo.typeOfClass;
          this.getCoach(); //调用接口获取教练的数据
          this.getMyAp();
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          this.dialogText = error.message;
          this.dialogVisible = true;
          console.log(error);
        });
    },
    changeTimeFormat(time) {
      return new Date(parseInt(time)).toLocaleString();
    },
    getCoach() {
      let params = { Number: this.studentData.coach };
      apis.deptApi
        .studentGetCoach(params) //在这里插入后端浏览列表
        .then(data => {
          if (data.status === "SUCCESS") {
            console.log(data.coachInfo);
            this.studentData.coach_name = data.coachInfo.name; //获取教练列表
            this.studentData.coach_phone = data.coachInfo.phone; //获取教练列表
          } else {
            this.studentData.coach_name = ""; //获取教练列表
            this.studentData.coach_phone = ""; //获取教练列表
          }
        })
        .catch(error => {
          this.studentData.coach_name = ""; //获取教练列表
          this.studentData.coach_phone = ""; //获取教练列表
          console.log(error);
        });
    },
    showApDialog() {
      console.log("预约练车");
      this.getSubject(this.studentData.status);
      if (this.studentData.status !== "完成练车") {
        this.appointmentVisible = true;
      } else {
        this.warmDialogVisible = true;
      }
    },
    getSubject(status) {
      if (status === "未开始" || status === "科目一预约") {
        this.subject = "科目一";
      } else if (status === "科目一完成" || status === "科目二预约") {
        this.subject = "科目二";
      } else if (status === "科目二完成" || status === "科目三预约") {
        this.subject = "科目三";
      } else if (status === "科目三完成" || status === "科目四预约") {
        this.subject = "科目四";
      }
    },
    deleteAp(id) {
      console.log(id);
    },
    getMyAp() {
      let params = { student_no: this.studentData.number };
      console.log(this.studentData.number);
      apis.appointmentApi
        .studentGetAp(params) //在这里插入后端浏览列表
        .then(data => {
          if (data.status === "Success") {
            console.log(data.aps);
            this.aps = data.aps;
            this.cardVisible = true;
            this.lableVisible = false;
          } else if (data.status === "Empty") {
            this.lableVisible = true;
            this.cardVisible = false;
          }
        })
        .catch(error => {
          this.lableVisible = true;
          this.cardVisible = false;
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

<style></style>
