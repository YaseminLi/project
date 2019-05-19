import {
  BookModel
} from '../../models/book.js';
const bookModel = new BookModel();
Page({
  data: {
   detail:'',
    id:'',
    comment:''
  },
  onLoad: function (options) {
    const id=options.id;
    bookModel.getBookDetail(id).then(data => {
      this.setData({ detail: data });
    });
    bookModel.getShortComment(id).then(data => {
      this.setData({ comment: data.comment });
    });
  }
})