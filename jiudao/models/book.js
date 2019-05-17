import {
  Http
} from "../utils/http-p.js";
class BookModel extends Http {
  getHotList() {
    return this.request("/book/hot_list");
  }
};
export {
  BookModel
};