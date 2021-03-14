import * as API from "@/apis/index";
/**
 * Created by yqr on 2018/4/13.
 */

export default {
  //查询列表
  findList: params => {
    return API.GET("/api/getUserList", params);
  },
  findByEmail: params => {
    return API.GET("/api/selectUserByEmail", params);
  },
  updateUser: params => {
    return API.POST("/api/updateUser/", params);
  },
  addUser: params => {
    return API.POST("/api/addUser/", params);
  },
  deleteUser: params => {
    return API.GET("/api/deleteUser/", params);
  },
  resetUserPassword: params => {
    return API.GET("/api/resetUserPassword/", params);
  },
  active: params => {
    return API.POST("/api/emailConfirm", params);
  }
};
