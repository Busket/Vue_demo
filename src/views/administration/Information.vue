<template>
  <el-dialog
    title="信息平台"
    :visible.sync="visible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="handleClose"
    v-loading="loading"
    element-loading-text="邮件发送中..."
  >
    <el-form :model="InformationData" :rules="rules" ref="InformationForm">
      <el-form-item
        label="姓名："
        prop="name"
        :label-width="formLabelWidth"
        v-show="name !== ''"
      >
        <el-input
          v-model="name"
          auto-complete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="工号"
        prop="coach_no"
        :label-width="formLabelWidth"
        v-show="coach_no !== ''"
      >
        <el-input
          v-model="coach_no"
          auto-complete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="车牌号码："
        prop="car_no"
        :label-width="formLabelWidth"
        v-show="car_no !== ''"
      >
        <el-input
          v-model="car_no"
          auto-complete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <el-form-item label="日期：" prop="date" :label-width="formLabelWidth">
        <el-date-picker
          v-model="InformationData.date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          :picker-options="pickerOptions0"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="原因：" prop="reason" :label-width="formLabelWidth">
        <el-input
          v-model="InformationData.reason"
          type="textarea"
          placeholder="请填写原因"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="handleClose">取消</el-button>
      <el-button type="primary" @click="SubmitForm('InformationForm')"
        >提交</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import apis from "@/apis/apis";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    coach_no: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    car_no: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      InformationData: {
        coachName: "",
        coach_no: "",
        car_no: "",
        reason: "",
        date: ""
      },
      nameVisible: true,
      coachNoVisible: true,
      carVisible: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      formLabelWidth: "120px",
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        date: [{ required: true, message: "日期不可为空", trigger: "blur" }],
        reason: [{ required: true, message: "原因不可为空", trigger: "blur" }]
      },
      loading: false
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
  },
  methods: {
    SubmitForm(formName) {
      console.log(this.coach_no);
      console.log(this.car_no);
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          var params = new URLSearchParams();
          params.append("name", this.name);
          params.append("coach_no", this.coach_no);
          params.append("car_no", this.car_no);
          params.append("date", this.InformationData.date.toString());
          params.append("reason", this.InformationData.reason);
          apis.informationApi
            .sendInformation(params)
            .then(data => {
              console.log(data.status);
              if (data.status === "Success") {
                this.loading = false;
                this.handleClose();
                this.$message({
                  type: "success",
                  message: data.message
                });
              } else if (data.status === "Warm") {
                this.loading = false;
                this.handleClose();
                this.$alert(
                  data.sendFailStu,
                  "部分学员信息发送不成功！请电话通知！",
                  {
                    confirmButtonText: "确定"
                    // callback: action => {
                    //   this.$message({
                    //     type: "info",
                    //     message: `action: ${action}`
                    //    });
                    // }
                  }
                );
              }
            })
            .catch(error => {
              this.loading = false;
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
    // 关闭
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
