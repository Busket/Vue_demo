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
            <el-input v-model="staffData.dept_no" :disabled="true"></el-input>
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
            <el-input v-model="this.showDept" :disabled="true"></el-input>
            <!--            <el-select-->
            <!--              v-model="staffData.department"-->
            <!--              placeholder="请选择"-->
            <!--              disable="true"-->
            <!--            >-->
            <!--              <el-option-->
            <!--                v-for="item in dept"-->
            <!--                :key="item.value"-->
            <!--                :label="item.label"-->
            <!--                :value="item.value"-->
            <!--              >-->
            <!--              </el-option>-->
            <!--            </el-select>-->
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="职位" prop="position">
            <el-input v-model="staffData.position"></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="10">
          <el-form-item label="更新时间" prop="update_at" width="60">
            <el-input v-model="staffData.update_at" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="年龄" prop="age">
            <el-input
              v-model="staffData.age"
              @input="staffData.age = staffData.age.replace(/[^\d]/g, '')"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="创建时间" prop="create_at">
            <el-input
              v-model="staffData.create_at"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <el-row :gutter="20">
          <el-col :span="2" :offset="3">
            <el-button type="primary" @click="submitForm()">修改</el-button>
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
        age: "",
        address: "",
        id_no: "",
        department: "",
        position: "",
        create_at: "",
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
    this.staffData.id = this.$route.query.id;
    this.staffData.department = this.$route.query.department; //将获取道德email发送给后端，让后端根据该邮箱查询用户所有信息
    this.fetchData(); //调用接口获取动态数据
  },
  methods: {
    //获取数据
    fetchData() {
      let params = {
        id: this.staffData.id,
        department: this.staffData.department
      };
      this.loading = true; //调出拼命加载中
      console.log(this.staffData.department);
      console.log(this.staffData.id);
      apis.deptApi
        .findStaffById(params)
        .then(data => {
          if (data.status === "SUCCESS") {
            console.log(data.staffInfo);
            this.staffData = data.staffInfo; //这里是数据
            this.staffData.create_at = this.TimeFormat(
              this.staffData.create_at
            ); //修改时间显示格式
            this.staffData.update_at = this.TimeFormat(
              this.staffData.update_at
            );
            console.log(this.staffData.department);
            this.transform(); //更改部门显示数据
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
    submitForm() {
      var params = new URLSearchParams();
      params.append("id", this.staffData.id);
      params.append("name", this.staffData.name);
      params.append("email", this.staffData.email);
      params.append("phone", this.staffData.phone);
      params.append("age", this.staffData.age);
      params.append("address", this.staffData.address);
      params.append("department", this.staffData.department);
      params.append("id_no", this.staffData.id_no);
      params.append("position", this.staffData.position);
      this.$confirm("此操作将修改员工信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apis.deptApi
            .updateStaff(params)
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
    TimeFormat(row) {
      return new Date(parseInt(row)).toLocaleString();
    },
    setLoding(bool) {
      this.loading = bool;
    },
    transform() {
      switch (this.staffData.department) {
        case 211: {
          this.showDept = "办公室";
          break;
        }
        case 212: {
          this.showDept = "信息中心";
          break;
        }
        case 213: {
          this.showDept = "教练科";
          break;
        }
        case 214: {
          this.showDept = "教务科";
          break;
        }
        case 215: {
          this.showDept = "业务科";
          break;
        }
        case 216: {
          this.showDept = "财务科";
          break;
        }
        case 217: {
          this.showDept = "总务科";
          break;
        }
        case 218: {
          this.showDept = "领导层";
          break;
        }
        default: {
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
