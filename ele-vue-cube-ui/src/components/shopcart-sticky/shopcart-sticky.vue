<template>
  <div class="shopcart-sticky" v-show="visible">
    <Shopcart
      :deliveryPrice="deliveryPrice"
      :minPrice="minPrice"
      :selectedFoods="selectedFoods"
      :fold="fold"
      :sticky="true"
      @add="add"
      @decrease="decrease"
      @clear="clear"
      ref="shopcart"
    />
  </div>
</template>

<script>
import Shopcart from "components/shopcart/shopcart";
import {popupMixin} from"common/js/mixin.js"
export default {
  name: "shopcart-sticky",
  mixins:[popupMixin],
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
    list: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    //不能在shopcart中监听list的drop事件，小球会被list覆盖住
    drop(el){
        this.$refs.shopcart.drop(el)
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
  components: {
    Shopcart
  }
};
</script>

<style lang='stylus' scoped>
.shopcart-sticky
  position: fixed
  bottom: 0
  left: 0
  z-index: 200
  width: 100%
  height: 50px
</style>
