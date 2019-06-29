<template>
  <div class="listview">
    <scroll class="singer-wrapper" :data="data" ref="singerWrapper">
      <div>
        <div class="singer-container" v-for="(item,index) in data" :key="index">
          <h1 class="title">{{item.title}}</h1>
          <div>
            <div class="singer-item" v-for="(singer,index) in item.items" :key="index">
              <img class="avatar" :src="singer.avatar">
              <span class="name">{{singer.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="list-shortcut">
      <span
        @click="selectTitle(index)"
        class="item"
        v-for="(item,index) in data"
        :key="index"
      >{{index==0?'热':item.title}}</span>
    </div>
  </div>
</template>

<script>
import scroll from "base/scroll/scroll.vue";
export default {
  props: {
    data: {
      type: Array,
      default: null
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
  .singer-container
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
