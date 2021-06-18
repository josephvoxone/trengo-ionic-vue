import axios from "axios";
import ApiEndpoint from "../helper/apiEndpoint";

export default {
  getAllSession(search, length) {
    if (length) search += "&skip=" + length;
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/history/all?q=" + search,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getRiwayatTransaksi(search) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/history/riwayat-transaksi?q=" + search,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getDetailSession(search) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/order/all?sesi=" + search,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
