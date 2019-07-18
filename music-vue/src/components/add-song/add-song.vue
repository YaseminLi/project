<template>
  <div class="add-song" v-show="showing">
    <div class="header">
      添加歌曲到列表
      <i class="iconfont iconremove" @click.stop="close"></i>
    </div>
    <div class="search-box-wrapper">
      <searchBox />
    </div>
    <div class="shortcut">
      <span class="switch" :class="activeSwitch('play')" @click.stop="switchItem">最近播放</span>
      <span class="switch" :class="activeSwitch('search')" @click.stop="switchItem">搜索历史</span>
    </div>
    <div class="content">
      <scroll class="play">
        <div>a</div>
      </scroll>
      <scroll class="search">
        <div>
          <searchList :searchList="searchHistory" :title="false" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import searchBox from "base/search-box/search-box";
import scroll from "base/scroll/scroll";
import searchList from "base/search-list/search-list";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showing: false,
      switch: "play"
    };
  },
  computed: {
    ...mapGetters(["searchHistory"])
  },
  methods: {
    show() {
      this.showing = true;
    },
    close() {
      this.showing = false;
    },
    switchItem() {
      this.switch = this.switch == "play" ? "search" : "play";
    },
    activeSwitch(item) {
      return this.switch == item ? "active" : "";
    }
  },
  components: {
    searchBox,
    scroll,
    searchList
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.add-song
  width: 100%
  position: fixed
  top: 0
  bottom: 0
  overflow: hidden
  background: white
  z-index: 200
  .header
    text-align: center
    font-size: 18px
    line-height: 44px
    color: $color-theme
    .iconfont
      color: $color-theme-d
      position: absolute
      right: 20px
      font-size: 16px
  .shortcut
    width: 240px
    border: 1px solid $color-background-d
    border-radius: 5px
    font-size: 14px
    margin: 10px auto
    color: $color-background-d
    overflow: hidden
    .switch
      display: inline-block
      text-align: center
      line-height: 30px
      width: 120px
      &.active
        color: white
        background: $color-background-d
</style>
