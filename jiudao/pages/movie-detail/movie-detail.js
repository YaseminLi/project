import {
  MovieModel
} from '../../models/movie.js';
const util = require('../../utils/util.js');
const movieModel = new MovieModel();
Page({
  data: {
    movie: {},
    comment: ''
  },
  onLoad: function(options) {
    var movieId = options.id;
    movieModel.getMovieDetail(movieId).then(data => {
      this._processData(data);
    })
  },
  _processData(data) {
    let movie = {};
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
    const src = event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
    })
  }
})