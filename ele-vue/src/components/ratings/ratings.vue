<template>
  <div class="ratings" ref="ratings">
    <div>
      <div class="ratings-seller container">
        <div class="total">
          <div class="score">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="scores">
          <div class="service item">
            服务态度
            <v-star :size="36" :score="seller.serviceScore"/>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="food item">
            味道评分
            <v-star :size="36" :score="seller.foodScore"/>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery item">
            送达时间
            <span class="text">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="ratings-content container">
        <div class="rateType border-1px">
          <span class="type all">
            全部
            <span class="ratings-num">1</span>
          </span>
          <span class="type thumb-up">
            推荐
            <span class="ratings-num">2</span>
          </span>
          <span class="type thumb-down">
            吐槽
            <span class="ratings-num">3</span>
          </span>
        </div>
        <div class="contentOnly">
          <i class="icon-check_circle"></i>
          <span class="selectedRatings">只看有内容的评价</span>
        </div>
        <div class="rating-list">
          <div class="item border-1px" v-for="(item,index) in ratings" :key="index">
            <img class="avatar" :src="item.avatar">
            <div class="content">
              <div class="username-time">
                <span class="username">{{item.username}}</span>
                <span class="time">{{rateTime(item.rateTime)}}</span>
              </div>
              <div class="score">
                <v-star :size="24" :score="item.score"/>
                <span class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">{{item.text}}</div>
              <div class="recommend">
                <i :class="ratingTypeMap[item.rateType]" class="thumpType"></i>
                <span
                  class="recommend-item"
                  v-show="index<4"
                  v-for="(recommend,index) in item.recommend"
                  :key="index"
                >{{recommend}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll';
import star from "components/star/star";
import { timeStamp } from "common/js/util.js";
export default {
  data() {
    return {
      ratings: [],
      ratingTypeMap: ["icon-thumb_up", "icon-thumb_down"]
    };
  },
  props: {
    seller: Object
  },
  created() {
    this.$http.get("/api/ratings").then(response => {
      this.ratings = response.body;
      this.$nextTick(()=>{
        this.ratingsScroll=new Bscroll(this.$refs.ratings,{click:true});
      });
    }),
      () => {
        console.log("无法获取评价数据");
      };
  },
  methods: {
    rateTime: function(a) {
      return timeStamp(a);
    }
  },
  components: {
    "v-star": star
  }
};
</script>

<style lang='stylus' scoped>
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable.styl'
.ratings
  background: $color-background-ssss
  width: 100%
  position: absolute
  top: 174px
  left: 0
  bottom: 50px
  overflow: hidden
  .ratings-seller
    margin-top: 0
    border-top: 0
    display: flex
    flex-direction: row
    .total
      flex: 137px
      margin: 18px 0px
      display: flex
      flex-direction: column
      align-items: center
      // 1px?
      border-right: 1px solid $color-row-line
      .score
        color: $color-yellow
        font-size: 24px
        line-height: 28px
      .text
        font-size: 12px
        color: $color-grey-ssss
        line-height: 24px
      .rankRate
        font-size: 10px
        color: $color-grey
    .scores
      flex: 237px
      padding: 18px 24px
      box-sizing: border-box
      .item
        font-size: 12px
        line-height: 18px
        color: $color-grey-ssss
        display: flex
        margin-bottom: 8px
        &:last-child
          margin: 0
        .stars
          margin: 0 12px
        .score
          color: $color-yellow
        .text
          color: $color-grey
          margin-left: 12px
  .ratings-content
    background: white
    border-bottom none
    .rateType
      margin: 18px 18px 0 18px
      padding-bottom: 18px
      border-1px($color-row-line)
      display: flex
      .type
        padding: 8px 12px
        font-size: 12px
        border-radius: 2px
        margin-right: 8px
        .ratings-num
          font-size: 8px
        &.all
          color: white
          background: $color-blue
        &.thumb-up
          color: $color-grey-s
          background: $color-light-blue
        &.thumb-down
          color: $color-grey-s
          background: $color-background-ssss
    .contentOnly
      padding: 12px 18px
      display: flex
      color: $color-grey
      border-bottom: 1px solid $color-row-line
      .icon-check_circle
        font-size: 24px
      .selectedRatings
        font-size: 12px
        line-height: 24px
        margin-left: 4px
    .rating-list
      margin: 0 18px
      display: flex
      flex-direction: column
      .item
        padding: 18px 0
        border-1px($color-row-line)
        display: flex
        &:last-child
                border-none();
        .avatar
          width: 28px
          height: 28px
          border-radius: 50%
          margin-right: 12px
        .content
          flex: 1
          display: flex
          flex-direction: column
          // padding-right 18px
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
            font-size: 12px
            line-height: 18px
            margin-bottom: 8px
          .recommend
            display: flex
            align-items: center
            .thumpType
              font-size: 12px
              &.icon-thumb_up
                color: $color-blue
              &.icon-thumb_down
                color: $color-grey
            .recommend-item
              height: 16px
              max-width: 63px
              box-sizing: border-box
              margin-left: 8px
              // 1px?
              border: 1px solid $color-row-line
              border-radius: 1px
              padding: 0 6px
              font-size: 9px
              color: $color-grey
              line-height: 16px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              
</style>
