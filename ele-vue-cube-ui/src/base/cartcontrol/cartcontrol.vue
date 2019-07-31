<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="decrease" v-show="food.count>0" @click.stop="decreaseCart">
        <i class="icon-remove_circle_outline cart-icon"></i>
      </div>
    </transition>
    <span class="count" v-show="food.count>0">{{food.count}}</span>
    <div class="add" @click.stop="addCart">
      <i class="icon-add_circle cart-icon"></i>
    </div>
    <div class="ball-container">
      <transition 
        name="drop"
        v-for="(ball,index) in balls"
        :key="index"
        v-show="ball.show"
        class="ball"
      >
        <div class="inner"></div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    food: {
      type: Object,
      default() {
        return { count: 0 };
      }
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ]
    };
  },
  methods: {
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      this.$emit("decrease", this.food);
    },
    addCart(event) {
      //阻止浏览器派发的点击事件
      if (!event._constructed) {
        return;
      }
      this.$emit("add", this.food);
      this.$emit('ballDrop',event.target);
    }
  }
};
</script>

<style lang='stylus' >
@import '../../common/stylus/variable.styl';
.cartcontrol
  display: flex
  flex-direction: row
  align-items: center
  .move-enter, .move-leave-to
    transform: translateX(36px) rotate(180deg)
    opacity: 0
  .move-enter-active, .move-leave-.move-enter-active
    transition: all 0.8s linear
  .count
    width: 12px
    font-size: $fontsize-small-s
    line-height: 24px
    color: $color-grey
    text-align: center
  .cart-icon
    display: inline-block
    width: 24px
    height: 24px
    font-size: $fontsize-large-xxx
    color: $color-blue
    margin: 0
    padding: 6px
  .ball-container
    .ball
      position: fixed
      bottom: 22px
      left: 32px
      z-index: 200
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: $color-blue
</style>
