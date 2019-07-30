<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟必达</div>
        <div v-if="seller.supports" class="supports">
          <Support :type="seller.supports[0].type" :size="1"/>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span>{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right" @click="showDetail"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
  </div>
</template>

<script>
import Support from "base/support/support"
export default {
  props: {
    seller: { type: Object }
  },
  methods: {
    showDetail() {
      this.detailCom=this.detailCom||this.$createDetail({
        $props:{
          seller:"seller"
        }
      })
      this.detailCom.show()
    }
  },
  components: {
    Support
  }
};
</script>

<style lang='stylus' >
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.header
  width: 100%
  height: 134px
  position: relative
  background:$color-background-ssss
  overflow hidden
  color $color-white
  .content-wrapper
    padding: 24px 12px 18px 24px
    display: flex
    height: 64px
    position: relative
    .avatar img
      height: 64px
      width: 64px
      border-radius: 2px
      margin-right: 16px
    .content
      margin: 2px 0
      height: 60px
      .title
        display: flex
        align-items: center
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          font-size: $fontsize-large
          line-height: 18px
          font-weight: bold
          margin-left: 6px
    .description
      font-size: $fontsize-small 
      margin: 8px 0 10px 0
    .supports
      font-size: $fontsize-small-s
      line-height: 12px
      display: flex
      align-items: center
      .icon
        margin-right: 4px
        width: 12px
        height: 12px
        background-size: 12px
    .support-count
      background-color: $color-background-ssssss
      border-radius: 24px
      height: 10px
      padding: 7px 8px
      position: absolute
      right: 12px
      bottom: 14px
      display: flex
      align-items: center
      font-size:$fontsize-small-s
      line-height: 12px
      span
        margin-right: 2px
        width: 20px
  .bulletin-wrapper
    font-size: $fontsize-small-s
    line-height: 28px
    padding: 0 12px
    background-color: $color-background-sssss 
    display: flex
    align-items: center
    .bulletin-title
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
      margin-right: 4px
    .bulletin-text
      width: 88%
      margin-right: 4px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      line-height: 28px
  .background
    width: 100%
    position: absolute
    left: 0
    top: 0
    z-index: -1
    filter: blur(5px)
    img
      width: 100%
      height: 100%
</style>
