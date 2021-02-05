import Axios from "axios";

/**
 * 注册接口
 */
export default {
  /**
   * 系统注册
   */
  // registerIn: function({userName, email, userPhone, password, checkPassword, confirmCode }) {
  //   var param = new URLSearchParams();
  //   param.append("email", email);
  //   param.append("email", email);
  //   param.append("password", password);
  //   //使用该方式，接收到的值是null，查看传递的参数，是一个json串，也许是这个原因，导致后台匹配不到参数，估计是如果前端采用这种方式传参，
  //   // 后台的接收参数那里应该是要接收一个json串，然后再解析，具体没有调试，后台的这种接收参数方式不想调整，那么就在前端传参这里在换种方式
  //
  //   //return Axios.post("/api/shiro-api/login", param);
  //   //return Axios.post("http://47.103.26.140:3000/mock/42/login", param);
  //   return Axios.post("/api/login", param);
  // },
  sendConfirmCode: function({ email, activeCode }) {
    var param = new URLSearchParams();
    param.append("email", email);
    param.append("activeCode", activeCode);
    return Axios.post("/api/emailConfirm", param);
  },
  requestActiveCode: function({ email }) {
    var param = new URLSearchParams();
    param.append("email", email);
    return Axios.post("/api/resendConfirmEmail", param);
  }
};
