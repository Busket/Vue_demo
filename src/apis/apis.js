import shiroApi from "./shiroApi";
import registerApi from "@/apis/registerApi";
import forgetPasswordApi from "@/apis/forgetPasswordApi";
import userApi from "@/apis/api_user"
import vehicleApi from "@/apis/api_vehicle"
/**
 * 接口汇总
 */
export default {
  // /**用户,角色,组织等管理接口 */
  // adminApi: adminApi,
  /**认证接口 */
  shiroApi: shiroApi,
  /**注册接口 */
  registerApi: registerApi,
  /**忘记密码接口 */
  forgetPasswordApi: forgetPasswordApi,
  /**用户接口 **/
  userApi: userApi,
  /**车辆接口 */
  vehicleApi: vehicleApi
};
