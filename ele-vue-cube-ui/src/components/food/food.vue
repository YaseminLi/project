<template>
  <transition name="move" appear @after-leave="afterLeave">
    <div class="food" v-if="visible">
      <cube-scroll ref="scroll">
        <div>
          <div class="description">
            <div class="image-head">
              <img class="image" :src="food.image" />
              <i class="icon-arrow_lift" @click="hide"></i>
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
                <div
                  class="add-cart"
                  v-show="!food.count||food.count===0"
                  @click.stop="addFirst"
                >加入购物车</div>
                <Cartcontrol
                  v-show="food.count"
                  :food="food"
                  @decrease="decrease"
                  @add="add"
                  @ballDrop="ballDrop"
                />
              </div>
            </div>
          </div>
          <Split />
          <div class="info" v-show="food.info">
            <div class="title">商品介绍</div>
            <div class="content">{{food.info}}</div>
          </div>
          <Split v-show="food.info" />
          <div class="ratings">
            <div class="title">商品评价</div>
            <RatingSelect
              :ratings="ratings"
              :desc="desc"
              @toggleContent="toggleContent"
              @selectType="select"
              :selectType="selectType"
              :contentOnly="contentOnly"
            /> 
            <div class="ratings-list" v-show="ratings && ratings.length">
              <div
                v-for="(rating,index) in computedRatings"
                :key="index"
                class="rating-item border-bottom-1px"
              >
                <div class="time-user">
                  <span class="time">{{rateTime(rating.rateTime)}}</span>
                  <div class="user">
                    <span class="username">{{rating.username}}</span>
                    <img class="avatar" :src="rating.avatar" />
                  </div>
                </div>
                <div class="content">
                  <i class="type" :class="ratingTypeMap[rating.rateType]"></i>
                  <span class="text">{{rating.text}}</span>
                </div>
              </div>
            </div>
            <div class="no-rating" v-show="!computedRatings.length">暂无评价</div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import Cartcontrol from "base/cartcontrol/cartcontrol";
import { popupMixin ,ratingsMixin} from "common/js/mixin.js";

export default {
  name: "food",
  mixins: [popupMixin,ratingsMixin],
  props: {
    food: Object
  },
  data() {
    return {
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      },
      ratings:this.food.ratings
    };
  },
  created() {
    this.$on("show", () => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    });
  },
  methods: {
    add: function() {
      this.$emit("add", this.food);
    },
    decrease: function() {
      this.$emit("decrease", this.food);
    },
    ballDrop(el) {
      this.$emit("ballDrop", el);
    },
    addFirst(event) {
      this.$emit("add", this.food);
      this.$emit("ballDrop", event.target);
    },
    afterLeave() {
      this.$emit("foodLeave");
    }
  },
  components: {
    Cartcontrol
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'
.food
  position: fixed
  bottom: 50px
  width: 100%
  left: 0
  top: 0
  z-index: 30
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.8s linear
  .description
    background: white
    margin: 0
    .image-head
      width: 100%
      height: 0
      padding-bottom: 80%
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
        position: fixed
        top: 0px
        left: 0px
    .food-description
      padding: 18px
      background: white
      position: relative
      .name
        $fontsize-medium
        font-weight: 700
        color: $color-grey-ssss
      .detail
        margin-top: 8px
        font-size: $fontsize-small-s
        color: $color-grey
        .rating
          margin-left: 12px
      .price
        margin-top: 18px
        line-height: 24px
        display: flex
        .mark
          font-size: $fontsize-small-s
          font-weight: normal
          color: $color-red
          margin-top: 1px
          margin-right: 1px
        .now
          $fontsize-medium
          font-weight: 700
          color: $color-red
        .old
          margin-left: 8px
          font-size: $fontsize-small-s
          color: $color-grey
          font-weight: 700
          text-decoration: line-through
      .cartcontrol-wrapper
        position: absolute
        right: 18px
        bottom: 18px
        .add-cart
          margin-bottom: 6px
          font-size: $fontsize-small-s
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
      $fontsize-medium
      color: $color-grey-ssss
    .content
      margin-top: 6px
      padding: 0 8px
      margin-right: 8px
      font-size: $fontsize-small
      color: $color-grey-s
      line-height: 24px
  .ratings
    background: white
    padding-top: 18px
    .title
      $fontsize-medium
      color: $color-grey-ssss
      padding: 0 18px
    .ratings-list
      background: white
      .rating-item
        padding: 16px 0
        margin: 0 18px
        .time-user
          font-size: $fontsize-small-s
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
          font-size: $fontsize-small
          align-items: center
          .type
            color: $color-grey
            line-height: 24px
            font-size: $fontsize-small
            &.icon-thumb_up
              color: $color-blue
          .text
            color: $color-grey-ssss
            line-height: 16px
            margin-left: 4px
    .no-rating
      padding: 16px
      font-size: $fontsize-small
      color: $color-grey
</style>