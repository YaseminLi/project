<template>
 <div class="song-list">
<div class="item" v-for="(item,index) in songs" :key="index">
  <div class="name">{{item.songname}}</div>
  <div class="album">{{item.singer}}·{{item.album}}</div>
</div>
 </div>
</template>

<script>
 export default {
   props:{
       songs:Array
   },
 };
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
.song-list 
  display flex
  flex-direction column
  margin 0 16px
  .item
    padding 10px 0
    .name
      font-size 14px
      color $color-text
      line-height 21px
    .album
      font-size 12px
      color $color-text-lll 
      line-height 18px
 
</style>
