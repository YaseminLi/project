<template>
  <transition name="fade" appear>
    <cube-popup
      :maskClosable="true"
      ref="popup"
      position="bottom"
      @mask-click="maskClick"
      v-show="visible"
    >
      <transition name="move" appear @after-leave="onLeave">
        <div class="popup-content" v-show="visible">
          <div class="head">
            <span class="cart">购物车</span>
            <span class="clear" @click.stop="clear">清空</span>
          </div>
          <cube-scroll :data="selectedFoods" ref="foodsScroll" class="foods">
            <div>
              <div
                class="item border-bottom-1px"
                v-for="(item,index) in selectedFoods"
                :key="index"
              >
                <span class="name">{{item.name}}</span>
                <span class="extra">
                  <span class="price">¥ {{item.price*item.count}}</span>
                  <Cartcontrol :food="item" @decrease="decrease" @add="add(item)" @ballDrop="ballDrop" />
                </span>
              </div>
            </div>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
import Cartcontrol from "base/cartcontrol/cartcontrol";
import { popupMixin } from "common/js/mixin.js";
export default {
  name: "shopcart-list",
  mixins: [popupMixin],
  props: {
    selectedFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
      //$on监听事件
    this.$on("show", () => {
      this.$nextTick(() => {
        this.$refs.foodsScroll.refresh();
      });
    });
  },
  methods: {
    clear: function() {
      this.dialog =
        this.dialog ||
        this.$createDialog({
          type: "confirm",
          title: "是否要清空购物车？",
          confirmBtn: {
            text: "确定",
            active: true
          },
          cancleBtn: {
            text: "取消",
            active: false
          },
          onConfirm: () => {
            this.$emit("clear");
          }
        }).show();
    },
    decrease: function(food) {
      this.$emit("decrease", food);
    },
    add: function(food) {
      this.$emit("add", food);
    },
    ballDrop(target) {
      this.$emit("ballDrop", target);
    },
    maskClick() {
      this.hide();
      this.$emit("hide");
    },
    onLeave() {
      this.$emit("leave");
    }
  },
  components: {
    Cartcontrol
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.cube-popup
  bottom: 50px
  &.fade-enter, &.fade-leave-to
    opacity: 0
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.5s ease-in-out
  .move-enter, .move-leave-to
    transform: translate3d(0, 100%, 0)
  .move-enter-active, .move-leave-active
    transition: all 0.5s ease-in-out
  >>>.cube-popup-content
    width: 100%
    .head
      height: 40px
      background: $color-background-sssssss
      width: 100%
      display: flex
      justify-content: space-between
      border-bottom: 1px solid $color-row-line
      .cart
        font-size: $fontsize-medium
        line-height: 40px
        color: $$color-grey-sss
        margin-left: 18px
      .clear
        font-size: $fontsize-small
        line-height: 40px
        color: $color-grey-sss
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
        display: flex
        justify-content: space-between
        .name
          font-size: $fontsize-medium
          color: $color-grey-sss
          line-height: 24px
          font-weight: 500
        .extra
          display: flex
          .price
            margin: 0 12px 0 18px
            font-size: $fontsize-medium
            font-weight: 700
            color: $color-red
            line-height: 24px
.shopcart-container
  width: 100%
  position: absolute
  bottom: -50px
  left: 0
</style>
