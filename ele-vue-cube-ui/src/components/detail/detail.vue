<template>
  <transition name="fade">
    <div class="detail" v-show="visible">
      <div class="detail-wrapper clearfix">
        <div class="detail-container">
          <div class="wrapper-title">
            <div class="name">{{seller.name}}</div>
            <Star :score="seller.score" :size="48" />
          </div>
          <div v-if="seller.supports" class="supports">
            <div class="title">
              <div class="line"></div>
              <span class="text">优惠信息</span>
              <div class="line"></div>
            </div>
            <div class="content">
              <div v-for="(support,index) in seller.supports" :key="index" class="item">
                <Support :size="2" :type="support.type" />
                <span class="text">{{support.description}}</span>
              </div>
            </div>
          </div>
          <div v-if="seller.bulletin" class="bulletin">
            <div class="title">
              <div class="line"></div>
              <span class="text">商家公告</span>
              <div class="line"></div>
            </div>
            <div class="content">{{seller.bulletin}}</div>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hide">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import Star from "base/star/star";
import Support from "base/support/support";
import {popupMixin} from"common/js/mixin.js"
export default {
  name: "detail",
  mixins:[popupMixin],
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    Star,
    Support
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'
.fade-enter-active, .fade-leave-active
  transition: opacity 1s
.fade-enter, .fade-leave-to
  opacity: 0
.detail
  width: 100%
  height: 100%
  background: $color-background-s
  position: fixed
  z-index: 100
  top: 0
  left: 0
  overflow: auto
  backdrop-filter: blur(10px)
  color: $color-white
  .detail-close
    position: relative
    width: 32px
    height: 32px
    margin: -64px auto 0 auto
    clear: both
    .icon-close
      font-size: $fontsize-large-xxxx
      color: $color-grey-ssssss
  .detail-wrapper
    min-height: 100%
    .detail-container
      padding: 64px 36px 64px 36px
      display: flex
      flex-direction: column
      .wrapper-title
        display: flex
        flex-direction: column
        align-items: center
        .name
          font-size: $fontsize-large
          font-weight: 700
          margin-bottom: 16px
      .title
        display: flex
        width: 100%
        align-items: center
        margin: 28px auto 24px auto
        .text
          font-size: $fontsize-medium
          font-weight: 700
          margin: 0 12px
        .line
          flex: 1
          height: 1px
          background: $color-grey-sssssss
      .supports
        .content
          padding: 0 12px
          .item
            padding-bottom: 12px
            display: flex
            align-items: center
            &:last-child
              padding-bottom: 0
            .icon
              height: 16px
              width: 16px
              margin-right: 6px
              background-size: 16px 16px
              background-repeat: no-repeat
            .text
              font-size: $fontsize-small
      .bulletin
        .content
          padding: 0 12px 0 12px
          font-size: $fontsize-small
          line-height: 24px
</style>