<template>
  <div class="warp-main">
    <el-row v-loading="loading" element-loading-text="拼命加载中">
      <el-page-header @back="goBack" props="subject"></el-page-header>
      <!--表格数据-->
      <el-col :span="24" class="table-wrapper">
        <el-table
          :data="infoData"
          stripe
          style="width: 100%"
          @row-click="planDetail"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="info-table-expand">
                <el-form-item label="车牌号：">
                  <span>{{ props.row.carNumber }}</span>
                </el-form-item>
                <el-form-item label="场地：">
                  <span>{{ props.row.place }}</span>
                </el-form-item>
                <el-form-item label="教练：">
                  <span>{{ props.row.coach }}</span>
                </el-form-item>
                <el-form-item label="开始时间：">
                  <span>{{ props.row.startTime }}</span>
                </el-form-item>
                <el-form-item label="完成时间：">
                  <span>{{ props.row.finishTime }}</span>
                </el-form-item>
                <el-form-item label="备注：">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="车牌号"
            prop="carNumber"
            class="pull-left"
          ></el-table-column>
          <el-table-column label="场地" prop="place"></el-table-column>
          <el-table-column label="教练" prop="coach"></el-table-column>
        </el-table>
      </el-col>
      <!--分页-->
      <el-col :span="24" class="toolbar">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!--详情-->
    <div class="modal-mask" v-if="maskVisible" @click="cancelVisible"></div>
    <transition name="slide-fade">
      <div class="detail-box" v-if="detailVisible">
        <plan-detail ref="detailPlan" :detail="detail"></plan-detail>
      </div>
    </transition>
  </div>
</template>
<script>
import PlanDetail from "./particulars";
export default {
  name: "plan",
  data() {
    return {
      loading: false, // 加载loading
      filters: {
        // 搜索表单
        keyword: ""
      },
      total: 5,
      currentPage: 1,
      pageSize: 10,
      subject: "科目三",
      infoData: [
        {
          date: "2021-2-1",
          week: "星期一",
          total: 36,
          Reserved: 12,
          place: "狮岭校区",
          coach: "小黑",
          carNumber: "粤A12345",
          content: "科目二练习",
          startTime: "2018-04-20 08:00:00",
          finishTime: "2018-04-20 09:00:00",
          remark: "备注内容"
        }
      ],
      detailVisible: false, // 详情弹窗flag
      maskVisible: false, // 弹窗mask显示
      detail: null // 详情ID
    };
  },
  components: {
    "plan-detail": PlanDetail
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.subject = this.$route.query.subject; //将获取道德email发送给后端，让后端根据该邮箱查询用户所有信息
    this.infoData.date = this.$route.query.date;
    // this.fetchData(param); //调用接口获取动态数据
  },
  methods: {
    addPlan() {
      this.$message({
        showClose: true,
        message: "这是一条消息提示",
        type: "success"
      });
    },
    // 详情
    planDetail(row, event, column) {
      this.detail = row;
      this.maskVisible = true;
      this.detailVisible = true;
    },
    // 关闭详情弹窗
    cancelVisible() {
      this.maskVisible = false;
      this.detailVisible = false;
    },
    // search data
    handleSearch() {
      // ...
    },
    goBack() {
      console.log("go back");
      this.$router.go(-1);
    }
    // // 选择每页显示条数
    // handleSizeChange(val) {
    //   //        this.pageSize = val;
    //   //        this.currentPage = 1;
    // },
    // // 跳转页
    // handleCurrentChange(val) {
    //   //        this.currentPage = val;
    // }
  }
};
</script>
<style>
.info-table-expand {
  font-size: 0;
}
.info-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.info-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
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
