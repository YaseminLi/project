<template>
  <div class="stars" :class="starType">
    <span v-for="(item,index) in starArray" :key="index" :class="item==1?'on':'off'" class="star"></span>
  </div>
</template>

<script>
export default {
  props: {
    size:Number,
    score: Number
  },
  computed: {
    starType:function () {
          return 'star-'+this.size;
      },
    starArray: function() {
      const score = Math.floor(this.score);
      let array = [0, 0, 0, 0, 0];
      for (let i = 0; i < score; i++) {
        array[i] = 1;
      }
      return array;
    }
  }
};
</script>

<style lang="stylus" >
@import '../../common/stylus/mixin.styl'
.stars
  margin: 16px 0 28px 0
  height: 24px
  display: flex
  .star
    width: 24px
    height: 24px
    background: size 24px
    background-repeat: no-repeat
    &.on
      bg-img('star24_on')
    &.off
      bg-img('star24_off')
</style>