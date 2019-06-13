<template>
  <div class="detail-wrapper clearfix">
    <div class="container">
      <div class="wrapper-title">
        <div class="name">{{name}}</div>
        <v-star :score='score' :size='24' />
      </div>
      <div v-if="supports" class="supports">
        <div class="title">
          <div class="line"></div>
          <span class="text">优惠信息</span>
          <div class="line"></div>
        </div>
        <div class="content">
          <div class="item" v-for="(support,index) in supports" :key="index">
            <span class="icon" :class="classMap[support.type]"></span>
            <span class="text">{{support.description}}</span>
          </div>
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
import star from '../star/star';
export default {
  props: {
    name: String,
    score: Number,
    supports: Array,
    bulletin: String,
    classMap: Array
  },
  components:{
      'v-star':star
  }
};
</script>

<style lang='stylus' >
@import '../../common/stylus/mixin.styl'
.detail-wrapper
  min-height 100%
  .container
    padding :64px 36px 64px 36px
    display flex
    flex-direction column
    .wrapper-title
      display: flex
      flex-direction: column
      align-items: center
      .name
        font-size: 16px
        font-weight: 700
    .title
      display: flex
      align-items: center
      .text
        font-size: 14px
        font-weight: 700
        margin: 0 11px
      .line
        width: 112px
        height: 1px
        background: rgba(255, 255, 255, 0.2)
    .supports
      .content
        padding: 18px 12px 22px 12px
        .item
          padding: 6px 0
          display: flex
          align-items: center
          .icon
            height: 16px
            width: 16px
            margin-right: 6px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_2')
            &.discount
              bg-img('discount_2')
            &.guarantee
              bg-img('guarantee_2')
            &.invoice
              bg-img('invoice_2')
            &.special
              bg-img('special_2')
          .text
            font-size: 12px
    .bulletin
      .content
        padding: 24px 12px 0 12px
        font-size: 12px
        line-height: 24px

</style>