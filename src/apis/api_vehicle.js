import * as API from "@/apis/index";

export default {
  //查询列表
  findList: params => {
    return API.GET("/api/getCarList", params);
  }
};
