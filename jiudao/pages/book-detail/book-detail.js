import {
  BookModel
} from '../../models/book.js';
const bookModel = new BookModel();
Page({
  data: {
    detail: '',
    comment: '',
    likeStatus: false,
    likeCount: '',
    posting: false,
    inputValue: ''
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
  onFakePost: function(event) {
    this.setData({
      posting: !this.data.posting
    })
  },
  onPost: function(event) {
    const comment = event.detail.comment ? event.detail.comment : event.detail.value;
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
    }
    const id = this.data.detail.id;
    // 新增评论接口调用
    bookModel.postBookComment(id, comment)
      .then(data => {
        console.log('postcomment');
        wx.showToast({
          title: '短评提交成功！',
          icon: "none"
        });
        //新增评论接口调用成功后的操作，暂放在这里
         console.log(this.data.comment)
        if (this.data.comment) {
          this.data.comment.unshift({
            content: comment,
            nums: 1
          });
        } else {
          this.data.comment=[{
            content: comment,
            nums: 1
          }]
        }
        this.setData({
          inputValue: '',
          posting: !this.data.posting,
          comment: this.data.comment
        })
      })

  }
})