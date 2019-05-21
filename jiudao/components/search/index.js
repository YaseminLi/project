import {
  KeywordModel
} from '../../models/keyword.js';
const keywordModel = new KeywordModel();
Component({
  data: {
    hotKeyword: '',
    historySearch: '',
    inputValue: '',
    searchResult: '',
    isSearching: false
  },
  properties: {
    inputValue: String
  },
  attached: function() {
    keywordModel.getHotKeyword().then(data => {
      this.setData({
        hotKeyword: data
      });
    });
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
      })
    },
    onSearch: function(event) {
      this.setData({ isSearching: true});
      if (event.detail.value){
        const q = event.detail.value 
      }else{
        const q = event.detail.text;
        this.setData({inputValue:q});
      }
      const q = event.detail.value ? event.detail.value : event.detail.text;
      console.log(q);
      keywordModel.getSearch().then(data => {
        this.setData({
          searchResult: data.books,
        });
        keywordModel.addInputToHistory(q);
      })
    }
  }
})