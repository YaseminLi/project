import {
  Http
} from "../utils/http-m.js";
const util = require('../utils/util.js');
class MovieModel extends Http {
  getMoviesData(category) {
    const url = this.switchCategoryUrl(category) + '?start=0&count=3';
    return this.request({
      url
    });
  }
  getSearch(q) {
    return this.request({
      url: '/v2/movie/search?q=' + q
    });
  }
  getMovieDetail(movieId) {
    return this.request({
      url: '/v2/movie/subject/' + movieId,
    });
  }
  getMoreMovie(categoryUrl) {
    return this.request({
      url: categoryUrl
    });
  }
  processMoviesData(moviesData) {
    let movies = [];
    const subjects = moviesData.subjects;
    for (let idx in subjects) {
      let title = subjects[idx].title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      let stars = util.convertToStars(subjects[idx].rating.stars);
      let temp = {
        coverageUrl: subjects[idx].images.large,
        title: title,
        movieId: subjects[idx].id,
        score: subjects[idx].rating.average,
        stars: stars
      }
      movies.push(temp);
    }
    return movies;
  }
  switchCategoryUrl(category) {
    let categoryUrl = '';
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
    return categoryUrl;
  }
};
export {
  MovieModel
};