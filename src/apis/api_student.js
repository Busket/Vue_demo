import * as API from "@/apis/index";

export default {
  //查询列表
  findList: params => {
    return API.GET("/api/getStudentList", params);
  },
  //添加学生
  addStudent: params => {
    return API.POST("/api/addStudent", params);
  },
  //删除车辆
  deleteStudent: params => {
    return API.GET("/api/deleteStudent", params);
  },
  findStudebtByID: params => {
    return API.GET("/api/selectStudentById", params);
  },
  updateStudent: params => {
    return API.POST("/api/updateStudent", params);
  },
  findStudebtByEmail: params => {
    return API.GET("/api/selectStudentByEmail", params);
  },
  coachFindList: params => {
    return API.GET("/api/coachFindList", params);
  },
};
