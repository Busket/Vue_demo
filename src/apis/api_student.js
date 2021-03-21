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
  // //删除车辆
  // deleteCar: params => {
  //   return API.GET("/api/deleteCar", params);
  // },
  // findCarById: params => {
  //   return API.GET("/api/selectCarById", params);
  // },
  // updateCar: params => {
  //   return API.POST("/api/updateCar", params);
  // },
};
