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
  getShortComment(id) {
    return this.request(`/book/${id}/short_comment`);
  }
  getLikeStatus(id){
    return this.request(`/book/${id}/favor`);
  }
  getHotKeyword() {
    return this.request('/book/hot_keyword');
  }
};
export {
  BookModel
};