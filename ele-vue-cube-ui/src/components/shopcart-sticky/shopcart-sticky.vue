<template>
  <div class="shopcart-sticky" v-show="visible">
    <Shopcart
      :deliveryPrice="deliveryPrice"
      :minPrice="minPrice"
      :selectedFoods="selectedFoods"
      :fold="fold"
      :sticky="true"
      ref="shopcart"
    />
  </div>
</template>

<script>
import Shopcart from "components/shopcart/shopcart";
export default {
  name: "shopcart-sticky",
  data() {
    return {
      visible: false
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
    list: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    //不能在shopcart中监听list的drop事件，小球会被list覆盖住
    drop(el){
        this.$refs.shopcart.drop(el)
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
