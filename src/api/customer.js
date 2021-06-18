import axios from "axios";
import ApiEndpoint from "../helper/apiEndpoint";
import { userService } from "@/service/user";

const user = JSON.parse(userService.getItem() || "{}");

export default {
  getCustomer(search) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/user/all?idcustomer=" + search,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getKota() {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/mapping",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getKecamatan(book) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/mapping?kota=" + book,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getKelurahan(kota, kec) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/mapping?kota=" + kota + "&kec=" + kec,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getKodepos(kec, kel) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/getkodepos?kec=" + kec + "&kel=" + kel,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  editCustomer(input) {
    input = Object.assign({ loguser: user.username }, input);
    input.loguser = user.username;
    return axios({
      method: "put",
      url: ApiEndpoint.TRENGO_API + "/user/update-user",
      data: input,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  add(book) {
    return axios({
      method: "post",
      url: ApiEndpoint.TRENGO_API + "/order/simpan",
      data: book,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deleteBook(bookId) {
    return axios({
      method: "delete",
      url: `${ApiEndpoint.BOOK_API}/${bookId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
