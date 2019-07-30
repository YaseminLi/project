<template>
    <span v-show='type>=0' class="icon" :class="supportType"></span>
</template>

<script>
export default {
  data() {
    return {
        classMap: ["decrease", "discount", "special", "invoice", "guarantee"]
    };
  },
  props:{
      type:Number,
      size:Number
  },
  computed:{
      supportType(){
          return `support-${this.size} ${this.classMap[this.type]}`
      }
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/mixin.styl'
          .icon
                background-repeat: no-repeat
          .support-1
                &.decrease
                    bg-image('decrease_1')
                &.discount
                    bg-image('discount_1')
                &.guarantee
                    bg-image('guarantee_1')
                &.invoice
                    bg-image('invoice_1')
                &.special
                    bg-image('special_1')
          .support-2
                &.decrease
                    bg-image('decrease_2')
                &.discount
                    bg-image('discount_2')
                &.guarantee
                    bg-image('guarantee_2')
                &.invoice
                    bg-image('invoice_2')
                &.special
                    bg-image('special_2')
          .support-3
                &.decrease
                    bg-image('decrease_3')
                &.discount
                    bg-image('discount_3')
                &.guarantee
                    bg-image('guarantee_3')
                &.invoice
                    bg-image('invoice_3')
                &.special
                    bg-image('special_3')
          .support-4
                &.decrease
                    bg-image('decrease_4')
                &.discount
                    bg-image('discount_4')
                &.guarantee
                    bg-image('guarantee_4')
                &.invoice
                    bg-image('invoice_4')
                &.special
                    bg-image('special_4')

</style>
