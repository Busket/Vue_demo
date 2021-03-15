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
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column
          prop="id"
          label="车辆编号"
          width="120"
          sortable
        ></el-table-column>
        <el-table-column
          prop="carNumber"
          label="车牌号码"
          show-overflow-tooltip
        ></el-table-column>
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
          prop="creat_at"
          label="创建日期"
          width="180"
          :formatter="createTimeFormat"
        ></el-table-column>
        <!--        <el-table-column-->
        <!--          prop="update_at"-->
        <!--          label="更新日期"-->
        <!--          width="180"-->
        <!--          :formatter="updateTimeFormat"-->
        <!--        ></el-table-column>-->
        <!--        &lt;!&ndash;          这个状态指的是是否激活的状态&ndash;&gt;-->
        <!--        <el-table-column-->
        <!--          prop="activecode"-->
        <!--          label="状态"-->
        <!--          width="180"-->
        <!--        ></el-table-column>-->
        <el-table-column
          label="操作"
          align="center"
          min-width="100"
          fixed="right"
          width="268"
        >
          <template slot-scope="scope">
            <el-button type="warning" @click="modifyCar(scope.row.email)"
              >修改</el-button
            >
            <el-button type="danger" @click="deleteCar(scope.row.email)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--<div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>-->
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
          creat_at: "2017-03-27"
        },
        {
          id: "2",
          carNumber: "粤A321321",
          brand: "宝马",
          status: 123,
          chargeMan: "小黑",
          creat_at: "2017-03-27"
        }
      ],
      multipleSelection: [],
      filters: {
        carNumber: ""
      }
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
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
      return new Date(parseInt(row.creat_at)).toLocaleString();
    },
    updateTimeFormat(row) {
      return new Date(parseInt(row.update_at)).toLocaleString();
    },
    statusFormat(row) {
      if (row.status === 123) {
        return "正常";
      } else if (row.status === 102) {
        return "学员";
      } else if (row.status === 103) {
        return "教练";
      } else if (row.status === 104) {
        return "行政";
      } else {
        return "未知";
      }
    },
    //删除用户
    deleteCar(val) {
      // console.log(val);
      // this.dialogText = val;
      // this.dialogVisible = true;
      //这里写相应的逻辑，val是指传进来的参数也就是上面的scope.row.phone；也可以是scope.row.nickname等

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //在这里接相关的后端操作
          this.$message({
            type: "success",
            message: "删除成功!"
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
      this.$router.push({ path: "/vehicle/detail", query: { carNumber: val } }); //用go刷新
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
