<template>
<div>
  <div class="shopcart">
    <transition name="fold">
      <div class="selectedFoods" v-show="isShowCart">
        <div class="head">
          <span class="cart">购物车</span>
          <span class="clear" @click="clear">清空</span>
        </div>
        <div class="foods" ref="foodsScroll">
          <div class="wrapper">
            <div class="item border-1px " v-for="(item,index) in selectedFoods" :key="index">
              <span class="name">{{item.name}}</span>
              <span class="extra">
                <span class="price">¥ {{item.price*item.count}}</span>
                <v-cartcontrol :food="item" @decrease="decrease" @add="add"/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="content" @click="showCart">
      <div class="content-left">
        <div class="logo-wrapper" :class="{'haveSeleced':totalCount>0}">
          <div class="icon-shopping_cart"></div>
          <div class="totalCount" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price border-right-1px" :class="{'haveSeleced':totalCount>0}">¥ {{totalPrice}}</div>
        <div class="desc">另需配送费 ¥ {{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="payClass" @click.stop='pay'>{{payDesc}}</div>
    </div>
  </div>
     <div class="filter" v-show="isShowCart" @click="showCart"></div>
     </div>
</template>

<script>
import cartcontrol from "components/cartcontrol/cartcontrol.vue";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      fold: true
    };
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectedFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    "v-cartcontrol": cartcontrol
  },
  methods: {
    // drop(el) {
    //   //   console.log(el);
    //   //   //在视口中的位置信息
    //   //   console.log(el.getBoundingClientRect());
    // },
    clear: function() {
      this.$emit("clear");
    },
    decrease: function(food) {
      this.$emit("decrease", food);
    },
    add: function(food) {
      this.$emit("add", food);
    },
    showCart: function() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    pay:function () {
        if(this.minPrice>this.totalPrice){
            return;
        }
        window.alert(`需要支付${this.totalPrice}元`);
    }
  },
  computed: {
    totalPrice() {
      let totalPrice = 0;
      this.selectedFoods.forEach(food => {
        totalPrice += food.price * food.count;
      });
      return totalPrice;
    },
    totalCount() {
      let totalCount = 0;
      this.selectedFoods.forEach(food => {
        totalCount += food.count;
      });
      return totalCount;
    },
    // eslint-disable-next-line
    payDesc() {
      let totalPrice = this.totalPrice;
      let minPrice = this.minPrice;
      if (this.totalPrice === 0) {
        return `¥ ${minPrice}起送`;
      } else if (totalPrice < minPrice) {
        return `还差¥ ${minPrice - totalPrice}起送`;
      } else if (totalPrice >= minPrice) {
        return `去结算`;
      }
    },
    payClass() {
      if (this.totalPrice >= this.minPrice) {
        return "enough";
      } else {
        return "not-enough";
      }
    },
    isShowCart() {
      if (!this.totalCount) {
        // eslint-disable-next-line
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
            if(!this.scroll){
              // eslint-disable-next-line
          this.scroll = new BScroll(this.$refs.foodsScroll, { click: true });
        }else{
            this.scroll.refresh();
        }});
      }
      return show;
    }
  }
};
</script>
<style lang='stylus'>
@import '../../common/stylus/mixin.styl';
  @import '../../common/stylus/variable.styl';
.shopcart
  z-index: 50
  position: fixed
  left: 0
  bottom: 0
  width: 100%
  height 50px
  .content
    height: 50px
    display: flex
    width: 100%
    color: $color-grey-sss
    background: #141d27
    .content-left
      display: flex
      flex-direction: row
      margin-right: 12px
      flex: 1
      .logo-wrapper
        width: 44px
        height: 44px
        margin: 0 12px
        border: 6px solid  #141d27
        background:$color-grey-ss
        border-radius:50%
        position: relative
        top: -8px
        &.haveSeleced
          background: $color-blue
          .icon-shopping_cart
            color: white
        .icon-shopping_cart
          font-size: 24px
          color: $color-grey-sss
          width: 24px
          height: 24px
          margin: 10px
        .totalCount
          font-size: 9px
          color: white
          background: $color-red
          height: 16px
          width: 24px
          text-align: center
          border-radius: 16px
          line-height: 16px
          position: absolute
          top: -6px
          right: -6px
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        margin: 14px 12px 12px 0
        padding-right: 12px
        font-size: 16px
        font-weight: 700
        line-height: 24px
        border-right-1px($color-grey-sss)
        &.haveSeleced
          color: white
      .desc
        font-size: 10px
        line-height: 24px
        margin-top: 14px
    .content-right
      flex: 0 0 105px
      box-sizing: border-box
      height: 50px
      width: 105px
      padding: 14px 8px 12px 8px
      font-size: 12px
      line-height: 24px
      font-weight: 700
      text-align: center
      &.enough
        background: $color-green
        color: white
      &.not-enough
        background: $color-grey-sssss
  .selectedFoods
    position: absolute
    bottom: 50px
    left: 0
    width: 100%
    &.fold-enter, .fold-leave-active
      // transform: translate3d(0, -100%, 0)
      transform: translate3d(0, 0, 0)
    &.fold-enter-active, .fold-leave-active
      
      transition: all 5s
    .head
      height: 40px
      background: $color-background-ssss
      width: 100%
      display: flex
      justify-content: space-between
      border-bottom: 1px solid $color-row-line
      .cart
        font-size: 14px
        line-height: 40px
        color: $color-grey-ssss
        margin-left: 18px
      .clear
        font-size: 12px
        line-height: 40px
        color: $color-grey-ssss
        margin-right: 18px
    .foods
      background: white
      width: 100%
      max-height: 215px
      overflow: hidden
      .item
        height: 24px
        margin: 0 18px
        padding: 12px 0
        border-1px($color-row-line)
        display: flex
        justify-content: space-between
        .name
          font-size: 14px
          color: $color-grey-ssss
          line-height: 24px
          font-weight: 500
        .extra
          display: flex
          .price
            margin: 0 12px 0 18px
            font-size: 14px
            font-weight: 700
            color: $color-red
            line-height: 24px
.filter
  z-index: 40
  position: fixed
  left: 0
  bottom: 0
  width: 100%
  height 100%
  background: $color-background-sssss
</style>
