<template>
  <transition appear name="slide">
    <musicList />
  </transition>
</template>

<script>
import { getSingerDetail } from "api/singer.js";
import { ERR_OK } from "api/config.js";
import { mapGetters } from "vuex";
import musicList from 'components/music-list/music-list'
export default {
  data() {
    return {};
  },
  created() {
    this._getSingerDetail();
  },
  computed: {
    ...mapGetters(["singer"])
  },
  methods: {
    _getSingerDetail() {
      getSingerDetail(this.singer.id).then(res => {
        if (res.code == ERR_OK) {
          console.log(res.singer.data);
        }
      });
    }
  },
  components: {
      musicList
  }
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
