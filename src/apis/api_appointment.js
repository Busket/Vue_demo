import * as API from "@/apis/index";

export default {
  // //查询列表
  // findList: params => {
  //   return API.GET("/api/getStudentList", params);
  // },
  //新建预约
  makeAppointment: params => {
    return API.POST("/api/makeAppointment", params);
  },
  //学生获取自己的预约
  studentGetAp: params => {
    return API.GET("/api/studentGetAp", params);
  },
  coachFindApList: params => {
    return API.GET("/api/coachFindApList", params);
  },
  // //删除车辆
  // deleteStudent: params => {
  //   return API.GET("/api/deleteStudent", params);
  // },
  // findStudebtByID: params => {
  //   return API.GET("/api/selectStudentById", params);
  // },
  // updateStudent: params => {
  //   return API.POST("/api/updateStudent", params);
  // },
  // findStudebtByEmail: params => {
  //   return API.GET("/api/selectStudentByEmail", params);
  // },
  deleteAppointment: params => {
    return API.GET("/api/deleteAppointment", params);
  },

};
