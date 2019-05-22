import {
  KeywordModel
} from '../../models/keyword.js';
import { MovieModel } from '../../models/movie.js';
var util = require('../../utils/util.js');
const movieModel = new MovieModel();
const keywordModel = new KeywordModel();
Component({
  properties: {
    more: Boolean,
  },
  data: {
    historySearch: '',
    inputValue: '',
    movies:'',
    isSearching: false
  },
  observers: {
    //触底加载更多
    'more': function(more) {
      console.log('加载更多')
    }
  },
  attached: function() {
    const historySearch = keywordModel.getHistorySearch();
    this.setData({
      historySearch
    });
  },
  methods: {
    onCancelSearch: function(event) {
      this.triggerEvent('cancelSearch', {}, {});
    },
    onClearInput: function(event) {
      this.setData({
        isSearching: false,
        inputValue: '',  
        historySearch: keywordModel.getHistorySearch()
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
      const searchResult = wx.getStorageSync('movieSearch-' + q);
      if (searchResult) {
        this.processDoubanData(searchResult);
      } else {
       movieModel.getSearch(q).then(data => {
          console.log(data);
          this.processDoubanData(data);
          wx.setStorageSync('movieSearch-' + q, data)
          keywordModel.addInputToHistory(q);
        })
      };

    },
    processDoubanData: function(moviesDouban) {
      console.log('process方法调用了')
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
      this.setData({movies});
      console.log(this.data)
    },
  }
})