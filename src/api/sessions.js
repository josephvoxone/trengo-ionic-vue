import axios from "axios";
import ApiEndpoint from "../helper/apiEndpoint";
import { userService } from "@/service/user";

const user = JSON.parse(userService.getItem() || "{}");

export default {
  getAllSession(search, filter, length) {
    if (length) search += "&skip=" + length;
    if (filter?.status) search += "&status=" + filter.status;
    if (filter?.sort) search += "&sortkode=true&orderbydata=" + filter.sort;

    console.log(search);
    // http://localhost:7451/api/order/all?sorttgl=true&orderbydata=asc&status=03

    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/order/all?sesi=" + search,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getDataSession(input) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/user/session?sesi=" + input,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getdetailorder(vid) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/order/order-detail?sesi=" + vid,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getIDSession() {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/user/get/auto-session",
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getPhone(input) {
    let filter = "all";
    if (input == "") filter = "get-all";

    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/user/" + filter + "?phone=" + input,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getUserSession(input) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/user/all?sesi=" + input,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  addSession(input) {
    //Add Log User
    input = Object.assign({ loguser: user.username }, input);
    console.log("Cek Log", input);
    console.log("Cek Source", user.username);

    return axios({
      method: "post",
      url: ApiEndpoint.TRENGO_API + "/user/simpan",
      timeout: 3000,
      data: input,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  // ====================== CART ======================
  createTrans(input) {
    input = Object.assign({ loguser: user.username }, input);
    return axios({
      method: "put",
      url: ApiEndpoint.TRENGO_API + "/cart/proses",
      // timeout: 5000,
      data: input,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  addItem(input) {
    //Add Log User
    input = Object.assign({ loguser: user.username }, input);

    return axios({
      method: "post",
      url: ApiEndpoint.TRENGO_API + "/cart/simpan-detail-update",
      // timeout: 5000,
      data: input,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  editItem(input) {
    //Add Log User
    input = Object.assign({ loguser: user.username }, input);
    return axios({
      method: "post",
      url: ApiEndpoint.TRENGO_API + "/cart/simpan-detail",
      // timeout: 5000,
      data: input,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getDetailCart(input) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/cart/all?sesi=" + input,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getHeaderCart(input) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/order/all?sesi=" + input,
      // timeout: 3000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getStatus() {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/order/statusorder",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getKurir(input) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/shipper/all?nama=" + input,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deleteItemCart(input) {
    input = Object.assign({ loguser: user.username }, input);
    return axios({
      method: "delete",
      url: ApiEndpoint.TRENGO_API + "/cart/deleteItem",
      // timeout: 3000,
      data: input,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
