// components/movie/index.js
Component({
 properties: {
   movie:Object
  },
methods:{
  onMovieDetail:function(event){
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id=' + event.currentTarget.dataset.id,
    })
  }
}
})