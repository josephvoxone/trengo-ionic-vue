import axios from "axios";
import ApiEndpoint from "../helper/apiEndpoint";

export default {
  login(user) {
    return axios({
      method: "post",
      url: ApiEndpoint.TRENGO_API + "/login",
      timeout: 6000,
      data: user,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
