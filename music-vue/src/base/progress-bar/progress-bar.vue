<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner" ref="barInner"></div>
    <div class="progress" ref="progress"></div>
    <div
      class="btn"
      ref="btn"
      @touchstart="progressTouchstart"
      @touchmove="progressTouchmove"
      @touchend="progressTouchend"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    percent: Number
  },
  created() {
    this.touch = {};
  },
  watch: {
    percent(newP) {
      if (newP >= 0&&!this.touch.initialed) {
        let width = this.$refs.barInner.clientWidth * newP;
        this._offset(width);
      }
    }
  },
  methods: {
    progressTouchstart(e) {
      this.touch.initialed = true;
      this.touch.statX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchmove(e) {
      if (!this.touch.initialed) {
        return;
      }
      let delta = e.touches[0].pageX - this.touch.statX;
      let offsetWidth = Math.min(
        this.$refs.barInner.clientWidth,
        Math.max(0, this.touch.left + delta)
      );
      this._offset(offsetWidth);
        this._trigerPercent();
    },
    progressTouchend() {
        this.touch.initialed=false;
        // this._trigerPercent();
    },
    progressClick(e){
        let width=e.pageX-this.$refs.progressBar.getBoundingClientRect().left;
        this._offset(width);
        this._trigerPercent();
    },
    _offset(width) {
      this.$refs.progress.style.width = width + "px";
      this.$refs.btn.style.left = width + "px";
    },
    _trigerPercent(){
        let percent=this.$refs.progress.clientWidth/this.$refs.barInner.clientWidth;
        this.$emit('progressBarChange',percent)
    }
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
.progress-bar
  position: relative
  .bar-inner
    width: 100%
    height: 4px
    background: $color-background-d
  .progress
    height: 4px
    position: absolute
    top: 0
    background: $color-theme-d
  .btn
    width: 4px
    height: 4px
    background: white
    border-radius: 50%
    border: 3px solid $color-theme-d
    position: absolute
    top: -3px
</style>
