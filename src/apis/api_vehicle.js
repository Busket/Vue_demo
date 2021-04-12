import * as API from "@/apis/index";

export default {
  //查询列表
  findList: params => {
    return API.GET("/api/getCarList", params);
  },
  //添加车辆
  addCar: params => {
    return API.POST("/api/addCar", params);
  },
  //删除车辆
  deleteCar: params => {
    return API.GET("/api/deleteCar", params);
  },
  findCarById: params => {
    return API.GET("/api/selectCarById", params);
  },
  updateCar: params => {
    return API.POST("/api/updateCar", params);
  },
  studentGetCars: params => {
    return API.GET("/api/studentGetCars", params);
  },
};
