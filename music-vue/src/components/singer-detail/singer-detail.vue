<template>
  <transition appear name="slide">
    <div class="singer-detail">jhuhvuifb valbalk</div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["singer"])
  },
  created() {
    console.log(this.singer);
  },
  components: {}
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
.singer-detail
  background: white
  position: absolute
  top: 0
  width: 100%
  height: 100%
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.slide-enter-active, .slide-leave-active
  transition: all 0.8s
</style>
