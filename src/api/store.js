import axios from "axios";
import ApiEndpoint from "../helper/apiEndpoint";
import { userService } from "@/service/user";

const user = JSON.parse(userService.getItem() || "{}");

export default {
  getAllStore(input) {
    return axios({
      method: "get",
      url:
        ApiEndpoint.TRENGO_API +
        "/store/all?kota=" +
        input.kota.toLowerCase() +
        "&kodepos=" +
        input.kodepos,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  setStore(input) {
    input = Object.assign({ loguser: user.username }, input);
    return axios({
      method: "put",
      url: ApiEndpoint.TRENGO_API + "/store/getunit",
      data: input,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
