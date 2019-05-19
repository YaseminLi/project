import {
  BookModel
} from '../../models/book.js';
const bookModel = new BookModel();
Page({
  data: {
   detail:'',
    id:''
  },
  onLoad: function (options) {
    const id=options.id;
    console.log(id)
    bookModel.getBookDetail(id).then(data => {
      this.setData({ detail: data });
    })
  }
})