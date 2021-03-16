<!--教务科-->
<template>
  <div class="warp-main">
    <el-row :span="24" v-loading="loading" element-loading-text="拼命加载中">
      <el-col
        :gutter="360"
        :span="24"
        class="toolbar"
        style="padding-bottom: 0;"
      >
        <el-form :inline="true" :model="tableData">
          <el-form-item>
            <el-input
              v-model="tableData.name"
              placeholder="请输入同事名称"
              auto-complete="off"
              @keyup.enter.native="fetchData"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" v-on:click="fetchData"
            >查询</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" v-on:click="creatStaff()"
            >添加用户</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!--    <el-table-column prop="department" label="部门名称" width="120"></el-table-column>-->
        <el-table-column
          prop="dept_no"
          label="工号"
          width="120"
        ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="address" label="姓名"></el-table-column>
        <el-table-column prop="id_no" label="身份证号"></el-table-column>
        <el-table-column prop="position" label="职位"></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="100"
          fixed="right"
          width="268"
        >
          <template slot-scope="scope">
            <el-button type="warning" @click="modifyStaff(scope.row.email)"
            >修改</el-button
            >
            <el-button type="danger" @click="deleteStaff(scope.row.email)"
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
  </div>
</template>

<script>
import apis from "@/apis/apis";

export default {
  name: "leadership",
  data() {
    return {
      loading: false,
      total: 12,
      currentPage: 1,
      pageSize: 10,
      tableData: [
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        },
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        },
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        },
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        },
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        },
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        },
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        },
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        },
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        },
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        },
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        },
        {
          dept_no: "123",
          name: "小黑",
          age: 23,
          email: "123@qq.com",
          phone: "123",
          address: "上海市普陀区金沙江路 1518 弄",
          id_no: "4401123123123",
          position: "总裁"
        }
      ]
    };
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
      apis.userApi
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
    setLoding(bool) {
      this.loading = bool;
    },
    //删除员工,同时询问是否删除用户？
    deleteStaff(val) {
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
    modifyStaff(val) {
      this.dialogText = val;
      this.dialogVisible = true;
      this.$router.push({ path: "/dept/detail", query: { email: val } }); //用go刷新
    },
    creatStaff() {
      this.$router.push("/dept/add"); //用go刷新
    }
  }
};
</script>

<style scoped></style>
