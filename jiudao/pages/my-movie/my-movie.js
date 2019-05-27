// pages/book-list/book-list.js
Page({

  data: {
    movies:''
  },

  onShow: function(options) {
   let movies=wx.getStorageSync('movieCollection')
   this.setData({movies})
  },
  onMovieDetail(event){
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id=' + event.currentTarget.dataset.id,
    })
  }
})