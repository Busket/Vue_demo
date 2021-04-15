<template>
  <div class="warp-main">
    <el-row v-loading="loading" element-loading-text="拼命加载中">
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input
              v-model="filters.name"
              placeholder="请输入学生姓名"
              auto-complete="off"
              @keyup.enter.native="fetchData"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" v-on:click="fetchData"
              >查询</el-button
            >
          </el-form-item>
          <el-form-item class="pull-right">
            <el-button
              type="primary"
              size="medium"
              @click="showAddDialog"
              icon="el-icon-plus"
              >新增</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
      <!--表格数据-->
      <el-col class="table-wrapper">
        <el-table :data="studentData" stripe style="width: 100%">
          <el-table-column prop="number" label="学生编号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
          <el-table-column prop="payment" label="缴费情况"></el-table-column>
          <el-table-column prop="status" label="练车状态"></el-table-column>
          <el-table-column
            prop="coach"
            label="教练工号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="warning" @click="modifyStudent(scope.row.id)"
                >修改</el-button
              >
<!--              <el-button type="danger" @click="deleteStudent(scope.row.id)"-->
<!--                >删除</el-button-->
<!--              >-->
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="toolbar">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!--添加-->
    <student-add
      ref="addStudent"
      v-if="addVisible"
      :visible.sync="addVisible"
    ></student-add>
    <!--    &lt;!&ndash;详情&ndash;&gt;-->
    <!--    <div class="modal-mask" v-if="maskVisible" @click="cancelVisible"></div>-->
    <!--    <transition name="slide-fade">-->
    <!--      <div class="detail-box" v-if="detailVisible">-->
    <!--        &lt;!&ndash;        <mission-detail ref="detailMission" :id="detailId"></mission-detail>&ndash;&gt;-->
    <!--      </div>-->
    <!--    </transition>-->
  </div>
</template>
<script>
import StudnetAdd from "./add";
import apis from "@/apis/apis";
export default {
  data: function() {
    return {
      loading: false,
      total: 2,
      currentPage: 1,
      pageSize: 10,
      studentData: [
        {
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
        {
          id: 2,
          name: "小王",
          age: 26,
          id_no: "",
          payment: "全部缴交",
          status: "科目一预约",
          email: "123123@qq.com",
          phone: "123",
          number: "STU2",
          coach: "JLK002",
          remark: "",
          create_at: "",
          update_at: ""
        }
      ],
      addVisible: false, // 添加弹窗flag
      detailVisible: false, // 详情弹窗flag
      maskVisible: false, // 弹窗mask显示
      detailId: 0, // 详情ID
      filters: {
        // 搜索表单
        name: ""
      }
    };
  },
  components: {
    "student-add": StudnetAdd
    // 'mission-add': MissionAdd,
    // 'mission-detail': MissionDetail
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData(); //调用接口获取动态数据
  },
  methods: {
    //获取数据
    fetchData() {
      let params = {
        curr: this.currentPage, //当前页
        pageSize: this.pageSize, //每页的大小
        keywords: this.filters.name //关键字？  filter-过滤
      };
      this.loading = true; //调出拼命加载中
      apis.studentApi
        .findList(params) //在这里插入后端浏览列表
        .then(data => {
          console.log(data.count);
          console.log(data.curr);
          console.log(data.data);
          this.total = data.count; //数据的数量
          this.currentPage = data.curr; //这个应该是关于页数的吧？不清楚
          this.studentData = data.data; //这里是数据
          this.setLoding(false);
        })
        .catch(error => {
          this.loading = false;
          this.dialogText = error.message;
          this.dialogVisible = true;
          console.log(error);
        });
    },
    // 详情
    modifyStudent(val) {
      this.$router.push({ path: "/administration/detail", query: { id: val } }); //用go刷新
    },
    // 删除
    deleteStudent(id) {
      let params = {
        id: id //将id传给后端，进行删除
      };
      this.$confirm("此操作将永久删除该学生, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(params);
          apis.studentApi
            .deleteStudent(params) //在这里插入后端浏览列表
            .then(data => {
              console.log(data.message);
              if (data.message === "Success") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.fetchData();
              } else {
                this.$message({
                  type: "info",
                  message: "删除失败!"
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
                message: "删除失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "删除失败"
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchData();
      //        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
      //        console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
