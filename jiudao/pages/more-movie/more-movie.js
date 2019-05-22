import {
  MovieModel
} from '../../models/movie.js';
var util = require('../../utils/util.js');
const movieModel = new MovieModel();
Page({
  data: {
    category: '',
    movies: [],
    startCount: 0,
    categoryUrl: '',
    loading: false,
    totalCount: '',
    count: ''
  },
  //count:每次请求返回的数据量，由此来确定下次请求的startCount
  //totalCount:服务器最多能返回的数据量
  //startCount:要加载更多时，从第几条像服务器请求
  //statCount>=totalCount时，不能再发送请求了！
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    var category = options.category;
    this.setData({
      category: category
    });
    var categoryUrl = '';
    switch (category) {
      case '正在热映':
        categoryUrl = '/v2/movie/in_theaters';
        break;
      case '即将上映':
        categoryUrl = '/v2/movie/coming_soon';
        break;
      case 'Top250':
        categoryUrl = '/v2/movie/top250';
        break;
    }
    this.setData({
      categoryUrl
    })
    movieModel.getMoreMovie(categoryUrl).then(data => {
      this.processDoubanData(data);
      this.setData({
        startCount: data.count,
        totalCount: data.total,
      });
    })
  },
  processDoubanData: function(moviesDouban) {
    var movies = this.data.movies;
    var subjects = moviesDouban.subjects;
    for (var idx in subjects) {
      var title = subjects[idx].title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      var starsNum = subjects[idx].rating.stars.toString().substring(0, 1);
      var stars = [];
      for (var i = 0; i < 5; i++) {
        stars[i] = (i < starsNum ? 1 : 0);
      };
      var temp = {
        coverageUrl: subjects[idx].images.large,
        title: title,
        movieId: subjects[idx].id,
        score: subjects[idx].rating.average,
        stars: stars

      }
      movies.push(temp);
    }
    this.setData({
      movies: movies
    });
    wx.hideLoading()
  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.category,
    })
  },
  onReachBottom: function() {
    wx.showLoading({
      title: '加载中',
    })
    console.log('到底了！')
    //加入锁，避免在还未拿到请求时再发送请求
    if (this.data.loading) {
      return
    }
    if (this.data.startCount >= this.data.totalCount) {
      wx.showToast({
        title: '已经加载到最多了！',
        icon:'none'
      })
      return
    }
    this.data.loading = true;
    var categoryUrl = this.data.categoryUrl +
      "?start=" + this.data.startCount + "&count=20"
    movieModel.getMoreMovie(categoryUrl).then(data => {
      console.log(data)
      this.processDoubanData(data);
      let startCount = data.count ? this.data.startCount + data.count : data.total;
      this.setData({
        startCount: startCount
      })
      this.data.loading = false;
    })

  }
})