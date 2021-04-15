<template>
  <div class="warp-main">
    <el-row :span="24" v-loading="loading" element-loading-text="拼命加载中">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          prop="id"
          label="车辆编号"
          width="120"
        ></el-table-column>
        <el-table-column prop="carNumber" label="车牌号码"></el-table-column>
        <el-table-column
          prop="brand"
          label="品牌"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="chargeMan"
          label="负责人"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="180"
          :formatter="statusFormat"
        ></el-table-column>
        <el-table-column
          prop="create_at"
          label="创建日期"
          width="180"
          :formatter="createTimeFormat"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="100"
          fixed="right"
          width="268"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              @click="showInformationDialog(scope.row.carNumber)"
              >通知学生</el-button
            >
            <el-button type="warning" @click="modifyCar(scope.row.id)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--信息平台-->
    <Information
      ref="addStudent"
      v-if="informationVisible"
      :visible.sync="informationVisible"
      :car_no.sync="this.information.car_no"
    ></Information>
  </div>
</template>
<script>
import apis from "@/apis/apis";
import Information from "@/views/administration/Information";

export default {
  data() {
    return {
      dialogText: "温馨提示",
      dialogVisible: false,
      loading: false,
      // keyword: "用户",
      total: 5,
      currentPage: 1,
      pageSize: 10,
      tableData: [
        {
          id: "1",
          carNumber: "粤A123123",
          brand: "大众",
          status: 123,
          chargeMan: "小王",
          create_at: "2017-03-27"
        },
        {
          id: "2",
          carNumber: "粤A321321",
          brand: "宝马",
          status: 123,
          chargeMan: "小黑",
          create_at: "2017-03-27"
        }
      ],
      multipleSelection: [],
      filters: {
        carNumber: ""
      },
      information: {
        car_no:""
      },
      informationVisible: false
    };
  },
  components: {
    Information: Information
    // 'mission-add': MissionAdd,
    // 'mission-detail': MissionDetail
  },
  created: function() {
    this.fetchData(); //调用接口获取动态数据
  },
  methods: {
    //获取数据
    fetchData() {
      let params = {
        ChargeMan: JSON.parse(window.sessionStorage.getItem("coachInfo"))
          .dept_no
      };
      this.loading = true; //调出拼命加载中
      console.log(params);
      apis.vehicleApi
        .coachFindCarList(params) //在这里插入后端浏览列表
        .then(data => {
          console.log(data.data);
          this.tableData = data.data; //这里是数据
          this.setLoding(false);
        })
        .catch(error => {
          this.loading = false;
          this.dialogText = error.message;
          this.dialogVisible = true;
          console.log(error);
        });
    },
    setLoding(bool) {
      this.loading = bool;
    },
    createTimeFormat(row) {
      return new Date(parseInt(row.create_at)).toLocaleString();
    },
    updateTimeFormat(row) {
      return new Date(parseInt(row.update_at)).toLocaleString();
    },
    statusFormat(row) {
      if (row.status === 112) {
        return "科目二教练车";
      } else if (row.status === 113) {
        return "科目三教练车";
      } else if (row.status === 114) {
        return "接送车";
      } else if (row.status === 110) {
        return "停用";
      } else if (row.status === 119) {
        return "待修";
      } else if (row.status === 100) {
        return "外用（出借）";
      } else if (row.status === 222) {
        return "其他";
      } else {
        return "未知";
      }
    },
    modifyCar(id) {
      this.$router.push({
        path: "/administration/coachCarDetail",
        query: { id: id }
      }); //用go刷新
    },
    // 通知平台弹窗
    showInformationDialog(carNumber) {
      console.log(carNumber);
      this.informationVisible = true;
      this.information.car_no = carNumber;
    }
  }
};
</script>
<style>
.el-table th {
  text-align: center;
}

.el-table tbody tr td:first-child {
  text-align: center;
}
</style>
