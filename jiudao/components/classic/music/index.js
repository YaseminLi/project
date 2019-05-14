const myBehavior = require("../class-beh.js");
Component({
  behaviors: [myBehavior],
  data: {
    isPlaying: true,
    playingSrc: "images/player@playing.png",
    waittingSrc: "images/player@waitting.png"
  }
})
