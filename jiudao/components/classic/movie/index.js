const classicBehavior = require("../classic-beh.js");
Component({
  behaviors: [classicBehavior],
  lifetimes: {
    attached: function (event) {
      console.log('a')

    },
    detached: function (event) {
      console.log('b')
    },
  },

})
