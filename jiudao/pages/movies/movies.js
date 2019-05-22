import { MovieModel } from '../../models/movie.js';
var util = require('../../utils/util.js');
const movieModel=new MovieModel();
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    showSearch:false
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    const inTheater = movieModel.getIntheater();
    const comingSoon = movieModel.getComingSoon();
    const top250 = movieModel.getTop250();
    Promise.all([inTheater,comingSoon,top250]).then(res=>{
      console.log(res);
    })
    // movieModel.getIntheater().then(data=>{
    //  this.processDoubanData(data, 'inTheaters', '正在热映')
    // });
    // movieModel.getComingSoon().then(data => {
    //   this.processDoubanData(data, 'comingSoon', '即将上映')
    // });
    // movieModel.getTop250().then(data => {
    //  this.processDoubanData(data, 'top250', 'Top250')
    // })
  },
  processDoubanData: function (moviesDouban, selectkey, categoryTitle) {
    var movies = [];
    var subjects = moviesDouban.subjects;
    for (var idx in subjects) {
      var title = subjects[idx].title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      var stars = util.convertToStars(subjects[idx].rating.stars);
      var temp = {
        coverageUrl: subjects[idx].images.large,
        title: title,
        movieId: subjects[idx].id,
        score: subjects[idx].rating.average,
        stars: stars
      }
      movies.push(temp);
    }
    var readyMovie = {};
    readyMovie[selectkey] = {
      movies: movies,
      categoryTitle: categoryTitle
    };
    this.setData(readyMovie);
    wx.hideLoading()
  },
  onShowSearch: function (event) {
    const showSearch = this.data.showSearch;
    this.setData({ showSearch: !showSearch })
  }

})