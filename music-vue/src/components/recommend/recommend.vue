<template>
  <div class="recommend">
    <div class="recommend-content">
          <slider v-if="slider.length>0" :slider='slider'/>
    </div>
  </div>
</template>

<script>
import { getRecommend } from "api/recommend.js";
import { ERR_OK } from "api/config.js";
import slider from "base/slider/slider.vue";
export default {
  data() {
    return {
      slider: []
    };
  },
  created() {
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
            console.log(res.data);
          this.slider = res.data.slider;
        }
      });
    }
  },
  components: {
    slider
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.recommend
    position fixed
    top 44px
    bottom 0
    width: 100%
    .recommend-content
        height 100%
        overflow hidden
       
</style>