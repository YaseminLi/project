import {
  MovieModel
} from '../../models/movie.js';
const util = require('../../utils/util.js');
const movieModel = new MovieModel();
Page({
  data: {
    movie: {},
    comment: '',
    isCollect: false,
    movieId: ''
  },
  onLoad: function(options) {
    var movieId = options.id;
    this.setData({
      movieId
    })
    movieModel.getMovieDetail(movieId).then(data => {
      this._processData(data);
    })
    const movieCollection = wx.getStorageSync('movieCollection');
    if (movieCollection) {
      const isCollect = movieCollection.find((e) => (
        e.movieId == movieId
      ));
      this.setData({
        isCollect: isCollect?true:false
      })
    }
  },
  _processData(data) {
    let movie = {};
    movie = {
      movieId: data.id,
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
    const src = event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
    })
  },
  onCollect: function(event) {
    let isCollect = this.data.isCollect;
    this.setData({
      isCollect: !isCollect
    });
    let movieCollection = wx.getStorageSync('movieCollection') ? wx.getStorageSync('movieCollection') : [];
    if (this.data.isCollect) {
      movieCollection.push(this.data.movie)
      wx.setStorageSync('movieCollection', movieCollection);
    } else {
      for (let i = 0; i < movieCollection.length; i++) {
        if (movieCollection[i].movieId == this.data.movieId) {
          movieCollection.splice(i, 1)
        }
      }
      wx.setStorageSync('movieCollection', movieCollection);
    }

  }
})