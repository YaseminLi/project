<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper" :class="{'haveSeleced':totalCount>0}">
            <div class="icon-shopping_cart"></div>
            <div class="totalCount" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price border-right-1px" :class="{'haveSeleced':totalCount>0}">¥ {{totalPrice}}</div>
          <div class="desc">另需配送费 ¥ {{deliveryPrice}}元</div>
        </div>
        <div class="content-right" :class="payClass" @click="pay">{{payDesc}}</div>
      </div>
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition @before-enter="beforeDrop" @enter="droping" @after-enter="afterDrop">
            <div v-show="ball.show" class="ball">
              <div class="inner"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const BALL_LEN = 10;
function createBalls() {
  let ret = [];
  for (let i = 0; i < BALL_LEN; i++) {
    ret.push({ show: false });
  }
  return ret;
}
export default {
  data() {
    return {
      balls: createBalls(),
      listFold: this.fold
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
    },
    fold: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: false
    }
  },
  created() {
    //不需要响应式，正在下落的小球
    this.dropBalls = [];
  },
  methods: {
    drop(el) {
      // //在视口中的位置信息
      // console.log(el.getBoundingClientRect());
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    //小球降落的动画钩子
    //动画开始的前一帧
    beforeDrop(el) {
      const ball = this.dropBalls[this.dropBalls.length - 1];
      const rect = ball.el.getBoundingClientRect();
      const x = rect.left - 22;
      const y = -(window.innerHeight - rect.top - 48);
      //可以不要display
      el.style.display = "";
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`;
      const inner = el.getElementsByClassName("inner")[0];
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
    },
    droping(el, done) {
      //重绘
      this._reflow = document.body.offsetHeight;
      el.style.transform = el.style.webkitTransform = `translate3D(0,0,0)`;
      const inner = el.getElementsByClassName("inner")[0];
      inner.style.transform = inner.style.webkitTransform = `translate3D(0,0,0)`;
      el.addEventListener("transitionend", done);
    },
    afterDrop(el) {
      const ball = this.dropBalls.shift();
      //是可以更改balls中小球属性的
      if (ball) {
        ball.show = false;
        //display要加，不加的话靠show来控制显示会延迟
        el.style.display = "none";
      }
    },
    toggleList() {
      if (this.listFold) {
        if (!this.totalCount) {
          return;
        }
        this.listFold = false;
        this._showShopcartList();
        this._showShopcartSticky();
      } else {
        this.listFold = true;
        this._hideShopcartList();
      }
    },
    _showShopcartList: function() {
      this.cartComp =
        this.cartComp ||
        this.$createShopcartList({
          $props: {
            selectedFoods: "selectedFoods"
          },
          $events: {
            clear: this.clear,
            decrease: this.decrease,
            add: this.add,
            hide: () => {
              this.listFold = true;
            },
            leave: this._hideShopCartSticky,
            ballDrop: el => {
              this.stickyComp.drop(el);
            }
          }
        });
      this.cartComp.show();
    },
    _hideShopcartList() {
      //$parent父组件
      const list = this.sticky ? this.$parent.list : this.cartComp;
      list.hide && list.hide();
    },
    _showShopcartSticky: function() {
      this.stickyComp =
        this.stickyComp ||
        this.$createShopcartSticky({
          $props: {
            selectedFoods: "selectedFoods",
            deliveryPrice: "deliveryPrice",
            minPrice: "minPrice",
            fold: "listFold",
            list: this.cartComp
          }
        });
      this.stickyComp.show();
    },
    _hideShopCartSticky() {
      this.stickyComp.hide();
    },
    pay: function(el) {
      if (this.minPrice > this.totalPrice) {
        return;
      }
      this.$createDialog({
        type:"alert",
        title:"支付",
        content:`需要支付${this.totalPrice}元`
      }).show()
      el.stopPropagation() 
    },
    clear: function() {
      this.$emit("clear");
    },
    decrease: function(food) {
      this.$emit("decrease", food);
    },
    add: function(food) {
      this.$emit("add", food);
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
      // if(totalCount==0){
      //   this.cartComp.hide()
      // }
      return totalCount;
    },
    payDesc() {
      let totalPrice = this.totalPrice;
      let minPrice = this.minPrice;
      let a;
      if (this.totalPrice === 0) {
        a = `¥ ${minPrice}起送`;
      } else if (totalPrice < minPrice) {
        a = `还差¥ ${minPrice - totalPrice}起送`;
      } else if (totalPrice >= minPrice) {
        a = `去结算`;
      }
      return a;
    },
    payClass() {
      if (this.totalPrice >= this.minPrice) {
        return "enough";
      } else {
        return "not-enough";
      }
    }
  },
  watch: {
    fold(newF) {
      this.listFold = newF;
    },
    totalCount(newC) {
      if (!this.listFold && !newC) {
        this._hideShopCartSticky();
        this._hideShopcartList();
      }
    }
  }
};
</script>
<style lang='stylus'>
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'
.shopcart
  z-index: 50
  position: absolute
  left: 0
  bottom: 0
  width: 100%
  height: 50px
  .content
    height: 50px
    display: flex
    width: 100%
    color: $color-grey-ssssss
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
        border: 6px solid #141d27
        background: $color-grey-ssss
        border-radius: 50%
        position: relative
        top: -8px
        &.haveSeleced
          background: $color-blue
          .icon-shopping_cart
            color: white
        .icon-shopping_cart
          font-size: 24px
          color: $color-grey-ssssss
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
        font-size: $fontsize-large
        font-weight: 700
        line-height: 24px
        border-right-1px($color-grey-ssssss)
        &.haveSeleced
          color: white
      .desc
        font-size: $fontsize-small-s
        line-height: 24px
        margin-top: 14px
    .content-right
      flex: 0 0 105px
      box-sizing: border-box
      height: 50px
      width: 105px
      padding: 14px 8px 12px 8px
      font-size: $fontsize-small
      line-height: 24px
      font-weight: 700
      text-align: center
      &.enough
        background: $color-green
        color: white
      &.not-enough
        background: $color-grey-ssss
  .ball-container
    .ball
      position: fixed
      bottom: 22px
      left: 32px
      z-index: 500
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: $color-blue
        transition: all 0.4s linear
</style>
