import Axios from "axios";

/**
 * 注册接口
 */
export default {
  /**
   * 系统注册
   */
  forgetPassword: function({ email, phone }) {
    var param = new URLSearchParams();
    param.append("email", email);
    param.append("phone", phone);
    return Axios.post("/api/forgetPassword", param);
  }
  // requestActiveCode: function({ email }) {
  //   var param = new URLSearchParams();
  //   param.append("email", email);
  //   return Axios.post("/api/resendConfirmEmail", param);
  // }
};
