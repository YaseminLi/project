import { MovieModel } from '../../models/movie.js';
const movieModel=new MovieModel();
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    showSearch:false,
    showLoading:false
     
  },
  onLoad: function(options) {
    this.setData({ showLoading: true});
    const inTheater = movieModel.getMoviesData('正在热映');
    const comingSoon = movieModel.getMoviesData('即将上映');
    const top250 = movieModel.getMoviesData('Top250');
    Promise.all([inTheater,comingSoon,top250]).then(res=>{
      this._processData(res[0], 'inTheaters', '正在热映');
      this._processData(res[1], 'comingSoon', '即将上映');
      this._processData(res[2], 'top250', 'Top250');
      this.setData({ showLoading: false });
    })
  },
  _processData: function (moviesData, selectkey, categoryTitle) {
    let movies=movieModel.processMoviesData(moviesData)
    let readyMovie = {};
    readyMovie[selectkey] = {
      movies: movies,
      categoryTitle: categoryTitle
    };
    this.setData(readyMovie);

  },
  onShowSearch: function (event) {
    const showSearch = this.data.showSearch;
    this.setData({ showSearch: !showSearch })
  }
})