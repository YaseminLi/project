<template>
  <div class="song-list">
    <div class="item" v-for="(item,index) in songs" :key="index" @click="selectItem(item,index)">
      <div class="name">{{item.songname}}</div>
      <div class="album">{{songDesc(item)}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songs: Array
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
    }
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
.song-list
  display: flex
  flex-direction: column
  margin: 0 16px
  .item
    padding: 10px 0
    .name
      font-size: 14px
      color: $color-text
      line-height: 21px
    .album
      font-size: 12px
      color: $color-text-lll
      line-height: 18px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
</style>
