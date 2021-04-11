<template>
  <div class="warp-main">
    <el-row v-loading="loading" element-loading-text="拼命加载中">
      <!--表格数据-->
      <el-col class="table-wrapper">
        <el-table
          :data="appointmentData"
          stripe
          style="width: 100%"
        >
          <!--          @row-click="handleDetail"-->
          <el-table-column
            prop="id"
            label="预约编号"
            v-model="appointmentData.id"
          ></el-table-column>
          <el-table-column
            prop="student_no"
            label="学生"
            v-model="appointmentData.student_no"
          ></el-table-column>
          <el-table-column
            prop="coach_no"
            label="教练"
            v-model="appointmentData.coach_no"
          ></el-table-column>
          <el-table-column
            prop="subject"
            label="科目"
            v-model="appointmentData.subject"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            v-model="appointmentData.date"
            :formatter="dateFormat"
            sortable
          ></el-table-column>
          <el-table-column
            prop="time"
            label="时间"
            v-model="appointmentData.time"
          ></el-table-column>
          <el-table-column
            prop="pickUp"
            v-model="appointmentData.pickUp"
            label="是否接送"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--详情-->
    <div class="modal-mask" v-if="maskVisible" @click="cancelVisible"></div>
    <transition name="slide-fade">
      <div class="detail-box" v-if="detailVisible">
        <Appointment_Detail
          ref="detailAppointment"
          :id="detailId"
        ></Appointment_Detail>
      </div>
    </transition>
  </div>
</template>
<script>
import apis from "@/apis/apis";
import Appointment from "@/views/coach/particulars";
export default {
  components: { Appointment_Detail: Appointment },
  data: function() {
    return {
      loading: false,
      total: 2,
      currentPage: 1,
      pageSize: 10,
      appointmentData: [
        {
          id: 1,
          student_no: "",
          student_name: "", //这个需要另外查询
          coach_name: "", //这个需要另外查询
          coach_phone: "", //这个需要另外查询
          coach_no: "",
          subject: "",
          remark: "",
          date: "",
          time: "",
          pickUp: ""
        },
        {
          id: 2,
          student_no: "",
          student_name: "", //这个需要另外查询
          coach_name: "", //这个需要另外查询
          coach_phone: "", //这个需要另外查询
          coach_no: "",
          subject: "",
          remark: "",
          date: "",
          time: "",
          pickUp: ""
        }
      ],
      addVisible: false, // 添加弹窗flag
      detailVisible: false, // 详情弹窗flag
      maskVisible: false, // 弹窗mask显示
      detailId: 0 // 详情ID
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  methods: {
    //获取数据
    fetchData() {
      let params = {
        coach: JSON.parse(window.sessionStorage.getItem("coachInfo")).dept_no //根据教练的工号，进行筛选工作
      };
      this.loading = true; //调出拼命加载中
      console.log(params);
      apis.appointmentApi
        .coachFindApList(params) //在这里插入后端浏览列表
        .then(data => {
          if (data.status === "Success") {
            this.appointmentData = data.aps; //这里是数据
            this.setLoding(false);
          } else if (data.status === "Empty") {
            this.$message.info("您的预约记录为空！");
            this.setLoding(false);
          } else if (data.status === "Fail") {
            this.$message.info("查询失败！");
            this.setLoding(false);
          }
        })
        .catch(error => {
          this.loading = false;
          this.dialogText = error.message;
          this.dialogVisible = true;
          console.log(error);
        });
    },
    // 选择每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    // 跳转页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 添加弹窗
    showAddDialog() {
      this.addVisible = true;
    },
    // 关闭所有弹窗
    cancelVisible() {
      this.maskVisible = false;
      this.detailVisible = false;
    },
    // 创建日期转换
    dateFormatter(row) {
      return this.getDateValue(row.createTime);
    },
    // 执行日期转换
    activeTateFormatter(row) {
      return this.getDateValue(row.activeTime);
    },
    // 详情
    handleDetail(row) {
      this.detailId = row.id;
      this.maskVisible = true;
      this.detailVisible = true;
    },
    // 获取日期
    getDateValue(datetime) {
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + "-";
        let mon = datetime.getMonth() + 1 + "-";
        let d = datetime.getDate();
        return y + mon + d;
      }
      return "";
    },
    dateFormat(row) {
      var date = new Date(parseInt(row.date));

      var y = date.getFullYear();

      var m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;

      var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      return y + "-" + m + "-" + d;
    }
  }
};
</script>
<style lang="scss" scoped>
.detail-box {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  height: 100%;
  overflow-y: auto;
  z-index: 2000;
  background-color: #fff;
}
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #000;
  opacity: 0.3;
}
</style>
