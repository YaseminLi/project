<template>
  <scroll class="suggest">
    <div>
      <div
        v-for="(item,index) in suggest"
        :key="index"
        class="item"
        @click.stop="selectItem(item,item.type)"
      >
        <i :class="iconClass(item.type)"></i>
        <span class="name">{{item.name}}</span>
      </div>
    </div>
  </scroll>
</template>

<script>
import scroll from "base/scroll/scroll";
import { mapMutations, mapActions } from "vuex";
export default {
  props: {
    suggest: Array
  },
  methods: {
    iconClass(type) {
      return type == "song" ? "iconfont iconsong" : "iconfont iconsinger";
    },
    selectItem(item, type) {
      if (type == "singer") {
        this.$router.push({
          path: `/search/${item.mid}`
        });
        this.setSinger(item);
        this.$emit("clearInput");
      }
      if (type == "song") {
        let array = [];
        array.push(item)
        this.selectPlay({
          list:array,
          index:0
        });
        this.$emit("clearInput");
      }
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    ...mapActions({
      selectPlay: "selectPlay"
    })
  },
  components: {
    scroll
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.suggest
  width: 100%
  height: 100%
  background: white
  box-sizing: border-box
  padding: 20px
  overflow: hidden
  .item
    line-height: 30px
    font-size: 14px
    .iconfont
      color: $color-theme
      margin-right: 10px
    .name
      no-wrap()
</style>
