<template>
  <div class="warp-main">
    <el-row :span="24" v-loading="loading" element-loading-text="拼命加载中">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input
              v-model="filters.name"
              placeholder="请输入用户名称"
              auto-complete="off"
              @keyup.enter.native="fetchData"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" v-on:click="fetchData"
              >查询</el-button
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
          label="用户编号"
          width="180"
          sortable
        ></el-table-column>
        <el-table-column
          prop="name"
          label="用户名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="jurisdiction"
          label="权限级别"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="create_at"
          label="创建日期"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="update_at"
          label="更新日期"
          width="180"
        ></el-table-column>
        <!--          这个状态指的是是否激活的状态-->
        <el-table-column
          prop="status"
          label="状态"
          width="180"
        ></el-table-column>
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
  </div>
</template>
<script>
import apis from "@/apis/apis";
export default {
  data() {
    return {
      loading: false,
      keyword: "用户",
      total: 5,
      currentPage: 1,
      pageSize: 10,
      tableData: [
        {
          id: "1",
          name: "小黑",
          email: "123@qq.com",
          phone: "123123",
          jurisdiction: "3",
          create_at: "2017-03-27",
          update_at: "2016-03-27",
          status: "1"
        }
      ],
      multipleSelection: [],
      filters: {
        name: ""
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
        keywords: this.filters.name //关键字？  filter-过滤
      };
      this.loading = true; //调出拼命加载中
      apis.userApi
        .findList(params) //在这里插入后端浏览列表
        .then(data=> {
          console.log(data.count);
          console.log(data.curr);
          console.log(data.data);
          this.total = data.count; //数据的数量
          this.currentPage = data.curr; //这个应该是关于页数的吧？不清楚
          this.tableData = data.data; //这里是数据
          this.setLoding(false);
        })
        .catch(function(error) {
          this.loading = false;
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
