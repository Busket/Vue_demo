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
    return API.GET(`/api/enterprise/list/${params}`);
  },
  updateUser: params => {
    return API.GET(`/api/enterprise/list/${params}`);
  },
  addUser: params => {
    return API.POST("/api/addUser/", params);
  },
  deleteUser: params => {
    return API.GET("/api/deleteUser/", params);
  }
};
