const myBehavior = require("../classic-beh.js");
const backgroundAudioManager = wx.getBackgroundAudioManager();
Component({
  behaviors: [myBehavior],
  properties: {
    image: String,
    imageUrl: String,
    musicUrl: String,
    title: String
  },
  data: {
    isPlaying: false,
    playSrc: "images/player@play.png",
    pauseSrc: "images/player@pause.png"
  },
  methods: {
    onPlay() {
      let isPlaying = !this.data.isPlaying;
      this.setData({
        isPlaying: isPlaying
      });
      backgroundAudioManager.title = this.data.title;
      backgroundAudioManager.coverImgUrl = this.properties.imageUrl;
      if (isPlaying) {
        backgroundAudioManager.src = this.properties.musicUrl;
      } else {
        backgroundAudioManager.pause();
      };
    }
  },
  ready: function() {
    backgroundAudioManager.onPlay(
        console.log('play')
      ),
      backgroundAudioManager.onPause(
        console.log('pause')
      )
  }

})