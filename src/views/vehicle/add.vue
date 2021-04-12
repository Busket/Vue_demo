<template>
  <!--  <h3>添加用户</h3>-->
  <div class="warp-main">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="carData"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row :gutter="60">
        <el-col :span="10">
          <el-form-item label="车牌号码" prop="carNumber" width="60">
            <el-input v-model="carData.carNumber"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="车架号" prop="VIN">
            <el-input v-model="carData.VIN"></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="10">
          <el-form-item label="负责人" prop="chargeMan" width="60">
            <!--            <el-input v-model="carData.chargeMan"></el-input> -->
            <el-select v-model="carData.chargeMan" placeholder="请选择">
              <el-option
                v-for="item in chargeMens"
                :key="item.dept_no"
                :label="item.name"
                :value="item.dept_no"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!--        <el-col :span="10">-->
        <!--          <el-form-item label="更新时间" prop="update_at" width="60">-->
        <!--            <el-input v-model="carData.update_at" :disabled="true"></el-input>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-row>

      <el-row :gutter="60">
        <el-col :span="10">
          <el-form-item label="状态" prop="status" width="60">
            <el-select v-model="carData.status" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </el-form-item
        ></el-col>

        <!--        <el-col :span="10">-->
        <!--          <el-form-item label="创建时间" prop="creat_at">-->
        <!--            <el-input-->
        <!--              v-model="carData.creat_at"-->
        <!--              :disabled="true"-->
        <!--            ></el-input> </el-form-item-->
        <!--        ></el-col>-->
      </el-row>

      <el-row :gutter="60">
        <el-col :span="10">
          <el-form-item label="品牌" prop="brand">
            <el-input v-model="carData.brand"></el-input>
          </el-form-item>
        </el-col>

        <!--        <el-col :span="10">-->
        <!--          <el-form-item label="ID" prop="id">-->
        <!--            <el-input v-model="carData.id" :disabled="true"></el-input> </el-form-item-->
        <!--          ></el-col>-->
      </el-row>
      <el-row :gutter="60">
        <!--        <el-col :span="10">-->
        <!--          <el-form-item label="激活时间" prop="email_verified_at">-->
        <!--            <el-input-->
        <!--              v-model="userData.email_verified_at"-->
        <!--              :disabled="true"-->
        <!--            ></el-input> </el-form-item-->
        <!--          ></el-col>-->

        <el-row :gutter="20">
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
      keyword: "用户",
      total: 5,
      currentPage: 1,
      pageSize: 10,
      carData: {
        id: "",
        carNumber: "",
        brand: "",
        status: "",
        VIN: "",
        chargeMan: ""
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        brand: [{ required: true, message: "品牌不可为空", trigger: "blur" }],
        status: [{ required: true, message: "状态不可为空", trigger: "blur" }],
        VIN: [{ required: true, message: "车架号不可为空", trigger: "blur" }]
      },
      options: [
        {
          value: 112,
          label: "科目2教练车"
        },
        {
          value: 113,
          label: "科目3教练车"
        },
        {
          value: 114,
          label: "接送车"
        },
        {
          value: 119,
          label: "待维修"
        },
        {
          value: 100,
          label: "外用"
        },
        {
          value: 222,
          label: "其他"
        },
        {
          value: 110,
          label: "停用"
        }
      ],
      chargeMens: [
        //这里的内容需要后端获取教练科的员工数据
        {
          dept_no: "JLK001",
          name: "小黑"
        }
      ]
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.getCoach(); //调用接口获取动态数据
  },
  methods: {
    submitForm() {
      var params = new URLSearchParams();
      params.append("CarNumber", this.carData.carNumber);
      params.append("Brand", this.carData.brand);
      params.append("Status", this.carData.status);
      params.append("ChargeMan", this.carData.chargeMan);
      params.append("VIN", this.carData.VIN);
      apis.vehicleApi
        .addCar(params) //还需要写接口
        .then(data => {
          console.log(data.status);
          if (data.status=="Success"){
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.goBack();
            this.setLoding(false);
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
    getCoach() {
      apis.deptApi
        .getCoach() //在这里插入后端浏览列表
        .then(data => {
          if (data.status === "SUCCESS") {
            this.chargeMens = data.staffInfo; //获取教练列表
          }
        })
        .catch(error => {
          this.loading = false;
          this.dialogText = error.message;
          this.dialogVisible = true;
          console.log(error);
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped></style>
