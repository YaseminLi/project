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
          <img :src="currentSong.image" :class="rotate" />
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time timel">{{format(currentTime)}}</span>
            <progressBar :percent="percent" @progressBarChange="progressBarChange" ref="progressBar"/>
            <span class="time timer">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon" @click="modeChange">
              <i :class="modeIcon" />
            </div>
            <div class="icon" @click="prev" :class="disableCls">
              <i class="iconfont iconprev" />
            </div>
            <div class="icon" @click="togglePlaying" :class="disableCls">
              <i class="iconfont" :class="playIcon" />
            </div>
            <div class="icon" @click="next" :class="disableCls">
              <i class="iconfont iconnext" />
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
        <img :src="currentSong.image" :class="rotate" />
        <div class="title">
          <div class="songname">{{currentSong.songname}}</div>
          <div class="singer">{{currentSong.singer}}</div>
        </div>
        <div class="controls" @click.stop="togglePlaying">
          <progressCircle :radius="32" :percent="percent">
            <i class="iconfont" :class="playIcon" />
          </progressCircle>
        </div>

        <i class="iconfont iconliebiao" />
      </div>
    </transition>
    <audio
      ref="audio"
      :src="currentSong.url"
      @canplay="ready"
      @error="error"
      @timeupdate="timeUpdate"
      @ended="ended"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import progressBar from "base/progress-bar/progress-bar";
import progressCircle from "base/progress-circle/progress-circle";
import { playMode } from "common/js/config.js";
import {shullfle} from "common/js/filter.js"
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      songReady: false,
      currentTime: 0
    };
  },
  computed: {
    ...mapGetters([
      "playingState",
      "fullScreen",
      "playList",
      "currentSong",
      "currentIndex",
      "mode"
    ]),
    playIcon() {
      return this.playingState ? "iconplay" : "iconpause";
    },
    rotate() {
      return this.playingState ? "play" : "";
    },
    disableCls() {
      return this.songReady ? "" : "disable";
    },
    percent() {
      return this.currentTime / this.currentSong.duration;
    },
    modeIcon() {
      let mode = "";
      for (var key in playMode) {
        if (playMode[key] === this.mode) {
          mode = key;
        }
      }
      return `iconfont icon${mode}`;
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
    prev() {
      if (!this.songReady) {
        return;
      }
      const length = this.playList.length;
      if (this.currentIndex === 0) {
        this.setCurrentIndex(length - 1);
      } else {
        this.setCurrentIndex(this.currentIndex - 1);
      }
      this.setPlayingState(true);
      this.songReady = false;
    },
    next() {
      if (!this.songReady) {
        return;
      }
      if (this.currentIndex === this.playList.length - 1) {
        this.setCurrentIndex(0);
      } else {
        this.setCurrentIndex(this.currentIndex + 1);
      }
      this.setPlayingState(true);
      this.songReady = false;
    },
    ended() {
      if (this.mode == playMode.loop) {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      } else {
        this.next();
      }
    },
    ready() {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    },
    timeUpdate(e) {
      this.currentTime = e.target.currentTime;
    },
    format(time) {
      let minute = Math.floor(time / 60);
      let second = Math.round(time % 60);
      if (second == 60) {
        second = "00";
        minute += 1;
      }
      second = second < 10 ? "0" + second : second;
      return minute + ":" + second;
    },
    progressBarChange(percent) {
      const currentTime = this.currentSong.duration * percent;
      this.$refs.audio.currentTime = currentTime;
      this.currentTime = currentTime;
      if (!this.playingState) {
        this.togglePlaying();
      }
    },
    modeChange() {
      let mode = 0;
      this.mode == 2 ? (mode = 0) : (mode = this.mode + 1);
      this.setMode(mode);
      if(this.mode==playMode.random){
          this.setPlayList(shullfle(this.playList))
          let currentIndex=this.playList.findIndex(item=>{
              return item.id==this.currentSong.id
          });
          console.log(currentIndex);
          
          this._resetCurrentIndex(currentIndex);
      }
    },
      _resetCurrentIndex(index){
          this.setCurrentIndex(index);
      },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setMode: "SET_MODE",
      setPlayList:"SET_PLAY_LIST"
    })
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    playingState(newP) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newP ? audio.play() : audio.pause();
      });
    },
    //从miniplay 到normalPlay 进度条不应该复原
    fullScreen(newF){
        if(newF){
            setTimeout(()=>{
                this.$refs.progressBar.setProgressOffset(this.percent)
            },20)
        }
    }
  },
  components: {
    progressBar,
    progressCircle
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
          animation: rotate 30s linear infinite
        &.pause
          animation-play-state: paused
    .bottom
      width: 100%
      position: absolute
      bottom: 50px
      .progress-wrapper
        width: 80%
        height: 30px
        margin: 0 auto
        display: flex
        align-items: center
        .time
          font-size: 12px
          width: 30px
        .timel
          margin-right: 10px
        .timer
          margin-left: 10px
        .progress-bar
          flex: 1
      .operators
        width: 100%
        box-sizing: border-box
        display: flex
        flex-direction: row
        justify-content: space-between
        padding: 10px 30px 0px 30px
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
      &.play
        animation: rotate 30s linear infinite
      &.pause
        animation-play-state: paused
    .title
      flex: 1
      .songname
        font-size: 14px
        line-height: 20px
      .singer
        font-size: 12px
        line-height: 20px
    .iconliebiao
      font-size: 30px
      padding: 0 20px
    .controls
      .iconfont
        position: absolute
        font-size: 32px
@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>
