<template>
  <div class="song-list">
    <div class="item" v-for="(item,index) in songs" :key="index" @click="selectItem(item,index)">
      <div class="rank" v-show="rank&&index>2">{{index}}</div>
      <div class="rank" v-show="rank&&index<3">
        <i class="iconfont" :class="rankNum(index)"></i>
      </div>
      <div class="content">
        <div class="name">{{item.songname}}</div>
        <div class="album">{{songDesc(item)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songs: Array,
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    songDesc(song) {
      let array = [];
      array.push(song.singer);
      array.push(song.album);
      if (song.albumdesc !== "") {
        array.push(song.albumdesc);
      }
      let songDesc = array.join("·");
      return songDesc;
    },
    selectItem(item, index) {
      this.$emit("selectItem", item, index);
    },
    rankNum(index) {
      return `iconrank${index + 1}`;
    }
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
  @import '~common/stylus/mixin'
.song-list
  display: flex
  flex-direction: column
  margin: 0 16px
  .item
    padding: 10px 0
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    overflow hidden
    .rank
      flex: 0 0 20px
      line-height: 39px
      margin-right 10px
      color: $color-theme-d
      text-align center
      .iconfont
        font-size 20px
    .content
      flex: 1
      overflow hidden
      .name
        font-size: 14px
        color: $color-text
        line-height: 21px
        no-wrap()
      .album
        font-size: 12px
        color: $color-text-lll
        line-height: 18px
        no-wrap()
</style>
