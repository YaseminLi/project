<template>
  <div class="music-list">
    <div class="info">
      <i @click="back" class="iconfont iconreturn" />
      <img class="avatar" :src="singerInfo.avatar" />
      <div class="name">{{singerInfo.name}}</div>
      <div class="fans">粉丝 {{singerInfo.fans}}</div>
      <div class="desc">{{singerInfo.desc}}</div>
      <div class="play">
        <i class="iconfont iconbofang" />
        <span>随机播放全部</span>
      </div>
    </div>
    <scroll class="list" :data="songs">
      <div>
        <div class="total">
          歌曲共
          <span class="num">{{singerInfo.total_song}}首</span>
        </div>
        <songList :songs="songs" />
      </div>
    </scroll>
  </div>
</template>

<script>
import songList from "base/song-list/song-list";
import scroll from "base/scroll/scroll";
export default {
  props: {
    singerInfo: Object,
    songs: Array
  },
  methods: {
    back() {
      this.$router.push("/singer");
    }
  },
  components: {
    songList,
    scroll
  }
};
</script>

<style lang='stylus'>
@import '~common/stylus/variable'
.music-list
  background: white
  position: absolute
  top: 0
  width: 100%
  min-height: 100%
  .info
    margin: 12px 30px 30px 30px
    display: flex
    flex-direction: column
    align-items: center
    .iconreturn
      color: $color-theme-d
      position: fixed
      left: 10px
      font-size: 30px
      font-weight: 700
    .avatar
      width: 190px
      height: 190px
      border-radius: 50%
      margin-bottom: 25px
      box-shadow: 0 7px 13px rgba(0, 0, 0, 0.21)
    .name
      font-size: 18px
      color: $color-text
      margin-bottom: 12px
    .fans
      font-size: 16px
      color: $color-text
      margin-bottom: 12px
    .desc
      width: 100%
      font-size: 14px
      color: $color-text-l
      margin-bottom: 12px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
    .play
      width: 190px
      height: 40px
      border-radius: 20px
      color: white
      background: $color-theme-d
      box-shadow: 0 6px 32px rgba(24, 213, 156, 0.5)
      display: flex
      justify-content: center
      align-items: center
      .iconbofang
        font-size: 24px
  .list
    position fixed
    top 370px
    bottom 0
    width 100%
    .total
      margin-left: 16px
      font-size: 12px
      color: $color-text-l
      .num
        margin-left: 5px
</style>
