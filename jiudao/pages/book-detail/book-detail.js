import {
  BookModel
} from '../../models/book.js';
const bookModel = new BookModel();
Page({
  data: {
    detail: '',
    id: '',
    comment: '',
    likeStatus: false,
    likeCount: '',
    posting:false
  },
  onLoad: function(options) {
    const id = options.id;
    bookModel.getBookDetail(id).then(data => {
      this.setData({
        detail: data
      });
    });
    bookModel.getShortComment(id).then(data => {
      this.setData({
        comment: data.comment
      });
    });
    bookModel.getLikeStatus(id).then(data => {
      this.setData({
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      });
    });
  },
  onFakePost:function(){
  this.setData({posting:!this.data.posting})
  }
})