<template>
  <div class="seller" ref="seller">
    <div>
      <div class="desc">
        <div class="desc-header border-1px">
          <div class="title">{{seller.name}}</div>
          <div class="score">
            <v-star :size="36" :score="seller.score"/>
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
      <v-split />
      <div class="bulletin-supports">
        <div class="bulletin border-1px">
          <div class="title">公告与活动</div>
          <div class="content">{{seller.bulletin}}</div>
        </div>
        <div class="supports">
          <v-support
            class="border-1px"
            v-for="(item,index) in seller.supports"
            :key="index"
            :size="4"
            :text="item.description"
            :type="item.type"
          />
        </div>
      </div>
      <v-split />
      <div class="pics">
        <div class="title">商家实景</div>
        <div class="pics-container" ref="pics">
          <div ref="picsInner" class="picsInner">
            <img class="pics-item" v-for="(item,index) in seller.pics" :src="item" :key="index">
          </div>
        </div>
      </div>
      <v-split />
      <div class="infos">
        <div class="title border-1px">商家信息</div>
        <div class="infos-container">
          <div
            class="infos-item border-1px"
            v-for="(item,index) in seller.infos"
            :key="index"
          >{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import star from "components/star/star";
import support from "../support/support.vue";
import split from "components/split/split";
export default {
  props: {
    seller: Object
  },
  data() {
    return {
      collect: false
    };
  },
  created() {
    this.$nextTick(() => {
      let width = 0;
      if (this.seller.pics) {
        width = 126 * this.seller.pics.length - 6;
        this.$refs.picsInner.style.width = width + "px";
      }
      this.sellerScroll = new Bscroll(this.$refs.seller, { click: true });
      this.picsScroll = new Bscroll(this.$refs.pics, { scrollX: true,evnetPassthrough:'vertical' });
    });
  },
  methods: {
    sellerCollect: function() {
      if (!this.collect) {
        this.collect = !this.collect;
      } else {
        this.collect = !this.collect;
      }
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
    "v-star": star,
    "v-support": support,
    'v-split':split
  }
};
</script>

<style lang='stylus'>
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable.styl'
.seller
  color: $color-grey-ssss
  width: 100%
  position: absolute
  top: 174px
  left: 0
  bottom: 0
  overflow: hidden
  .title
    font-size: 14px
  .desc
    padding: 0 18px
    background white
    .desc-header
      position: relative
      padding: 18px 0
      border-1px($color-row-line)
      .score
        height: 18 px
        padding-top: 8px
        display: flex
        align-items: center
        font-size: 10px
        color: $color-grey-s
        line-height: 18px
        .stars
          line-height 18px
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
          font-size: 10px
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
          font-size: 10px
          color: $color-grey
        .content
          font-size: 10px
          .num
            font-size: 24px
            line-height: 24px
  .bulletin-supports
    padding: 0 18px
    background white
    .bulletin
      padding: 18px 0 16px 0
      border-1px($color-row-line)
      .content
        padding: 8px 12px 0 12px
        font-size: 12px
        line-height: 24px
        color: $color-red
    .supports
      .support
        padding: 16px 12px
        border-1px($color-row-line)
        &:last-child
          border-none()
        .icon
          width: 16px
          height: 16px
          margin-right: 6px
          background-size: 16px 16px
        .text
          font-size: 12px
          line-height: 16px
          color: $color-grey-ssss
  .pics
    background white
    padding: 18px
    .pics-container
      width 100%
      margin-top: 12px
      display: flex
      height: 90px
      overflow: hidden
      white-space nowrap
      .picsInner
        height: 90px
        .pics-item
          height: 90px
          width: 120px
          margin-right: 6px
          &:last-child
            margin: 0
  .infos
    background white
    padding: 18px 18px 0 18px
    .title
      padding-bottom: 12px
      border-1px($color-row-line)
    .infos-container
      .infos-item
        padding: 16px 12px
        border-1px($color-row-line)
        font-size: 12px
        line-height: 16px
        &:last-child
          border-none()
</style>
