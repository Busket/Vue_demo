<template>
  <el-row class="wrap">
    <el-col :span="24" class="wrap-main">
      <div class="first-page">
        <div class="title">欢迎使用<br />畅途驾校信息系统</div>
        <br /><br /><br /><br /><br /><br /><br />
        <div class="youAre">
          您的身份是：
          <div class="coach" v-show="coach">教<span>练</span></div>
          <div class="student" v-show="student">学<span>生</span></div>
          <div class="administration" v-show="administration">
            行<span>政</span>
          </div>
          <div class="superMan" v-show="superMan">超<span>管</span></div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<style>
.title {
  line-height: 1;
  font-size: 150px;
  font-weight: bolder;
  color: #2d8cf0;
}
.youAre {
  line-height: 1;
  font-size: 50px;
  font-weight: bolder;
  color: #2d75f0;
}
.coach {
  line-height: 1;
  font-size: 50px;
  font-weight: bolder;
  color: #ac2df0;
}
.student {
  line-height: 1;
  font-size: 50px;
  font-weight: bolder;
  color: #2df085;
}
.administration {
  line-height: 1;
  font-size: 50px;
  font-weight: bolder;
  color: #f0822d;
}
.superMan {
  line-height: 1;
  font-size: 50px;
  font-weight: bolder;
  color: #f03d2d;
}

.first-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  box-sizing: border-box;
}
.chart-container .el-col {
  padding: 30px 20px;
}
</style>
<script>
export default {
  name: "dashboard",
  data() {
    return {
      chartColumn: null,
      chartBar: null,
      coach: false,
      student: false,
      administration: false,
      superMan: false
    };
  },
  created: function() {
    // 组件创建完后获取数据，
    if (
      JSON.parse(window.sessionStorage.getItem("userInfo")).userJurisdiction ===
      "103"
    ) {
      this.coach = true;
    } else if (
      JSON.parse(window.sessionStorage.getItem("userInfo")).userJurisdiction ===
      "104"
    ) {
      this.administration = true;
    } else if (
      JSON.parse(window.sessionStorage.getItem("userInfo")).userJurisdiction ===
      "102"
    ) {
      this.student = true;
    } else if (
      JSON.parse(window.sessionStorage.getItem("userInfo")).userJurisdiction ===
      "101"
    ) {
      this.superMan = true;
    }
  },
  methods: {}
};
</script>
