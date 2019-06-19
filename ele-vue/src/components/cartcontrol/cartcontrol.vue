<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="decrease" v-show="food.count>0" @click="decreaseCart">
        <i class="icon-remove_circle_outline cart-icon"  ></i>
      </div>
    </transition>
    <span class="count" v-show="food.count>0">{{food.count}}</span>
    <div class="add" @click="addCart">
      <i class="icon-add_circle cart-icon" ></i>
    </div>
    <div class="ball-container">
      <transition name="drop" v-for="(ball,index) in balls" :key="index" v-show="ball.show" class="ball">
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
  data(){
    return{
      balls:[{
        show:false
      },{
        show:false
      },{
        show:false
      },{
        show:false
      },{
        show:false
      }]
    };
  },
  methods: {
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count -= 1;
      }
      this.$emit('decrease',event.target);
    },
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        this.food.count=1;
      } else {
        this.food.count += 1;
      }
      this.$emit('add',event.target);
    }
  }
};
</script>

<style lang='stylus' >
.cartcontrol
  display: flex
  flex-direction: row
  align-items: center
  .move-enter, .move-leave-to
        transform: translateX(36px) rotate(180deg)
        opacity: 0
  .move-enter-active,.move-leave-.move-enter-active
        transition: all .8s linear
  .count
    width: 12px
    font-size: 10px
    line-height: 24px
    color: rgb(143, 157, 159)
    text-align: center
  .cart-icon
    display inline-block
    width: 24px
    height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
    margin: 0
    padding: 6px
  .ball-container
    .ball
      position fixed
      bottom 22px
      left 32px
      z-index 200
      .inner
        width 16px
        height 16px
        border-radius 50%
        background rgb(0,160,220)
</style>
