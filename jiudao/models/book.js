import {
  Http
} from "../utils/http-p.js";
class BookModel extends Http {
  getHotList() {
    return this.request("/book/hot_list");
  }
  getBookDetail(id) {
    return this.request(`/book/${id}/detail`);
  }
};
export {
  BookModel
};