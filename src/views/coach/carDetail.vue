<template>
  <div class="warp-main">
    <el-row :span="24" v-loading="loading" element-loading-text="拼命加载中">
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
              <el-input v-model="carData.carNumber" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="车架号" prop="vIN">
              <el-input v-model="carData.vIN" :disabled="true"></el-input> </el-form-item
            ></el-col>
        </el-row>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="负责人" prop="chargeMan" width="60">
              <el-select v-model="carData.chargeMan" placeholder="请选择 " :disabled="true">
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

          <el-col :span="10">
            <el-form-item label="更新时间" prop="update_at" width="60">
              <el-input v-model="carData.update_at" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
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

          <el-col :span="10">
            <el-form-item label="创建时间" prop="create_at">
              <el-input
                v-model="carData.create_at"
                :disabled="true"
              ></el-input> </el-form-item
            ></el-col>
        </el-row>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="品牌" prop="brand">
              <el-input v-model="carData.brand" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <!--        <el-col :span="10">-->
          <!--          <el-form-item label="ID" prop="id">-->
          <!--            <el-input v-model="carData.id" :disabled="true"></el-input> </el-form-item-->
          <!--          ></el-col>-->
        </el-row>
        <el-row :gutter="60">
          <el-row :gutter="20">
            <el-col :span="2" :offset="3">
              <el-button type="primary" @click="submitForm()"
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
      carData: {
        id: "",
        carNumber: "",
        brand: "",
        status: "",
        vIN: "",
        chargeMan: "",
        create_at: "",
        update_at: ""
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
        }
      ],
      chargeMens: [
        //这里的内容后端获取教练科的员工数据
        {
          dept_no: "JLK001",
          name: "小黑"
        }
      ],
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        brand: [{ required: true, message: "品牌不可为空", trigger: "blur" }],
        status: [{ required: true, message: "状态不可为空", trigger: "blur" }],
        VIN: [{ required: true, message: "车架号不可为空", trigger: "blur" }]
      },
      state: ""
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.carData.id = this.$route.query.id; //将获取道德email发送给后端，让后端根据该邮箱查询用户所有信息
    this.getCoach(); //获取教练
    this.fetchData(); //调用接口获取动态数据
  },
  methods: {
    //获取数据
    fetchData() {
      let params = { id: this.carData.id };
      this.loading = true; //调出拼命加载中
      apis.vehicleApi
        .findCarById(params) //还需要写接口
        .then(data => {
          if (data.status === "SUCCESS") {
            console.log(data.carInfo);
            this.carData = data.carInfo; //这里是数据
            this.carData.create_at = this.TimeFormat(this.carData.create_at); //修改时间显示格式
            this.carData.update_at = this.TimeFormat(this.carData.update_at);
            console.log("数据拉取完成！");
            this.setLoding(false);
          }
        })
        .catch(error => {
          this.loading = false;
          this.dialogText = error.message;
          this.dialogVisible = true;
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
    submitForm() {
      var params = new URLSearchParams();
      params.append("id", this.carData.id);
      params.append("CarNumber", this.carData.carNumber);
      params.append("Brand", this.carData.brand);
      params.append("Status", this.carData.status);
      params.append("ChargeMan", this.carData.chargeMan);
      params.append("VIN", this.carData.vIN);

      this.$confirm("此操作将修改车辆信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apis.vehicleApi
            .updateCar(params)
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
    TimeFormat(row) {
      return new Date(parseInt(row)).toLocaleString();
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
