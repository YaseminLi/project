import {
  BookModel
} from '../../models/book.js';
const bookModel = new BookModel();
Page({
  data:{
    hotList:''
  },
  onLoad: function(options) {
    bookModel.getHotList().then(data => {
      this.setData({hotList:data});
    })
  },
onBookDetail: function(event) {
    wx.navigateTo({
      url: '/pages/book-detail/book-detail',
    })
  },

})