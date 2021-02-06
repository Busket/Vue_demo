import Axios from "axios";

/**
 * 注册接口
 */
export default {
  /**
   * 系统注册
   */
  registerIn: function({userName, email, userPhone, password }) {
    var param = new URLSearchParams();
    param.append("name", userName);
    param.append("email", email);
    param.append("phone", userPhone);
    param.append("password", password);
    return Axios.post("/api/register", param);
  },
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
