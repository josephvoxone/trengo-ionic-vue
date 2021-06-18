import axios from "axios";
import ApiEndpoint from "../helper/apiEndpoint";

export default {
  getAllQuery(params, length) {
    let valparams = "";
    if (params.id) valparams = "?id=" + params.id;
    if (params.barang) valparams += "&barang=" + params.barang;
    valparams += "&skip=" + length;
    
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/barang/get-stock" + valparams,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getKota() {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/kota-order",
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getKotaID(params) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/kota-order?nama=" + params,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
