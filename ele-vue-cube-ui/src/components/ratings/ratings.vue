<template>
  <cube-scroll class="ratings-wrapper" >
    <div>
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="item">
            服务态度
            <Star :size="36" :score="seller.serviceScore" />
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="item">
            商品评分
            <Star :size="36" :score="seller.foodScore" />
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="item">
            送达时间
            <span class="text">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split />
      <div class="ratings-content">
        <RatingSelect :ratings="ratings" @contentOnly="toggleContent" @selectType="select" />
        <div class="rating-list">
          <div
            v-show="needShow(item.rateType,item.text)"
            class="item border-bottom-1px"
            v-for="(item,index) in ratings"
            :key="index"
          >
            <img class="avatar" :src="item.avatar" />
            <div class="content">
              <div class="username-time">
                <span class="username">{{item.username}}</span>
                <span class="time">{{rateTime(item.rateTime)}}</span>
              </div>
              <div class="score">
                <Star :size="24" :score="item.score" />
                <span class="deliveryTime" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">{{item.text}}</div>
              <div class="recommend" v-show="item.recommend.length!==0">
                <i :class="ratingTypeMap[item.rateType]" class="thumpType"></i>
                <span
                  class="recommend-item"
                  v-for="(recommend,index) in item.recommend"
                  :key="index"
                >{{recommend}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
// import Bscroll from "better-scroll";
import Star from "base/star/star";
import Split from "base/split/split";
import RatingSelect from "components/rating-select/rating-select";
import { timeStamp } from "common/js/util.js";
import { getRatings } from "api/index";
export default {
  data() {
    return {
      ratings: [],
      ratingTypeMap: ["icon-thumb_up", "icon-thumb_down"],
      contentOnly: false,
      selectType: 2
    };
  },
  props: {
    seller: Object
  },
  methods: {
   fetch() {
      getRatings().then(res => {
        this.ratings = res;
        // this.$nextTick(() => {
        //   if (!this.scroll) {
        //     this.scroll = new Bscroll(this.$refs.ratings, { click: true });
        //   } else {
        //     this.scroll.refresh();
        // //   }
        // });
      }),
        () => {
          console.log("无法获取评价数据");
        };
    },
    rateTime: function(a) {
      return timeStamp(a);
    },
    toggleContent: function(boolean) {
      this.contentOnly = boolean;
      if(boolean){
        this._ratingsContentOnly()
      }
      
    },
    _ratingsContentOnly() {
     this.ratings.filter(item => item.text !== "");
    },
    select: function(type) {
      this.selectType = type;
    },
    needShow: function(type, text) {
      if (this.contentOnly && !text) {
        return false;
      }
      if (this.selectType == type || this.selectType == 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    Star,
    Split,
    RatingSelect
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'
.ratings-wrapper
  position: relative
  height 100%
  .overview
    background: white
    display: flex
    flex-direction: row
    .overview-left
      flex: 0 0 137px
      margin: 18px 0px
      display: flex
      flex-direction: column
      align-items: center
      border-right-1px($color-row-line)
      @media screen and (max-width: 360px)
        flex: 0 0 120px
      .score
        color: $color-yellow
        font-size: 24px
        line-height: 28px
        margin-bottom: 6px
      .text
        font-size: $fontsize-small
        color: $color-grey-ssss
        line-height: 12px
        margin-bottom: 8px
      .rankRate
        font-size:$fontsize-small-s
        color: $color-grey
        margin-bottom: 6px
    .overview-right
      flex: 1
      padding: 18px 24px
      box-sizing: border-box
      @media screen and (max-width: 360px)
        padding: 18px 4px
      .item
        font-size: $fontsize-small
        line-height: 18px
        color: $color-grey-ssss
        display: flex
        align-items: center
        margin-bottom: 8px
        height: 18px
        &:last-child
          margin: 0
        .stars
          margin: 0 12px
          height: 18px
        .score
          color: $color-yellow
        .text
          color: $color-grey
          margin-left: 12px
  .ratings-content
    background: white
    border-bottom: none
    .rating-list
      margin: 0 18px
      .item
        padding: 18px 0
        display: flex
        &:last-child
          border-none()
        .avatar
          flex 0 0 28px
          width 28px
          height 28px
          border-radius: 50%
          margin-right: 12px
        .content
          flex: 1
          .username-time
            display: flex
            justify-content: space-between
            font-size: 10px
            line-height: 12px
            .username
              color: $color-grey-ssss
            .time
              color: $color-grey
          .score
            margin: 4px 0 6px 0
            display: flex
            .deliveryTime
              font-size: 10px
              line-height: 12px
              color: $color-grey
              margin-left: 6px
          .text
            color: $color-grey-ssss
            font-size: $fontsize-small
            line-height: 18px
            margin-bottom: 8px
          .recommend
            display: flex
            align-items: center
            flex-wrap wrap
            .thumpType
              margin-bottom 6px
              font-size: 12px
              margin-right: 8px
              &.icon-thumb_up
                color: $color-blue
              &.icon-thumb_down
                color: $color-grey
            .recommend-item
              margin-bottom 6px
              height: 16px
              box-sizing: border-box
              margin-right: 8px
              border: 1px solid $color-row-line
              border-radius: 1px
              padding: 0 6px
              font-size: 9px
              color: $color-grey
              line-height: 16px
              // overflow: hidden
              // text-overflow: ellipsis
              // white-space: nowrap
</style>
