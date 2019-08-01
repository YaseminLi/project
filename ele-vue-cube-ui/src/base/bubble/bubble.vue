<template>
 <div class="bubble">
{{number}}
 </div>
</template>

<script>
 export default {
  props:{
      number:Number
  }
 };
</script>

<style lang='stylus' scoped>
@import "~common/stylus/variable"
 .bubble
     display inline-block
     padding 0 5px
     height 16px
     line-height 16px
     border-radius 50%
     color $color-white
     background linear-gradient(to right, $color-orange, $color-red)
     font-size $fontsize-small-s 
     font-weight 700
     text-align center
</style>
