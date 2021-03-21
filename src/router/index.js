import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TopNav from "@/components/nav/topNav.vue";
import LeftNav from "@/components/nav/leftNav.vue";
//我的设置当中的东西
import Dashboard from "@/views/workbench/dashboard.vue";
import MySettings from "@/views/workbench/mySettings.vue";
import Plan from "@/views/workbench/plan/plan.vue";
import Mission from "@/views/workbench/mission/mission.vue";
import Appointment from "@/views/workbench/appointment/index";
import AppointmentDetail from "@/views/workbench/appointment/detail";
//学生管理当中的东西
import StudentList from "@/views/student/index";
import StudentDetail from "@/views/student/detail";
import AddStudent from "@/views/student/add";
//用户管理当中的东西
import UserList from "@/views/user/index";
import UserDetail from "@/views/user/detail";
import AddUser from "@/views/user/add";
//车辆管理当中的东西
import VehicleManage from "@/views/vehicle/index.vue";
import VehicleDetail from "@/views/vehicle/detail";
import VehicleAdd from "@/views/vehicle/add";
//部门管理
import leadership from "@/views/dept/leadership";
import academicAffairsSection from "@/views/dept/academicAffairsSection";
import businessDepartment from "@/views/dept/businessDepartment";
import coachingSection from "@/views/dept/coachingSection";
import financeSection from "@/views/dept/financeSection";
import generalAffairsSection from "@/views/dept/generalAffairsSection";
import informationCenter from "@/views/dept/informationCenter";
import office from "@/views/dept/office";
import AddStaff from "@/views/dept/add";
import StaffDetail from "@/views/dept/detail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    type: "Home",
    name: "Home",
    redirect: "/dashboard",
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "首页",
        components: {
          default: Dashboard,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: true //左侧栏是否显示
      },
      {
        path: "/appointment/index",
        name: "练车预约",
        components: {
          default: Appointment,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "el-icon-menu", // 图标样式class
        menuShow: true //左侧栏是否显示
      },
      {
        path: "/appointment/detail",
        name: "练车预约",
        components: {
          default: AppointmentDetail,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "el-icon-menu", // 图标样式class
        menuShow: false //左侧栏是否显示
      },
      {
        path: "/mySet",
        components: {
          default: MySettings,
          top: TopNav,
          aside: LeftNav
        },
        name: "我的",
        iconCls: "el-icon-menu",
        menuShow: true,
        children: [
          {
            path: "/mySet/plan",
            component: Plan,
            name: "练车计划",
            menuShow: true
          },
          {
            path: "/mySet/mission",
            component: Mission,
            name: "任务",
            menuShow: true
          }
          // ,{
          //   path: "/mySet/maillist",
          //   component: Maillist,
          //   name: "通讯录",
          //   menuShow: true
          // }
        ]
      }
    ]
  },
  {
    path: "/userManager",
    type: "userManager",
    name: "userManager",
    component: Home,
    redirect: "/userManager/list",
    menuShow: true,
    children: [
      {
        path: "/userManager/list",
        name: "用户浏览",
        components: {
          default: UserList,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true,
        iconCls: "el-icon-setting",
        menuShow: true
      },
      {
        path: "/userManager/detail",
        name: "用户详情",
        components: {
          default: UserDetail,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true,
        iconCls: "el-icon-setting",
        menuShow: false
      },
      {
        path: "/userManager/add",
        name: "添加用户",
        components: {
          default: AddUser,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true,
        iconCls: "el-icon-setting",
        menuShow: false
      }
      // {
      //   path: "/enterprise/detail",
      //   name: "企业详情",
      //   components: {
      //     default: EnterpriseDetail,
      //     top: TopNav,
      //     aside: LeftNav
      //   },
      //   leaf: true,
      //   iconCls: "el-icon-setting",
      //   menuShow: false
      // },
      // {
      //   path: "/enterprise/add",
      //   name: "添加企业",
      //   components: {
      //     default: EnterpriseAdd,
      //     top: TopNav,
      //     aside: LeftNav
      //   },
      //   leaf: true,
      //   iconCls: "el-icon-menu",
      //   menuShow: true
      // },
      // {
      //   path: "/enterprise/validate",
      //   name: "企业认证",
      //   components: {
      //     default: EnterpriseValidate,
      //     top: TopNav,
      //     aside: LeftNav
      //   },
      //   leaf: true,
      //   iconCls: "el-icon-menu",
      //   menuShow: true
      // }
    ]
  },
  {
    path: "/vehicleManager",
    type: "enterprise",
    name: "vehicle",
    component: Home,
    redirect: "/vehicle/list",
    menuShow: true,
    children: [
      {
        path: "/vehicle/list",
        name: "车辆信息",
        components: {
          default: VehicleManage,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: true
      },
      {
        path: "/vehicle/add",
        name: "车辆信息",
        components: {
          default: VehicleAdd,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: false
      },
      {
        path: "/vehicle/detail",
        name: "车辆信息",
        components: {
          default: VehicleDetail,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: false
      }
    ]
  },
  {
    path: "/deptManager",
    type: "enterprise",
    name: "dept",
    component: Home,
    redirect: "/dept/leadership",
    menuShow: true,
    children: [
      {
        path: "/dept/leadership",
        name: "领导层",
        components: {
          default: leadership,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: true
      },
      {
        path: "/dept/office",
        name: "办公室",
        components: {
          default: office,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: true
      },
      {
        path: "/dept/informationCenter",
        name: "信息中心",
        components: {
          default: informationCenter,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: true
      },
      {
        path: "/dept/coachingSection",
        name: "教练科",
        components: {
          default: coachingSection,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: true
      },
      {
        path: "/dept/academicAffairsSection",
        name: "教务科",
        components: {
          default: academicAffairsSection,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: true
      },
      {
        path: "/dept/businessDepartment",
        name: "业务科",
        components: {
          default: businessDepartment,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: true
      },
      {
        path: "/dept/financeSection",
        name: "财务科",
        components: {
          default: financeSection,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: true
      },
      {
        path: "/dept/generalAffairsSection",
        name: "总务科",
        components: {
          default: generalAffairsSection,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true, // 只有一个节点
        iconCls: "iconfont icon-home", // 图标样式class
        menuShow: true
      },
      {
        path: "/dept/add",
        name: "添加员工",
        components: {
          default: AddStaff,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true,
        iconCls: "el-icon-setting",
        menuShow: false
      },
      {
        path: "/dept/detail",
        name: "添加员工",
        components: {
          default: StaffDetail,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true,
        iconCls: "el-icon-setting",
        menuShow: false
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/studentManager",
    type: "studentManager",
    name: "studentManager",
    component: Home,
    redirect: "/studentManager/list",
    menuShow: true,
    children: [
      {
        path: "/studentManager/list",
        name: "学生浏览",
        components: {
          default: StudentList,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true,
        iconCls: "el-icon-setting",
        menuShow: true
      },
      {
        path: "/studentManager/detail",
        name: "学生详情",
        components: {
          default: StudentDetail,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true,
        iconCls: "el-icon-setting",
        menuShow: false
      },
      {
        path: "/studentManager/add",
        name: "添加学生",
        components: {
          default: AddStudent,
          top: TopNav,
          aside: LeftNav
        },
        leaf: true,
        iconCls: "el-icon-setting",
        menuShow: false
      }
    ]
  },
  {
    path: "/loginPage",
    name: "LoginPage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginPage.vue")
  },
  {
    path: "/404",
    component: resolve => require(["../components/common/404.vue"], resolve)
  },
  {
    path: "/403",
    component: resolve => require(["../components/common/403.vue"], resolve)
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
