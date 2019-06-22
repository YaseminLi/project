<template>
  <div class="detail-wrapper clearfix">
    <div class="detail-container">
      <div class="wrapper-title">
        <div class="name">{{name}}</div>
        <v-star :score="score" :size="48"/>
      </div>
      <div v-if="supports" class="supports">
        <div class="title">
          <div class="line"></div>
          <span class="text">优惠信息</span>
          <div class="line"></div>
        </div>
        <div class="content">
          <v-support
            v-for="(support,index) in supports"
            :key="index"
            :size="2"
            :text="support.description"
            :type="support.type"
          />
        </div>
      </div>
      <div v-if="bulletin" class="bulletin">
        <div class="title">
          <div class="line"></div>
          <span class="text">商家公告</span>
          <div class="line"></div>
        </div>
        <div class="content">{{bulletin}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import star from "../star/star";
import support from "../support/support.vue";
export default {
  props: {
    name: String,
    score: Number,
    supports: Array,
    bulletin: String,
  },
  components: {
    "v-star": star,
    "v-support": support
  }
};
</script>

<style lang='stylus' >
@import '../../common/stylus/mixin.styl';
@import '../../common/stylus/variable.styl';
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
        font-size: 16px
        font-weight: 700
        margin-bottom: 16px
    .title
      display: flex
      width: 100%
      align-items: center
      margin: 28px auto 24px auto
      .text
        font-size: 14px
        font-weight: 700
        margin: 0 12px
      .line
        flex: 1
        height: 1px
        background: $color-grey-ss
    .supports
      .content
        padding: 0 12px
        .support
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
            font-size: 12px
    .bulletin
      .content
        padding: 0 12px 0 12px
        font-size: 12px
        line-height: 24px
</style>