const myBehavior = require("../class-beh.js");
Component({
  behaviors: [myBehavior],
  data: {
    isPlaying: false,
    playingSrc: "images/player@playing.png",
    waittingSrc: "images/player@waitting.png"
  }
})
