import * as API from "@/apis/index";

export default {
  sendInformation: params => {
    return API.POST("/api/sendInformation", params);
  },
};
