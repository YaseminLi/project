<template>
  <transition name="move">
    <div class="food" v-show="foodShow" ref="food">
      <div>
        <div class="description">
          <div class="image-head">
            <img class="image" :src="food.image">
            <i class="icon-arrow_lift" @click="showFood"></i>
          </div>
          <div class="food-description">
            <div class="name">{{food.name}}</div>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="mark">¥</span>
              <span class="now">{{food.price}}</span>
              <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <div class="add-cart" v-show="!food.count||food.count===0" @click="addFirst">加入购物车</div>
              <v-cartcontrol v-show="food.count" :food="food" @decrease="decrease" @add="add"/>
            </div>
          </div>
        </div>
        <v-split/>
        <div class="info" v-show="food.info">
          <div class="title">商品介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
        <v-split v-show="food.info"/>
        <div class="ratings">
          <div class="title">商品评价</div>
          <v-ratingSelect
            :ratings="food.ratings"
            :desc="desc"
            @contentOnly="toggleContent"
            @selectType="select"
          />
          <div class="ratings-list" v-show="food.ratings && food.ratings.length">
            <div
              v-show="needShow(rating.rateType,rating.text)"
              v-for="(rating,index) in food.ratings"
              :key="index"
              class="rating-item border-1px"
            >
              <div class="time-user">
                <span class="time">{{rateTime(rating.rateTime)}}</span>
                <div class="user">
                  <span class="username">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar">
                </div>
              </div>
              <div class="content">
                <i class="type" :class="ratingTypeMap[rating.rateType]"></i>
                <span class="text">{{rating.text}}</span>
              </div>
            </div>
          </div>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import cartcontrol from "components/cartcontrol/cartcontrol";
import ratingSelect from "components/ratingSelect/ratingSelect";
import split from "components/split/split";
import { timeStamp } from "common/js/util.js";
export default {
  props: {
    food: Object
  },
  data() {
    return {
      foodShow: false,
      ratingTypeMap: ["icon-thumb_up", "icon-thumb_down"],
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      },
      contentOnly: false,
      selectType: 2
    };
  },
  methods: {
    showFood: function() {
      this.foodShow = !this.foodShow;

      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, { click: true });
        } else {
          this.scroll.refresh();
        }
      });
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
    },
    toggleContent: function(boolean) {
      this.contentOnly = boolean;
    },
    select: function(type) {
      this.selectType = type;
    },
    rateTime: function(a) {
      return timeStamp(a);
    },
    add: function() {
      this.$emit("add", this.food);
    },
    addFirst: function() {
      this.$emit("add", this.food);
    },
    decrease: function() {
      this.$emit("decrease", this.food);
    }
  },
  components: {
    "v-cartcontrol": cartcontrol,
    "v-ratingSelect": ratingSelect,
    "v-split": split
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable.styl'
.food
  position: fixed
  top: 0
  left: 0
  bottom: 50px
  width: 100%
  z-index: 30
  &.move-enter, .move-leave-to
    transform: translateX(100%)
  &.move-enter-active, .move-leave-active
    transition: all 0.8s linear
  .description
    background: white
    margin: 0
    .image-head
      width: 100%
      height: 0
      padding-bottom: 100%
      position: relative
      .image
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
      .icon-arrow_lift
        font-size: 20px
        padding: 18px
        color: white
        position: absolute
        top: 0px
        left: 0px
    .food-description
      padding: 18px
      background: white
      position: relative
      .name
        font-size: 14px
        font-weight: 700
        color: $color-grey-ssss
      .detail
        margin-top: 8px
        font-size: 10px
        color: $color-grey
        .rating
          margin-left: 12px
      .price
        margin-top: 18px
        line-height: 24px
        display: flex
        .mark
          font-size: 10px
          font-weight: normal
          color: $color-red
          margin-top: 1px
          margin-right: 1px
        .now
          font-size: 14px
          font-weight: 700
          color: $color-red
        .old
          margin-left: 8px
          font-size: 10px
          color: $color-grey
          font-weight: 700
          text-decoration: line-through
      .cartcontrol-wrapper
        position: absolute
        right: 18px
        bottom: 18px
        .add-cart
          margin-bottom: 6px
          font-size: 10px
          color: white
          line-height: 12px
          border-radius: 12px
          background: $color-blue
          width: 74px
          padding: 6px 12px
          box-sizing: border-box
          text-align: center
          height: 24px
  .info
    background: white
    padding: 18px
    .title
      font-size: 14px
      color: $color-grey-ssss
    .content
      margin-top: 6px
      padding: 0 8px
      margin-right: 8px
      font-size: 12px
      color: $color-grey-s
      line-height: 24px
  .ratings
    background: white
    padding-top: 18px
    .title
      font-size: 14px
      color: $color-grey-ssss
      padding: 0 18px
    .ratings-list
      background: white
      .rating-item
        padding: 16px 0
        margin: 0 18px
        border-1px($color-row-line)
        .time-user
          font-size: 10px
          line-height: 12px
          color: $color-grey
          margin-bottom: 6px
          display: flex
          justify-content: space-between
          .user
            display: flex
            .avatar
              width: 12px
              height: 12px
              border-radius: 50%
              margin-left: 6px
        .content
          display: flex
          font-size: 12px
          align-items: center
          .type
            color: $color-grey
            line-height: 24px
            font-size: 12px
            &.icon-thumb_up
              color: $color-blue
          .text
            color: $color-grey-ssss
            line-height: 16px
            margin-left: 4px
    .no-rating
      padding: 16px
      font-size: 12px
      color: $color-grey
</style>