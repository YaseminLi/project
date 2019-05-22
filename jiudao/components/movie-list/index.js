// components/movie-list/index.js
Component({
  properties: {
    movies: Object
  },
  methods:{
    onMoreMovie:function(event){
      wx.navigateTo({
        url: '/pages/more-movie/more-movie?category='+event.currentTarget.dataset.category,
      })
    }
  }
})