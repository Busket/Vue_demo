<template>
  <div class="warp-main">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="staffData"
      ref="ruleForm"
    >
      <el-row :gutter="60">
        <el-col :span="10">
          <el-form-item label="工号" prop="dept_no" width="60">
            <el-input
              v-model="staffData.dept_no"
              @input="
                staffData.dept_no = staffData.dept_no.replace(/[^\d]/g, '')
              "
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="姓名" prop="name" width="60">
            <el-input v-model="staffData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="10">
          <el-form-item label="邮箱" prop="email" width="60">
            <el-input v-model="staffData.email"></el-input> </el-form-item
        ></el-col>

        <el-col :span="10">
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="staffData.phone"></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="10">
          <el-form-item label="联系地址" prop="address" width="60">
            <el-input v-model="staffData.address"></el-input> </el-form-item
        ></el-col>

        <el-col :span="10">
          <el-form-item label="身份证号" prop="id_no">
            <el-input v-model="staffData.id_no"></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="10">
          <el-form-item label="部门" prop="department">
            <el-input
              v-model="this.showDept"
              :disabled="true"
            ></el-input>
            <!--            <el-select v-model="staffData.department" placeholder="请选择" disable="true">-->
            <!--            <el-option-->
            <!--              v-for="item in dept"-->
            <!--              :key="item.value"-->
            <!--              :label="item.label"-->
            <!--              :value="item.value"-->
            <!--            >-->
            <!--            </el-option>-->
            <!--            </el-select>-->
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="职位" prop="position">
            <el-input v-model="staffData.position"></el-input> </el-form-item
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
            <el-button type="primary" @click="submitForm()">添加</el-button>
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
      keyword: "",
      staffData: {
        id: "",
        dept_no: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        id_no: "",
        department: "",
        position: "",
        creat_at: "",
        update_at: ""
      },
      filters: {
        name: ""
      },
      showDept: ""
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.staffData.department = this.$route.query.department; //将获取道德email发送给后端，让后端根据该邮箱查询用户所有信息
  },
  methods: {
    submitForm() {
      var params = new URLSearchParams();
      params.append("dept_no", this.staffData.dept_no);
      params.append("name", this.staffData.name);
      params.append("email", this.staffData.email);
      params.append("phone", this.staffData.phone);
      params.append("address", this.staffData.address);
      params.append("id_no", this.staffData.id_no);
      params.append("department", this.staffData.department);
      params.append("position", this.staffData.position);

      apis.deptApi
        .addStaff(params)
        .then(data => {
          console.log(data.status);
          if (data.status === "Success") {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.goBack();
            this.setLoding(false);
          } else {
            this.$message({
              type: "info",
              message: "添加失败!"
            });
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message({
            type: "info",
            message: "添加失败!"
          });
          console.log(error);
        });
    },
    setLoding(bool) {
      this.loading = bool;
    },
    transform() {
      switch (this.staffData.department) {
        case "211": {
          this.showDept = "办公室";
          break;
        }
        case "212": {
          this.showDept = "信息中心";
          break;
        }
        case "213": {
          this.showDept = "教练科";
          break;
        }
        case "214": {
          this.showDept = "教务科";
          break;
        }
        case "215": {
          this.showDept = "业务科";
          break;
        }
        case "216": {
          this.showDept = "财务科";
          break;
        }
        case "217": {
          this.showDept = "总务科";
          break;
        }
        case "218": {
          this.showDept = "领导层";
          break;
        }
        default:{
          this.showDept = "未知";
          break;
        }
      }
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

<style scoped></style>
