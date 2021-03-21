import * as API from "@/apis/index";

export default {
  //查询列表
  findStaffList: params => {
    return API.GET("/api/getStaffList", params);
  },
  //添加车辆
  addStaff: params => {
    return API.POST("/api/addStaff", params);
  },
  //删除车辆
  deleteStaff: params => {
    return API.GET("/api/deleteStaff", params);
  },
  findStaffById: params => {
    return API.GET("/api/selectStaffById", params);
  },
  updateStaff: params => {
    return API.POST("/api/updateStaff", params);
  },
  getCoach: params => {
    return API.GET("/api/selectCoach", params);
  },
};
