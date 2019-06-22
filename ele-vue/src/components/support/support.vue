<template>
  <div class="support" :class="supportType">
    <span v-show='type>=0' class="icon" :class="classMap[type]"></span>
    <span class="text">{{text}}</span>
  </div>
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
      text:String,
      size:Number
  },
  computed:{
      supportType(){
          return 'support-'+this.size;
      }
  }
};
</script>

<style lang='stylus' >
@import '../../common/stylus/mixin.styl'
       .support
          display flex
          flex-direction row
          align-items center
          &.support-1
            .icon
                background-repeat: no-repeat
                &.decrease
                    bg-img('decrease_1')
                &.discount
                    bg-img('discount_1')
                &.guarantee
                    bg-img('guarantee_1')
                &.invoice
                    bg-img('invoice_1')
                &.special
                    bg-img('special_1')
          &.support-2
            .icon
                background-repeat: no-repeat
                &.decrease
                    bg-img('decrease_2')
                &.discount
                    bg-img('discount_2')
                &.guarantee
                    bg-img('guarantee_2')
                &.invoice
                    bg-img('invoice_2')
                &.special
                    bg-img('special_2')
          &.support-3
            .icon
                background-repeat: no-repeat
                &.decrease
                    bg-img('decrease_3')
                &.discount
                    bg-img('discount_3')
                &.guarantee
                    bg-img('guarantee_3')
                &.invoice
                    bg-img('invoice_3')
                &.special
                    bg-img('special_3')
          &.support-4
            .icon
                background-repeat: no-repeat
                &.decrease
                    bg-img('decrease_4')
                &.discount
                    bg-img('discount_4')
                &.guarantee
                    bg-img('guarantee_4')
                &.invoice
                    bg-img('invoice_4')
                &.special
                    bg-img('special_4')

//  <v-support class="border-1px"
//         v-for="(item,index) in seller.supports" :key="index"
//         :size='4'
//         :text='item.description'
//         :type='item.type'
//         />
//       </div>

// .supports
//       .support
//         padding: 16px 12px
//         border-1px($color-row-line)
//         &:last-child
//           border-none()
//         .icon
//           width: 16px
//           height: 16px
//           margin-right: 6px
//           background-size 16px 16px
//         .text
//           font-size: 12px
//           line-height: 16px
//           color $color-grey-ssss
</style>
