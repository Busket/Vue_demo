<template>
  <!--  <h3>添加用户</h3>-->
  <div class="warp-main">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="userData"
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
                v-for="item in chargeMen"
                :key="item.email"
                :label="item.name"
                :value="item.email"
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
            <el-button type="primary" @click="submitForm(userData)"
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
        id: "1",
        carNumber: "粤A123123",
        brand: "大众",
        status: "",
        VIN: "123456789",
        chargeMan: "",
        creat_at: "2017-03-27",
        update_at: "2017-03-27"
      },
      multipleSelection: [],
      filters: {
        name: ""
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
      chargeMen: [
        //这里的内容需要后端获取教练科的员工数据
        {
          email: "234@qq.com",
          name: "小王"
        },
        {
          email: "1234@qq.com",
          name: "小黑"
        },
        {
          email: "2334@qq.com",
          name: "小张"
        },
        {
          email: "2344@qq.com",
          name: "小李"
        },
        {
          email: "2354@qq.com",
          name: "小飞"
        },
        {
          email: "236@qq.com",
          name: "小刘"
        }
      ]
    };
  },
  methods: {
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
    statusFormat(row) {
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

<style scoped></style>
