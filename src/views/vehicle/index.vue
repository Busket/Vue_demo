<template>
  <div class="warp-main">
    <el-row :span="24" v-loading="loading" element-loading-text="拼命加载中">
      <el-col
        :gutter="360"
        :span="24"
        class="toolbar"
        style="padding-bottom: 0;"
      >
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input
              v-model="filters.carNumber"
              placeholder="请输入车牌号码"
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
            <el-button type="primary" size="medium" v-on:click="creatCar()"
              >+添加车辆</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
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
            <el-button type="warning" @click="modifyCar(scope.row.id)"
              >修改</el-button
            >
            <el-button type="danger" @click="deleteCar(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
      }
    };
  },
  created: function() {
    this.fetchData(); //调用接口获取动态数据
  },
  methods: {
    //切换选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(function(row) {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //获取数据
    fetchData() {
      let params = {
        curr: this.currentPage, //当前页
        pageSize: this.pageSize, //每页的大小
        keywords: this.filters.carNumber //关键字？  filter-过滤
      };
      this.loading = true; //调出拼命加载中

      apis.vehicleApi
        .findList(params) //在这里插入后端浏览列表
        .then(data => {
          console.log(data.count);
          console.log(data.curr);
          console.log(data.data);
          this.total = data.count; //数据的数量
          this.currentPage = data.curr; //这个应该是关于页数的吧？不清楚
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
    //删除用户
    deleteCar(val) {
      let params = {
        id: val //将id传给后端，进行删除
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(params);
          apis.vehicleApi
            .deleteCar(params) //在这里插入后端浏览列表
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
    //修改用户
    modifyCar(val) {
      this.$router.push({ path: "/vehicle/detail", query: { id: val } }); //用go刷新
    },
    creatCar() {
      this.$router.push("/vehicle/add"); //用go刷新
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
