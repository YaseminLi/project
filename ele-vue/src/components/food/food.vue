<template>
  <div class="food" v-show="foodShow" ref="food">
    <div>
      <div class="description">
        <img class="image" :src="food.image">
        <div class="food-description">
          <div class="name">{{food.name}}</div>
          <div class="sellCountRating">
            <span class="sellCount">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="mark">¥</span>
            <span class="nowPrice">{{food.price}}</span>
            <span class="oldPrice" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="add-cart">加入购物车</div>
        </div>
      </div>
      <div class="info">
        <div class="title">商品介绍</div>
        <div class="content">{{food.info}}</div>
      </div>
      <div class="rating-wrapper">
        <div class="head">
          <div class="title">商品评价</div>
          <div class="rateType border-1px">
            <span class="type all">
              全部
              <span class="ratings-num">{{allNum}}</span>
            </span>
            <span class="type thumb-up">
              推荐
              <span class="ratings-num">{{upNum}}</span>
            </span>
            <span class="type thumb-down">
              吐槽
              <span class="ratings-num">{{downNum}}</span>
            </span>
          </div>
          <div class="contentOnly" >
            <i class="icon-check_circle"></i>
            <span class="selectedRatings">只看有内容的评价</span>
          </div>
        </div>
      </div>

      <div class="ratings">
        <div v-for="(rating,index) in food.ratings" :key="index" class="rating-item border-1px">
          <div class="time-user">
            <span class="time">{{rating.rateTime}}</span>
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
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    food: Object
  },
  created() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.food, { click: true });
    });
  },
  data() {
    return {
      foodShow: false,
      ratingTypeMap: ["icon-thumb_up", "icon-thumb_down"]
    };
  },
  methods: {
    showFood: function() {
      this.foodShow = true;
    }
  },
  computed: {
    allNum() {
      if (!this.food.ratings) {return;}
        return this.food.ratings.length;
    
    },
    upNum() {
     let count = 0;
      if (this.food.ratings) {
        let ratings = this.food.ratings;
        for (let i = 0; i < ratings.length; i++) {
          if (ratings[i].rateType === 1) {
            count += 1;
          }
        }
      }
      return count;
      },
    downNum() {
      let count = 0;
      if (this.food.ratings) {
        let ratings = this.food.ratings;
        for (let i = 0; i < ratings.length; i++) {
          if (ratings[i].rateType === 1) {
            count += 1;
          }
        }
      }
      return count;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.food
  position: fixed
  top: 0
  left: 0
  bottom: 50px
  width: 100%
  z-index: 30
  background: #f3f5f7
  .description
    background: white
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .image
      width: 100%
      height: 375px
    .food-description
      padding: 18px
      background: white
      position: relative
      .name
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .sellCountRating
        margin-top: 8px
        font-size: 10px
        color: rgb(147, 153, 159)
        .rating
          margin-left: 12px
      .price
        margin-top: 4px
        line-height: 24px
        display: flex
        .mark
          font-size: 10px
          font-weight: normal
          color: red
          margin-top: 1px
          margin-right: 1px
        .nowPrice
          font-size: 14px
          font-weight: 700
          color: red
        .oldPrice
          margin-left: 8px
          font-size: 10px
          color: rgb(147, 153, 159)
          font-weight: 700
          text-decoration: line-through
      .add-cart
        font-size: 10px
        color: white
        line-height: 12px
        border-radius: 12px
        background: rgb(0, 160, 220)
        width: 90px
        padding: 6px 12px
        box-sizing: border-box
        text-align: center
        height: 24px
        position: absolute
        right: 18px
        bottom: 18px
  .info
    margin: 16px 0
    padding: 18px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    background: white
    .title
      font-size: 14px
      color: black
    .content
      margin-top: 6px
      margin-right: 8px
      font-size: 12px
      color: rgb(77, 85, 93)
      line-height: 24px
  .rating-wrapper
    background: white
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    .head
      padding: 18px 18px 0 18px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .title
        font-size: 14px
        color: rgb(7, 17, 27)
        padding-bottom: 18px
      .rateType
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
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
            background: rgb(0, 160, 220)
          &.thumb-up
            color: rgb(77, 85, 93)
            background: rgba(0, 160, 220, 0.2)
          &.thumb-down
            color: rgb(77, 85, 93)
            background: rgba(77, 85, 93, 0.2)
      .contentOnly
        padding: 12px 0
        display: flex
        color: rgb(147, 153, 159)
        .icon-check_circle
          font-size: 24px
          marign-right: 4px
        .selectedRatings
          font-size: 12px
          line-height: 24px
  .ratings
    background: white
    .rating-item
      padding: 16px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      .time-user
        font-size: 10px
        line-height: 12px
        color: rgb(147, 153, 159)
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
          color: rgb(147, 153, 159)
          line-height: 24px
          font-size: 12px
          &.icon-thumb_up
            color: rgb(0, 160, 220)
        .text
          color: rgb(7, 17, 27)
          line-height: 16px
          margin-left: 4px
</style>