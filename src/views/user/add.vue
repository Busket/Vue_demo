<template>
  <!--  <h3>添加用户</h3>-->
  <div class="warp-main">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="userData"
      :rules="rules"
      ref="addForm"
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

        <!--        <el-col :span="10">-->
        <!--          <el-form-item label="激活码" prop="activecode">-->
        <!--            <el-input v-model="userData.activecode"></el-input> </el-form-item-->
        <!--        ></el-col>-->

        <!--        <el-col :span="10">-->
        <!--          <el-form-item label="更新时间" prop="update_at" width="60">-->
        <!--            <el-input v-model="userData.update_at" :disabled="true"></el-input>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-row>

      <el-row :gutter="60">
        <el-col :span="10">
          <el-form-item label="密码" prop="password" width="60">
            <el-input v-model="userData.password"></el-input> </el-form-item
        ></el-col>

        <!--        <el-col :span="10">-->
        <!--          <el-form-item label="创建时间" prop="creat_at">-->
        <!--            <el-input-->
        <!--              v-model="userData.creat_at"-->
        <!--              :disabled="true"-->
        <!--            ></el-input> </el-form-item-->
        <!--        ></el-col>-->
      </el-row>

      <el-row :gutter="60">
        <!--        <el-col :span="10">-->
        <!--          <el-form-item label="权限" prop="jurisdiction">-->
        <!--            <el-input v-model="userData.jurisdiction"></el-input>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->

        <el-col :span="10">
          <el-form-item label="权限" prop="jurisdiction">
            <el-select v-model="userData.jurisdiction" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select></el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="60">
        <!--        <el-col :span="10">-->
        <!--          <el-form-item label="激活时间" prop="email_verified_at">-->
        <!--            <el-input-->
        <!--              v-model="userData.email_verified_at"-->
        <!--              :disabled="true"-->
        <!--            ></el-input> </el-form-item-->
        <!--        ></el-col>-->

        <el-row :gutter="100">
          <el-col :span="2" :offset="3">
            <el-button type="primary" @click="submitForm('addForm')"
              >添加</el-button
            >
          </el-col>

          <el-col :span="3">
            <el-button type="info" @click="goBack">返回</el-button>
          </el-col>
        </el-row>
      </el-row>
    </el-form>

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
        name: "",
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
      filters: {
        name: ""
      },
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
      ],
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        name: [{ required: true, message: "姓名不可为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" }
        ],
        email: [{ required: true, message: "邮箱不可为空", trigger: "blur" }],
        phone: [
          { required: true, message: "联系方式不可为空", trigger: "blur" }
        ],
        jurisdiction: [
          { required: true, message: "权限不可为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = new URLSearchParams();
          params.append("name", this.userData.name);
          params.append("email", this.userData.email);
          params.append("phone", this.userData.phone);
          params.append("password", this.userData.password);
          params.append("jurisdiction", this.userData.jurisdiction);
          params.append("activecode", "Actived");

          // var params = {
          //   name: this.userData.name,
          //   email: this.userData.email,
          //   phone: this.userData.phone,
          //   password: this.userData.password,
          //   jurisdiction: this.userData.jurisdiction,
          //   activecode: "Actived"
          // };
          console.log(params);
          apis.userApi
            .addUser(params)
            .then(data => {
              console.log(data.status);
              if (data.status === "Success") {
                this.dialogText = data.message;
                this.dialogVisible = true;
                this.pathTo("list");
              } else {
                this.dialogText = data.message;
                this.dialogVisible = true;
              }
            })
            .catch(error => {
              this.dialogText = error.message;
              this.dialogVisible = true;
              console.log(error);
            });
        } else {
          this.dialogText = "请确认输入信息完整！";
          this.dialogVisible = true;
          return false;
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    pathTo(data) {
      this.$emit("userManager", data);
    }
  }
};
</script>

<style scoped></style>
