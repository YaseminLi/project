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
        <v-support
          v-if="seller.supports"
          :size="1"
          :text="seller.supports[0].description"
          :type="seller.supports[0].type"
        />
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
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <v-detail
          :name="seller.name"
          :score="seller.score"
          :supports="seller.supports"
          :bulletin="seller.bulletin"
        />
        <div class="detail-close" @click="showDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import detail from "../detail/detail.vue";
import support from "../support/support.vue";
export default {
  data() {
    return {
      classMap: ["decrease", "discount", "guarantee", "invoice", "special"],
      detailShow: false
    };
  },
  props: {
    seller: { type: Object }
  },
  methods: {
    showDetail() {
      this.detailShow = !this.detailShow;
    }
  },
  components: {
    "v-detail": detail,
    "v-support": support
  }
};
</script>

<style lang='stylus' >
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable.styl'
.header
  width: 100%
  height: 134px
  position: relative
  background: $color-background-ss
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
          bg-img('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          font-size: 16px
          line-height: 18px
          font-weight: bold
          margin-left: 6px
    .description
      font-size: 12px
      margin: 8px 0 10px 0
    .support
      font-size: 10px
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
      font-size: 10px
      line-height: 12px
      span
        margin-right: 2px
        width: 20px
  .bulletin-wrapper
    font-size: 10px
    line-height: 28px
    padding: 0 12px
    background-color: $color-background-sssssss
    display: flex
    align-items: center
    .bulletin-title
      display: inline-block
      width: 22px
      height: 12px
      bg-img('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
      margin-right: 4px
    .bulletin-text
      width: 96%
      margin-right: 4px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
  .background
    width: 100%
    height: 100%
    position: absolute
    left: 0
    top: 0
    z-index: -1
    filter: blur(5px)
    // clip: rect(0px 375px 134px 0px)
    img
      width: 100%
      height: 100%
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
    .detail-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto 0 auto
      clear: both
      .icon-close
        font-size: 32px
        color: $color-grey-ssssss
</style>
