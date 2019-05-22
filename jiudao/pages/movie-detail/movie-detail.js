import {
  MovieModel
} from '../../models/movie.js';
var util = require('../../utils/util.js');
const movieModel = new MovieModel();
Page({
  data: {
    movie: {},
    comment: ''
  },
  onLoad: function(options) {
    var movieId = options.id;
    movieModel.getMovieDetail(movieId).then(data => {
      this.processDoubanData(data);
    })
  },
  processDoubanData(data) {
    var movie = {};
    movie = {
      title: data.title,
      countries: data.countries[0],
      year: data.year,
      wishCount: data.wish_count,
      commentsCount: data.comments_count,
      movieImg: data.images ? data.images.large : '',
      originalTitle: data.original_title,
      stars: util.convertToStars(data.rating.stars),
      score: data.rating.average,
      director: data.directors ? data.directors[0].name : '',
      casts: util.convertToCastString(data.casts),
      genres: data.genres.join('、'),
      summary: data.summary,
      castsInfo: util.convertToCastInfos(data.casts),
    };
    this.setData({
      movie: movie
    });
  },
  viewMoviePostImg: function(event) {
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
    })
  },
  onFakePost: function(event) {
    this.setData({
      posting: !this.data.posting
    })
  },
  onPost: function(event) {
    const comment = event.detail.value;
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
    }

    wx.showToast({
      title: '短评提交成功！',
      icon: "none"
    });

    if (this.data.comment) {
      this.data.comment.unshift({
        content: comment,
        nums: 1
      });
    } else {
      this.data.comment = [{
        content: comment,
        nums: 1
      }]
    }
    this.setData({
      inputValue: '',
      posting: !this.data.posting,
      comment: this.data.comment
    })
  }


})