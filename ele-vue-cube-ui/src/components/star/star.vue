<template>
  <div class="stars" :class="starType">
    <span v-for="(item,index) in starArray" :key="index" class="star" :class="item"></span>
  </div>
</template>

<script>
export default {
  props: {
    size: Number,
    score: Number
  },
  computed: {
    starType: function() {
      return "star-" + this.size;
    },
    starArray: function() {
      const score = Math.floor(this.score * 2) / 2;
      const CLS_ON = "on";
      const CLS_HALF = "half";
      const CLS_OFF = "off";
      let array = [];
      const hasDecimal = score % 1 !== 0;
      for (let i = 0; i < Math.floor(score); i++) {
        array[i] = CLS_ON;
      }
      if (hasDecimal) {
        array.push(CLS_HALF);
      }
      while (array.length < 5) {
        array.push(CLS_OFF);
      }
      return array;
    }
  }
};
</script>

<style lang="stylus" >
@import '../../common/stylus/mixin.styl'
.stars
    display: flex
    align-items: center
    justify-content: center
    .star
        background-repeat: no-repeat
    &.star-24
        .star
            width: 10px
            height: 10px
            margin-right: 3px
            background-size: 10px 10px
            &:last-child
                margin-right: 0
            &.on
                bg-img('star24_on')
            &.half
                bg-img('star24_half')
            &.off
                bg-img('star24_off')
    &.star-36
        .star
            width: 15px
            height: 15px
            margin-right: 6px
            background-size: 15px 15px
            &:last-child
                margin-right: 0
            &.on
                bg-img('star36_on')
            &.half
                bg-img('star36_half')
            &.off
                bg-img('star36_off')
    &.star-48
        .star
            width: 20px
            height: 20px
            margin-right: 22px
            background-size: 20px 20px
            &:last-child
                margin-right: 0
            &.on
                bg-img('star48_on')
            &.half
                bg-img('star48_half')
            &.off
                bg-img('star48_off')
</style>