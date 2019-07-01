<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import { setTimeout } from "timers";
export default {
  props: {
    probeType: {
      //probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new Bscroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo(){
      this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments);
    },
    scrollToElement(){
      this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  }
};
</script>

<style lang='stylus' ></style>
