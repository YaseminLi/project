import {
  KeywordModel
} from '../../models/keyword.js';
import {
  MovieModel
} from '../../models/movie.js';
const movieModel = new MovieModel();
const keywordModel = new KeywordModel();
Component({
  properties: {
    more: Boolean,
  },
  data: {
    historySearch: '',
    inputValue: '',
    movies: '',
    isSearching: false,
    noneResult: false
  },
  attached: function() {
    this.setData({
      historySearch: keywordModel.getHistorySearch()
    });
  },
  methods: {
    onCancelSearch: function(event) {
      this.triggerEvent('cancelSearch', {}, {});
    },
    onClearInput: function(event) {
      this.setData({
        inputValue: '',
        historySearch: keywordModel.getHistorySearch(),
        isSearching: false,
        noneResult: false
      })
    },
    onSearch: function(event) {
      this.setData({
        isSearching: true
      });
      const q = event.detail.value || event.detail.comment;
      this.setData({
        inputValue: q
      });
      movieModel.getSearch(q).then(data => {
        this._processData(data);
        console.log(data);
        if (data.count) {
          keywordModel.addInputToHistory(q);
        } else {
          this.setData({
            noneResult: true
          })
        }
      })
    },
    _processData: function(data) {
      const movies = movieModel.processMoviesData(data);
      this.setData({
        movies
      });
    },
  }
})