Component({
  properties:{
inputValue:String
  },
  methods: {
    onCancelSearch: function(event) {
      this.triggerEvent('cancelSearch', {}, {});
    },
    onClearInput:function(event){
      this.triggerEvent('clearInput', {}, {});

    }
  }
})