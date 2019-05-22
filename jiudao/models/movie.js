import {
  Http
} from "../utils/http-m.js";

class MovieModel extends Http {
  getIntheater() {
    return this.request({
      url: '/v2/movie/in_theaters?start=0&count=3'});
  }
  getComingSoon() {
    return this.request({
      url: '/v2/movie/coming_soon?start=0&count=3'
    });
  }
  getTop250() {
    return this.request({
      url: '/v2/movie/top250?start=0&count=3'
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
    return this.request({ url: categoryUrl});
  }

};
export {
  MovieModel
};