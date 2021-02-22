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

      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="userData"
        ref="ruleForm"
      >
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="姓名" prop="name" width="60">
              <el-input v-model="userData.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="userData.phone"></el-input> </el-form-item
          ></el-col>
        </el-row>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="邮箱" prop="email" width="60">
              <el-input v-model="userData.email"></el-input> </el-form-item
          ></el-col>

          <el-col :span="10">
            <el-form-item label="更新时间" prop="update_at" width="60">
              <el-input
                v-model="userData.update_at"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="密码" prop="password" width="60">
              <el-input v-model="userData.password"></el-input> </el-form-item
          ></el-col>

          <el-col :span="10">
            <el-form-item label="创建时间" prop="creat_at">
              <el-input
                v-model="userData.creat_at"
                :disabled="true"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="权限" prop="jurisdiction">
              <el-input v-model="userData.jurisdiction"></el-input>
              <!--              :formatter="jurisdictionFormat"-->
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="激活码" prop="activecode">
              <el-input v-model="userData.activecode"></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="激活时间" prop="email_verified_at">
              <el-input
                v-model="userData.email_verified_at"
                :disabled="true"
              ></el-input> </el-form-item
          ></el-col>

          <el-row :gutter="20">
            <el-col :span="2" :offset="3">
              <el-button type="primary" @click="submitForm(userData)"
                >修改</el-button
              >
            </el-col>

            <el-col :span="3">
              <el-button type="info" @click="goBack">返回</el-button>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-row>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ dialogText }}}</span>
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
      labelPosition: "right",
      dialogText: "温馨提示",
      dialogVisible: false,
      loading: false,
      keyword: "用户",
      total: 5,
      currentPage: 1,
      pageSize: 10,
      userData: {
        name: "小黑黑",
        password: "123",
        email: "",
        phone: "123123",
        jurisdiction: 102,
        creat_at: "2017-03-27",
        update_at: "2016-03-27",
        activecode: "1",
        email_verified_at: "2016-03-27"
      },
      multipleSelection: [],
      filters: {
        name: ""
      },
      state: ""
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    var param = this.$route.query.email; //将获取道德email发送给后端，让后端根据该邮箱查询用户所有信息
    // this.fetchData(param); //调用接口获取动态数据
  },
  methods: {
    //获取数据
    fetchData() {
      let params = {};
      this.loading = true; //调出拼命加载中
      apis.userApi
        .findByEmail(params) //还需要写接口
        .then(data => {
          console.log(data.data);
          this.data = data.data; //这里是数据
          this.setLoding(false);
        })
        .catch(error => {
          this.loading = false;
          this.dialogText = error.message;
          this.dialogVisible = true;
          console.log(error);
        });
    },
    submitForm(userData) {
      apis.userApi
        .updateUser(userData) //还需要写接口
        .then(data => {
          console.log(data.data);
          this.data = data.data; //这里是数据
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
      return new Date(parseInt(row.creat_at)).toLocaleString();
    },
    updateTimeFormat(row) {
      return new Date(parseInt(row.update_at)).toLocaleString();
    },
    jurisdictionFormat(row) {
      if (row.jurisdiction === 101) {
        return "超级管理员";
      } else if (row.jurisdiction === 102) {
        return "学员";
      } else if (row.jurisdiction === 103) {
        return "教练";
      } else {
        return "未知";
      }
    },
    deleteUser(val) {
      console.log(val);
      this.dialogText = val;
      this.dialogVisible = true;
      //这里写相应的逻辑，val是指传进来的参数也就是上面的scope.row.phone；也可以是scope.row.nickname等
    },
    //修改用户
    modifyUser(val) {
      this.dialogText = val;
      this.dialogVisible = true;
    },
    jumpTo(url) {
      this.$router.push(url); //用go刷新
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
