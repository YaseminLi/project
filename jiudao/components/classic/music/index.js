// components/image/index.js
Component({
  properties: {
    content: {
      type: String,
    },
    image: {
      type: String
    },
  },
  data:{
    isPlaying:true,
    playingSrc: "images/player@playing.png",
    waittingSrc: "images/player@waitting.png"
  }
})
