<template>
  <cube-scroll class="seller" :options="sellerScrollOptions">
    <div class="desc">
      <div class="desc-header border-bottom-1px">
        <div class="title">{{seller.name}}</div>
        <div class="score">
          <Star :size="36" :score="seller.score" />
          <span class="num">({{seller.ratingCount}})</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <div :class="{'active':collect}" class="collect-container" @click="sellerCollect">
          <i class="icon-favorite"></i>
          <span class="text">{{collectDesc}}</span>
        </div>
      </div>
      <div class="delivery">
        <div class="item border-right-1px">
          <div class="title">起送价</div>
          <div class="content">
            <span class="num">{{seller.minPrice}}</span>元
          </div>
        </div>
        <div class="item border-right-1px">
          <div class="title">商家配送</div>
          <div class="content">
            <span class="num">{{seller.deliveryPrice}}</span>元
          </div>
        </div>
        <div class="item border-right-1px">
          <div class="title">平均配送时间</div>
          <div class="content">
            <span class="num">{{seller.deliveryTime}}</span>元
          </div>
        </div>
      </div>
    </div>
    <Split />
    <div class="bulletin-supports">
      <div class="bulletin border-bottom-1px">
        <div class="title">公告与活动</div>
        <div class="content">{{seller.bulletin}}</div>
      </div>
      <div class="supports">
        <div class="border-bottom-1px support" v-for="(item,index) in seller.supports" :key="index">
          <Support :size="4" :type="item.type" />
          <span class="text">{{item.description}}</span>
        </div>
      </div>
    </div>
    <Split />
    <div class="pics">
      <div class="title">商家实景</div>
      <cube-scroll class="pics-container" :data="seller.pics" direction="horizontal" :options="picsScrollOptions">
        <div  class="picsInner">
          <img class="pics-item" v-for="(item,index) in seller.pics" :src="item" :key="index" />
        </div>
      </cube-scroll>
    </div>
    <Split />
    <div class="infos">
      <div class="title border-bottom-1px">商家信息</div>
      <div class="infos-container">
        <div
          class="infos-item border-bottom-1px"
          v-for="(item,index) in seller.infos"
          :key="index"
        >{{item}}</div>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import Star from "base/star/star";
import Support from "base/support/support";
import Split from "base/split/split";
import { saveToLocal, loadFromStore } from "common/js/store.js";
export default {
  props: {
    seller: Object
  },
  data() {
    return {
      collect: (() => {
        return loadFromStore(this.seller.id, "collect", false);
      })(),
      sellerScrollOptions: {
        click: false,
        directionLockThreshold:0
      },
      //开启横向滚动，禁止当前区域cube-slide切换用stopPropagation
      picsScrollOptions: {
        scrollX:true,
        stopPropagation:true,
        directionLockThreshold:0
      },
    };
  },
  methods: {
    sellerCollect: function() {
      this.collect = !this.collect;
      saveToLocal(this.seller.id, "collect", this.collect);
    }
  },
  computed: {
    collectDesc() {
      if (this.collect) {
        return "已收藏";
      } else {
        return "收藏";
      }
    }
  },
  components: {
    Star,
    Support,
    Split
  }
};
</script>

<style lang='stylus'>
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'
.seller
  height: 100%
  position: relative
  color: $color-grey-ssss
  .title
    font-size $fontsize-medium
  .desc
    padding: 0 18px
    background: white
    .desc-header
      position: relative
      padding: 18px 0
      .score
        height: 18 px
        padding-top: 8px
        display: flex
        align-items: center
        font-size: $fontsize-small-s
        color: $color-grey-s
        line-height: 18px
        .stars
          line-height: 18px
        .num
          margin: 0 12px 0 8px
      .collect-container
        position: absolute
        right: 0
        bottom: 18px
        display: flex
        flex-direction: column
        align-items: center
        width: 30px
        font-size: 24px
        color: $color-grey
        &.active
          .icon-favorite
            color: $color-red
        .text
          font-size: $fontsize-small-s
          color: $color-grey-s
          margin-top: 4px
    .delivery
      padding: 18px 0
      display: flex
      .item
        border-right-1px($color-row-line)
        flex: 1
        text-align: center
        &:last-child
          border-none()
        .title
          margin-bottom: 4px
          font-size: $fontsize-small-s
          color: $color-grey
        .content
          font-size: $fontsize-small-s
          .num
            font-size: 24px
            line-height: 24px
  .bulletin-supports
    padding: 0 18px
    background: white
    .bulletin
      padding: 18px 0 16px 0
      white-space: normal
      .content
        padding: 8px 12px 0 12px
        font-size: $fontsize-small
        line-height: 24px
        color: $color-red
        word-break break-all
    .supports
      .support
        padding: 16px 12px
        display: flex
        align-items: center
        &:last-child
          border-none()
        .icon
          width: 16px
          height: 16px
          margin-right: 6px
          background-size: 16px 16px
        .text
          font-size: $fontsize-small
          line-height: 16px
          color: $color-grey-ssss
  .pics
    background: white
    padding: 18px
    .pics-container
      width: 100%
      margin-top: 12px
      display: flex
      height: 90px
      overflow: hidden
      white-space: nowrap
      .picsInner
        height: 90px
        .pics-item
          height: 90px
          width: 120px
          margin-right: 6px
          &:last-child
            margin: 0
  .infos
    background: white
    padding: 18px 18px 0 18px
    .title
      padding-bottom: 12px
    .infos-container
      .infos-item
        padding: 16px 12px
        font-size: $fontsize-small
        line-height: 16px
        &:last-child
          border-none()
</style>
