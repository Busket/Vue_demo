<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"
          ><img src="../../assets/logo.png" style="padding-left:8px;"
        /></a>
      </div>
      <div class="topbar-logos">
        <a href="/" style="color: #fff;"
          ><span v-show="!$store.state.collapsed">畅途驾校</span></a
        >
      </div>
      <div class="topbar-title">
        <!-- 注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
        <!--        这里是 首页 的情况下，顶端的显示-->
        <el-row>
          <!--        <el-row v-show="$store.state.topNavState === 'Home'">-->
          <el-col :span="24">
            <el-menu
              :default-active="defaultActiveIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              :router="true"
            >
              <el-menu-item index="/student" v-show="student"
                >学生</el-menu-item
              >
              <!--              行政的-->
              <el-menu-item
                index="/administration"
                v-show="administrationVisible"
                >日常管理</el-menu-item
              >
              <el-menu-item index="/coach" v-show="coach">教练</el-menu-item>
              <el-menu-item index="/userManager" v-show="userManagerVisible"
                >用户管理</el-menu-item
              >
              <el-menu-item
                index="/vehicleManager"
                v-show="vehicleManagerVisible"
                >车辆管理</el-menu-item
              >
              <el-menu-item index="/deptManager" v-show="deptManagerVisible"
                >部门管理</el-menu-item
              >
              <el-menu-item
                index="/studentManager"
                v-show="studentManagerVisible"
                >学生管理</el-menu-item
              >

              <!-- 这里是 首页 顶端栏的显示的按钮，可以在这里进行修改 -->
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!--      这里是右上角的按钮，到时在这里添加接口！！！-->
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i> {{ nickname }}
            <i class="el-icon-caret-bottom"></i
          ></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/user/profile')">
                <span style="color: #555;font-size: 14px;">个人信息</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/user/changepwd')">
                <span style="color: #555;font-size: 14px;">修改密码</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import "element-ui/lib/theme-chalk/display.css";
import { road } from "@/road";

export default {
  data() {
    return {
      loading: false,
      companyName: "",
      nickname: "",
      defaultActiveIndex: "/",
      homeMenu: false,
      messageCount: 5,
      userManagerVisible: false,
      vehicleManagerVisible: false,
      deptManagerVisible: false,
      studentManagerVisible: false,
      student: false,
      coach: false,
      administrationVisible: false
    };
  },
  created() {
    road.$on("setNickName", text => {
      this.nickname = text;
    });

    road.$on("goto", url => {
      if (url === "/login") {
        sessionStorage.removeItem("access-user");
        this.$router.push(url);
      }
    });
    // 组件创建完后获取数据
    this.fetchNavData();
    // 组件创建完后获取数据，
    if (
      JSON.parse(window.sessionStorage.getItem("userInfo")).userJurisdiction ===
      "103"
    ) {
      //教练标签
      this.coach = true;
    } else if (
      JSON.parse(window.sessionStorage.getItem("userInfo")).userJurisdiction ===
      "104"
    ) {
      //行政
      this.vehicleManagerVisible = true;
      this.deptManagerVisible = true;
      this.administrationVisible = true;
    } else if (
      JSON.parse(window.sessionStorage.getItem("userInfo")).userJurisdiction ===
      "102"
    ) {
      this.student = true;
    } else if (
      JSON.parse(window.sessionStorage.getItem("userInfo")).userJurisdiction ===
      "101"
    ) {
      this.userManagerVisible = true;
      this.vehicleManagerVisible = true;
      this.deptManagerVisible = true;
      this.studentManagerVisible = true;
    }
  },
  methods: {
    jumpTo(url) {
      this.$router.push(url); //用go刷新
    },
    handleSelect(index) {
      this.defaultActiveIndex = index;
    },
    fetchNavData() {
      // 初始化菜单激活项
      let cur_path = this.$route.path; //获取当前路由
      let routers = this.$router.options.routes; // 获取路由对象
      let nav_type = "",
        nav_name = "";
      for (var i = 0; i < routers.length; i++) {
        let children = routers[i].children;
        if (children) {
          for (let j = 0; j < children.length; j++) {
            if (children[j].path === cur_path) {
              nav_type = routers[i].type;
              nav_name = routers[i].name;
              break;
            }
            // 如果该菜单下还有子菜单
            if (children[j].children) {
              let grandChildren = children[j].children;
              for (let z = 0; z < grandChildren.length; z++) {
                if (grandChildren[z].path === cur_path) {
                  nav_type = routers[i].type;
                  nav_name = routers[i].name;
                  break;
                }
              }
            }
          }
        }
      }
      this.$store.state.topNavState = nav_type;
      this.$store.state.leftNavState = nav_name;
      if (nav_type == "home") {
        this.defaultActiveIndex = "/";
      } else {
        this.defaultActiveIndex = "/" + nav_name + "Manager";
      }
    },
    logout() {
      //logout
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonClass: "el-button--warning"
      })
        .then(() => {
          //确认
          sessionStorage.removeItem("userInfo");
          // road.$emit("goto", "/loginPage");
          this.$router.push("/loginPage");
        })
        .catch(() => {});
    }
  },
  mounted() {
    let user = window.sessionStorage.getItem("userInfo");
    if (user) {
      user = JSON.parse(user);
      this.nickname = user.nickname || "";
      this.companyName = user.companyName || "";
    }
  },
  watch: {
    $route: function(to, from) {
      // 路由改变时执行
      //console.info("to.path:" + to.path);
      this.fetchNavData();
    }
  }
};
</script>
