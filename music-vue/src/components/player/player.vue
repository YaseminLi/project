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
        <div
          class="middle"
          ref="middle"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend"
        >
          <div class="middle-l" ref="cd">
            <img :src="currentSong.image" :class="rotate" />
            <div class="playingLyric">{{playingLyric}}</div>
          </div>
          <scroll class="middle-r" :data="currentLyric&&currentLyric.lines" ref="lyric">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <div
                  ref="lyricLine"
                  class="text"
                  :class="{'current':currentLineNum==index}"
                  v-for="(item,index) in currentLyric.lines"
                  :key="index"
                >{{item.txt}}</div>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dots">
            <div class="dot" :class="{'current':currentShow=='cd'}"></div>
            <div class="dot" :class="{'current':currentShow=='lyric'}"></div>
          </div>
          <div class="progress-wrapper">
            <span class="time timel">{{format(currentTime)}}</span>
            <progressBar
              :percent="percent"
              @progressBarChange="progressBarChange"
              ref="progressBar"
            />
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

        <i class="iconfont iconliebiao"  @click.stop="showPlaylist"/>
        <playlist ref="playlist" />
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
import Lyric from "lyric-parser";
import { setTimeout } from "timers";
import { playMode } from "common/js/config.js";
import { prefixStyle } from "common/js/dom.js";
import {playerMixin} from "common/js/mixin.js"
import progressBar from "base/progress-bar/progress-bar";
import progressCircle from "base/progress-circle/progress-circle";
import scroll from "base/scroll/scroll";
import playlist from "components/playlist/playlist";

const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");
export default {
  mixins:[playerMixin],
  data() {
    return {
      songReady: false,
      currentTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: "cd",
      playingLyric: ""
    };
  },
  created() {
    this.touch = {};
  },
  computed: {
    ...mapGetters([
      "playingState",
      "fullScreen",
      "currentIndex",
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
    }
  },
  methods: {
    showPlaylist(){
      this.$refs.playlist.show();
    },
    touchstart(e) {
      this.touch.initialed = true;
      this.touch.starX = e.touches[0].pageX;
      this.touch.starY = e.touches[0].pageY;
    },
    touchmove(e) {
      if (!this.touch.initialed) {
        return;
      }
      let deltaX = e.touches[0].pageX - this.touch.starX;
      let deltaY = e.touches[0].pageX - this.touch.starX;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      let left = this.currentShow == "cd" ? 0 : -window.innerWidth;
      let offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, deltaX + left)
      );
      this.touch.percent = Math.abs(offsetWidth) / window.innerWidth;
      this.$refs.lyric.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyric.$el.style[transitionDuration] = 0;
      this.$refs.cd.style.opacity = 1 - this.touch.percent;
      this.$refs.cd.style[transitionDuration] = 300;
    },
    touchend() {
      let offsetWidth;
      let opacity;
      let percent = this.touch.percent;
      if (this.currentShow == "cd") {
        if (percent < 0.1) {
          offsetWidth = 0;
          opacity = 1;
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
          this.currentShow = "lyric";
        }
      } else {
        if (percent < 0.9) {
          offsetWidth = 0;
          opacity = 1;
          this.currentShow = "cd";
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }
      const time = 300;
      this.$refs.lyric.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyric.$el.style[transitionDuration] = `${time}ms`;
      this.$refs.cd.style.opacity = opacity;
      this.$refs.cd.style[transitionDuration] = `${time}ms`;
      this.touch.initiated = false;
    },
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    togglePlaying() {
      this.setPlayingState(!this.playingState);
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      const length = this.playList.length;
      if (length == 1) {
        this.loop();
      } else {
        if (this.currentIndex === 0) {
          this.setCurrentIndex(length - 1);
        } else {
          this.setCurrentIndex(this.currentIndex - 1);
        }
        this.setPlayingState(true);
      }

      this.songReady = false;
    },
    next() {
      if (!this.songReady) {
        return;
      }
      if (this.playList.length == 1) {
        this.loop();
      } else {
        if (this.currentIndex === this.playList.length - 1) {
          this.setCurrentIndex(0);
        } else {
          this.setCurrentIndex(this.currentIndex + 1);
        }
        this.setPlayingState(true);
      }

      this.songReady = false;
    },
    ended() {
      if (this.mode == playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.currentLyric.seek(0);
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
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    _getLyric() {
      this.currentSong.getLyric().then(lyric => {
        this.currentLyric = new Lyric(lyric, this.handleLyric);
        //歌曲是播放状态时，歌词滚动
        if (this.playingState) {
          this.currentLyric.play();
        }
      });
    },
    //歌词改变时
    handleLyric({ lineNum, txt }) {
      this.playingLyric = txt;
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let el = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyric.scrollToElement(el, 1000);
      } else {
        this.$refs.lyric.scrollTo(0, 0, 1000);
      }
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setMode: "SET_MODE",
    })
  },
  watch: {
    currentSong(newSong, oldSong) {
      //暂停时，切换模式会改变currentSong，但歌曲没变
      if (!newSong.id||newSong.id == oldSong.id) {
        return;
      }
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
      this.$nextTick(() => {
        this.$refs.audio.play();
        this._getLyric();
      });
    },
    playingState(newP) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newP ? audio.play() : audio.pause();
      });
    },
    //从miniplay 到normalPlay 进度条不应该复原
    fullScreen(newF) {
      if (newF) {
        setTimeout(() => {
          this.$refs.progressBar.setProgressOffset(this.percent);
        }, 20);
      }
    }
  },
  components: {
    progressBar,
    progressCircle,
    scroll,
    playlist
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
  @import "~common/stylus/mixin"
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
      padding 0 30px
      text-align: center
      .xiala
        position: absolute
        top 10px
        left 10px
        .iconxiala
          font-size: 20px
      .songname
        font-size: 18px
        line-height: 40px
        no-wrap()
      .singer
        no-wrap()
        font-size: 14px
        line-height: 20px
    .middle
      position: fixed
      width: 200%
      top: 80px
      bottom: 170px
      display: flex
      flex-direction: row
      flex-wrap: nowrap
      .middle-l
        width: 50%
        height: 100%
        text-align: center
        img
          margin-top: 20px
          border-radius: 50%
          width: 300px
          height: 300px
          border: 10px solid $color-theme-d
          &.play
            animation: rotate 30s linear infinite
          &.pause
            animation-play-state: paused
        .playingLyric
          line-height: 50px
          padding 0 30px
          no-wrap()
      .middle-r
        width: 50%
        height: 100%
        overflow: hidden
        .lyric-wrapper
          width: 80%
          margin: 0 auto
        .text
          font-size: 14px
          line-height: 30px
          text-align: center
          &.current
            color: $color-theme-d
            font-size: 16px
    .bottom
      width: 100%
      position: absolute
      bottom: 50px
      .dots
        text-align: center
        .dot
          display: inline-block
          width: 6px
          height: 6px
          background: $color-theme-d
          border-radius: 3px
          margin: 0 3px
          &.current
            width: 12px
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
      overflow hidden
      .songname
        font-size: 14px
        line-height: 20px
        no-wrap()
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
