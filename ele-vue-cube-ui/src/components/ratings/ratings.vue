<template>
  <cube-scroll class="ratings-wrapper" :options="scrollOptions" :data="computedRatings">
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
      <div class="ratings-content" v-if="ratings.length">
        <RatingSelect
          :ratings="ratings"
          @toggleContent="toggleContent"
          @selectType="select"
          :selectType="selectType"
          :contentOnly="contentOnly"
        />
        <div class="rating-list">
          <div class="item border-bottom-1px" v-for="(item,index) in computedRatings" :key="index">
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
        <div class="no-rating" v-show="!computedRatings.length">暂无评价</div>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import Star from "base/star/star";
import { getRatings } from "api/index";
import { ratingsMixin } from "common/js/mixin.js";
export default {
  mixins: [ratingsMixin],
  data() {
    return {
      ratings: [],
      scrollOptions: {
        //cube-ui默认click为true，这里不需要点击多次
        click: false,
        //避免纵向横向的滚动冲突
        directionLockThreshold: 0
      }
    };
  },
  props: {
    seller: Object
  },
  methods: {
    fetch() {
      if (!this.fetched) {
        this.fetched = true;
        getRatings().then(res => {
          this.ratings = res;
        }),
          () => {
            console.log("无法获取评价数据");
          };
      }
    }
  },
  components: {
    Star
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'
.ratings-wrapper
  position: relative
  height: 100%
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
        font-size: $fontsize-small-s
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
    .no-rating
      padding: 16px
      font-size: $fontsize-small
      color: $color-grey
    .rating-list
      margin: 0 18px
      .item
        padding: 18px 0
        display: flex
        white-space: normal
        &:last-child
          border-none()
        .avatar
          flex: 0 0 28px
          width: 28px
          height: 28px
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
            flex-wrap: wrap
            .thumpType
              margin-bottom: 6px
              font-size: 12px
              margin-right: 8px
              &.icon-thumb_up
                color: $color-blue
              &.icon-thumb_down
                color: $color-grey
            .recommend-item
              margin-bottom: 6px
              height: 16px
              box-sizing: border-box
              margin-right: 8px
              border: 1px solid $color-row-line
              border-radius: 1px
              padding: 0 6px
              font-size: 9px
              color: $color-grey
              line-height: 16px
</style>
