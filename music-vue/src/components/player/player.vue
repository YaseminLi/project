<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="top">
          <div class="xiala" @click="back">
            <i class="iconfont iconxiala" />
          </div>
          <div class="songname">{{currentSong.songname}}</div>
          <div class="singer">{{currentSong.singer}}</div>
        </div>

        <div class="middle">
          <img :src="currentSong.image" :class="rotate"/>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon">
              <i class="iconfont iconliebiaoxunhuan" />
            </div>
            <div class="icon">
              <i class="iconfont iconkuaitui" />
            </div>
            <div class="icon"  @click="togglePlaying" >
              <i class="iconfont" :class="playIcon"/>
            </div>
            <div class="icon">
              <i class="iconfont iconkuaijin" />
            </div>
            <div class="icon">
              <i class="iconfont iconxiai" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition appear name="mini-move">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <img :src="currentSong.image" />
        <div class="title">
          <div class="songname">{{currentSong.songname}}</div>
          <div class="singer">{{currentSong.singer}}</div>
        </div>
        <div class="controls"  @click.stop="togglePlaying">
            <i class="iconfont" :class="playIcon" />
        </div>
        
        <i class="iconfont iconliebiao" />
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["playingState", "fullScreen", "playList", "currentSong"]),
    playIcon(){
        return this.playingState?'iconbofang2':'iconzanting'
    },
    rotate(){
        return this.playingState?'play':''
    }
  },
  methods: {
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    togglePlaying() {
      this.setPlayingState(!this.playingState);
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE"
    })
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    playingState(newP) {
       const audio=this.$refs.audio;
       this.$nextTick(()=>{
           newP?audio.play():audio.pause()
       })
    }
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
.player
  .normal-player
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 150
    background: $color-background
    .top
      text-align: center
      .xiala
        position: absolute
        padding: 10px 0 0 20px
        .iconxiala
          font-size: 20px
      .songname
        font-size: 18px
        line-height: 40px
      .singer
        font-size: 14px
        line-height: 20px
    .middle
      margin-top: 50px
      text-align: center
      img
        border: 10px solid $color-theme-d
        border-radius: 50%
        width: 300px
        height: 300px
        box-shadow: 0 0 32px $color-theme-d
        &.play
            animation: rotate 10s linear infinite
        &.pause
            animation-play-state: paused
    .bottom
      .operators
        width: 100%
        box-sizing: border-box
        position: fixed
        bottom: 0
        left: 0
        display: flex
        flex-direction: row
        justify-content: space-between
        padding: 10px 30px 60px 30px
        align-items: center
        .icon
          .iconfont
            font-size: 30px
          .iconxiai
            font-size: 25px
    &.normal-enter, .normal-leave-to
      opacity: 0
      transform: translate3d(0, -100px, 0)
    &.normal-enter-active, .normal-leave-active
      transition: all 0.4s
  .mini-player
    height: 60px
    position: fixed
    left: 0
    right: 0
    bottom: 0
    z-index: 150
    background: $color-background
    display: flex
    flex-direction: row
    align-items: center
    img
      width: 40px
      height: 40px
      border-radius: 50%
      margin: 0 10px 0 20px
    .title
      flex: 1
      .songname
        font-size: 14px
        line-height: 20px
      .singer
        font-size: 12px
        line-height: 20px
    .iconfont
      padding: 0 10px
    .iconbofang2,.iconzanting
      font-size: 30px
    .iconliebiao
      font-size: 22px
 @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
