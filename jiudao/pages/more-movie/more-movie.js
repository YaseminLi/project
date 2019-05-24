import {
  MovieModel
} from '../../models/movie.js';
const movieModel = new MovieModel();
Page({
  data: {
    category: '',
    movies: [],
    startCount: 0,
    categoryUrl: '',
    loading: false,
    totalCount: '',
    count: '',
    showLoading:false
  },
 
  //count:每次请求返回的数据量，由此来确定下次请求的startCount
  //totalCount:服务器最多能返回的数据量
  //startCount:要加载更多时，从第几条像服务器请求
  //statCount>=totalCount时，不能再发送请求了！
  onLoad: function (options) {
    this.setData({ showLoading: true});
    const category = options.category;
    const categoryUrl = movieModel.switchCategoryUrl(category);
    this.setData({
      categoryUrl,
      category
    })
    movieModel.getMoreMovie(categoryUrl).then(data => {
      this._processData(data);
      this.setData({
        startCount: data.count,
        totalCount: data.total,
      });
    })
  },
  _processData: function (moviesData) {
    let movies = this.data.movies;
    let moreMovies = movieModel.processMoviesData(moviesData)
    this.setData({
      movies: movies.concat(moreMovies)
    });
    this.setData({ showLoading: false });
  },

  onReachBottom: function () {
    this.setData({ showLoading: true });
    //加入锁，避免在还未拿到请求时再发送请求
    if (this.data.loading) {
      return
    }
    if (this.data.startCount >= this.data.totalCount) {
      wx.showToast({
        title: '已经加载到最多了！',
        icon: 'none'
      })
      return
    }
    this.data.loading = true;
    var categoryUrl = this.data.categoryUrl +
      "?start=" + this.data.startCount + "&count=20"
    movieModel.getMoreMovie(categoryUrl).then(data => {
      this._processData(data);
      let startCount = data.count ? this.data.startCount + data.count : data.total;
      this.setData({
        startCount
      })
      this.data.loading = false;
    }, () => this.data.loading = false)

  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.category,
    })
  }
})