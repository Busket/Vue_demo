<template>
  <div class="warp-main">
    <el-row :span="24" v-loading="loading" element-loading-text="拼命加载中">
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
                :formatter="updateTimeFormat"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="密码" width="60">
              <!--              <el-input v-model="userData.password"></el-input> </el-form-item>-->
              <el-button type="primary" @click="resetUserPassword()"
                >重置密码</el-button
              ></el-form-item
            >
          </el-col>

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
              <!--              <el-input v-model="userData.jurisdiction"></el-input>-->
              <el-select v-model="userData.jurisdiction" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="激活码" prop="activecode">
              <el-input
                v-model="userData.activecode"
                :disabled="true"
              ></el-input> </el-form-item
          ></el-col>
          <el-button type="primary" @click="active()">一键激活</el-button>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="激活时间" prop="email_verified_at">
              <el-input
                v-model="userData.email_verified_at"
                :disabled="true"
              ></el-input> </el-form-item
          ></el-col>

          <el-row :gutter="100">
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
      labelPosition: "right",
      dialogText: "温馨提示",
      dialogVisible: false,
      loading: false,
      keyword: "用户",
      total: 5,
      currentPage: 1,
      pageSize: 10,
      userData: {
        id: "",
        name: "小黑黑",
        password: "",
        email: "",
        phone: "",
        jurisdiction: "",
        creat_at: "",
        update_at: "",
        activecode: "",
        email_verified_at: ""
      },
      multipleSelection: [],
      state: "",
      options: [
        {
          value: 101,
          label: "超级管理员"
        },
        {
          value: 102,
          label: "学员"
        },
        {
          value: 103,
          label: "教练"
        },
        {
          value: 104,
          label: "行政"
        }
      ]
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.userData.email = this.$route.query.email; //将获取道德email发送给后端，让后端根据该邮箱查询用户所有信息
    this.fetchData(); //调用接口获取动态数据
  },
  methods: {
    //获取数据
    fetchData() {
      this.loading = true; //调出拼命加载中
      let params = { email: this.userData.email };
      apis.userApi
        .findByEmail(params)
        .then(data => {
          console.log(data.userInfo);
          this.userData.id = data.userInfo.id;
          this.userData.name = data.userInfo.name;
          this.userData.password = data.userInfo.password;
          this.userData.email = data.userInfo.email;
          this.userData.phone = data.userInfo.phone;
          this.userData.jurisdiction = data.userInfo.jurisdiction;
          this.userData.creat_at = this.changeTimeFormat(
            data.userInfo.creat_at
          );
          this.userData.update_at = this.changeTimeFormat(
            data.userInfo.update_at
          );
          this.userData.activecode = data.userInfo.activecode;
          this.userData.email_verified_at = this.changeTimeFormat(
            data.userInfo.email_verified_at
          );
          this.setLoding(false);
        })
        .catch(error => {
          this.loading = false;
          this.dialogText = error.message;
          this.dialogVisible = true;
          console.log(error);
        });
    },
    //修改用户
    submitForm() {
      var params = new URLSearchParams();
      params.append("id", this.userData.id);
      params.append("name", this.userData.name);
      params.append("email", this.userData.email);
      params.append("phone", this.userData.phone);
      params.append("jurisdiction", this.userData.jurisdiction);
      console.log(this.userData.id);
      this.$confirm("此操作将修改用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apis.userApi
            .updateUser(params)
            .then(data => {
              console.log(data.message);
              if (data.status === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.fetchData();
              } else {
                this.$message({
                  type: "info",
                  message: "修改失败!"
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
                message: "修改失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "修改取消"
          });
        });
    },
    setLoding(bool) {
      this.loading = bool;
    },
    changeTimeFormat(time) {
      return new Date(parseInt(time)).toLocaleString();
    },
    //一键激活
    active() {
      var params = new URLSearchParams();
      params.append("email", this.userData.email);
      params.append("activeCode", this.userData.activecode);
      this.$confirm("此操作将一键激活该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apis.userApi
            .active(params)
            .then(data => {
              console.log(data.message);
              if (data.status === "Success") {
                this.$message({
                  type: "success",
                  message: "激活成功!"
                });
                this.fetchData();
              } else {
                this.$message({
                  type: "info",
                  message: "激活失败!"
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
                message: "激活失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "激活取消"
          });
        });
    },
    //重置密码
    resetUserPassword() {
      let params = {
        email: this.userData.email //当前页
      };
      this.$confirm("此操作将重置用户该密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apis.userApi
            .resetUserPassword(params) //在这里插入后端浏览列表
            .then(data => {
              console.log(data.message);
              if (data.status === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "重置成功!"
                });
              } else {
                this.$message({
                  type: "info",
                  message: "重置失败!"
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
                message: "重置失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "重置取消"
          });
        });
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
