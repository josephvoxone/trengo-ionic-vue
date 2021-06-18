import axios from "axios";
import ApiEndpoint from "../helper/apiEndpoint";

export default {
  getAllStore(search) {
    return axios({
      method: "get",
      url: ApiEndpoint.TRENGO_API + "/order/all?sesi=" + search,
      // timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  batalOrder(input) {
    return axios({
      method: "put",
      url: ApiEndpoint.TRENGO_API + "/order/batalorder",
      // timeout: 5000,
      data: input,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  paidOrder(input) {
    return axios({
      method: "put",
      url: ApiEndpoint.TRENGO_API + "/order/paidorder",
      // timeout: 5000,
      data: input,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllBooks() {
    return axios({
      method: "get",
      url: ApiEndpoint.BOOK_API,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  editBook(bookId, book) {
    return axios({
      method: "put",
      url: `${ApiEndpoint.BOOK_API}/${bookId}`,
      data: book,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  addBook(book) {
    return axios({
      method: "post",
      url: ApiEndpoint.BOOK_API,
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
