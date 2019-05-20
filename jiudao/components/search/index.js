import {
  BookModel
} from '../../models/book.js';
const bookModel = new BookModel();
Component({
  data:{
    hotKeyword:''
  },
  properties: {
    inputValue: String
  },
  attached: function() {
    bookModel.getHotKeyword().then(data => {
      this.setData({ hotKeyword: data });
    })
    console.log(this.data)
  },
  methods: {
    onCancelSearch: function(event) {
      this.triggerEvent('cancelSearch', {}, {});
    },
    onClearInput: function(event) {
      this.triggerEvent('clearInput', {}, {});

    }
  }
})