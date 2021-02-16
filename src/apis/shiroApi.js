import Axios from "axios";
import * as API from "@/apis/index";

/**
 * 系统认证接口
 */
export default {
  /**
   * 系统登陆
   */
  loginIn: function({ email, password }) {
    var param = new URLSearchParams();
    param.append("email", email);
    param.append("password", password);
    //使用该方式，接收到的值是null，查看传递的参数，是一个json串，也许是这个原因，导致后台匹配不到参数，估计是如果前端采用这种方式传参，
    // 后台的接收参数那里应该是要接收一个json串，然后再解析，具体没有调试，后台的这种接收参数方式不想调整，那么就在前端传参这里在换种方式

    //return Axios.post("/api/shiro-api/login", param);
    //return Axios.post("http://47.103.26.140:3000/mock/42/login", param);
    return Axios.post("/api/login", param);
    // return API.POST("/login", param); //这个需要测试一下，如果可以的话本页面的其他return也要进行一定的修改
  },
  /**
   * 退出登陆
   */
  loginOut: function() {
    return Axios.post("/api/shiro-api/loginout");
  },
  /**
   * 记录登陆日志
   */
  loginLog: function({ ip, city, type }) {
    var param = {
      ip: ip,
      city: city,
      type: type
    };
    return Axios.post("/api/loginlog-api/save", param);
  },
  /**
   * 还原数据
   */
  rollBackTables: function() {
    return Axios.post("/api/loginlog-api/rollBackTables");
  }
};
