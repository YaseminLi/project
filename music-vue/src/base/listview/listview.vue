<template>
  <div class="listview">
    <scroll class="singer-wrapper" :data="data" ref="singerWrapper">
      <div>
        <div class="singer-group" v-for="(item,index) in data" :key="index" ref="singerGroup">
          <h1 class="title">{{item.title}}</h1>
          <div>
            <div class="singer-item" v-for="(singer,index) in item.items" :key="index">
              <img class="avatar" :src="singer.avatar" />
              <span class="name">{{singer.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="list-shortcut"
        @touchstart="onShortcutTouchStart"
        @touchmove="onShortcutTouchMove"
      >
        <span
          class="item"
          :data-index="index"
          v-for="(item,index) in shortcutList"
          :key="index"
        >{{item}}</span>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "base/scroll/scroll.vue";
import { getData } from "common/js/dom.js";
const ANCHOR_HEIGHT=18;
export default {
  created() {
    //data,props中的数据有setter、getter方法，这个不需要
    this.touch = {};
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  computed: {
    shortcutList() {
      return this.data.map(item => {
        return item.title.substr(0, 1);
      });
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      //点击了哪个tag
      let anchorIndex = getData(e.target, "index");
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex=anchorIndex;
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT);
      let anchorIndex=parseInt(this.touch.anchorIndex+delta);
      this._scrollTo(anchorIndex);
    },
    _scrollTo(index) {
      this.$refs.singerWrapper.scrollToElement(this.$refs.singerGroup[index],0);
    }
  },
  components: {
    scroll
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
.singer-wrapper
  position: fixed
  top: 44px
  bottom: 0
  width: 100%
  overflow: hidden
  .singer-group
    padding-bottom: 30px
    .title
      height: 30px
      line-height: 30px
      padding-left: 20px
      background: $color-background-dd
      color: $color-text
      font-size: 12px
    .singer-item
      width: 100%
      box-sizing: border-box
      padding: 20px 0 0 30px
      display: flex
      align-items: center
      .avatar
        border-radius: 50%
        width: 50px
        height: 50px
      .name
        font-size: 14px
        color: $color-text
        margin-left: 20px
  .list-shortcut
    position: absolute
    right: 0
    bottom: 50px
    width: 20px
    padding: 20px 0
    border-radius: 10px
    background: $color-background-dd
    display: flex
    flex-direction: column
    .item
      font-size: 12px
      height: 12px
      width: 14px
      color: $color-text
      padding: 3px
      background: $color-background-dd
      color: $color-text
      text-align: center
</style>
