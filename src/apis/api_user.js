import * as API from "@/apis/index";
/**
 * Created by yqr on 2018/4/13.
 */

export default {
  //查询列表
  findList: params => {
    return API.GET("/api/getUserList", params);
  },
  findById: id => {
    return API.GET(`/api/enterprise/list/${id}`);
  }
};
