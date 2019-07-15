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
        <span class="text">{{text(item)}}</span>
      </div>
    </div>
  </scroll>
</template>

<script>
import scroll from "base/scroll/scroll";
import { mapMutations, mapActions } from "vuex";
import { getSearchResult } from "api/search.js";
import { ERR_OK } from "api/config.js";
import { createSong, processSongsUrl } from "common/js/song.js";
const TYPE_SINGER = "singer";
const perpage = 20;
export default {
  props: {
    query: String
  },
  data() {
    return {
      suggest: [],
      page: 1,
      showSinger: true
    };
  },
  methods: {
    text(item) {
      if (item.type == TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.songname}-${item.singer}`;
      }
    },
    iconClass(type) {
      return type == TYPE_SINGER ? "iconfont iconsinger" : "iconfont iconsong";
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
        array.push(item);
        this.selectPlay({
          list: array,
          index: 0
        });
        this.$emit("clearInput");
      }
    },
    search(query) {
      getSearchResult(query, this.page, this.showSinger, perpage).then(res => {
        if (res.code == ERR_OK) {
          console.log(res);
          this._normalizeResult(res.data);
        }
      });
    },
    _normalizeResult(data) {
      let arr = [];
      if (data.zhida && data.zhida.singerid) {
        arr.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
      }
      processSongsUrl(this._normalizeSongs(data.song.list)).then(songs => {
        console.log(songs);

        arr = arr.concat(songs);
        console.log(arr);
        this.suggest = arr;
      });
    },
    _normalizeSongs(list) {
      let arr = [];
      list.forEach(item => {
        arr.push(createSong(item));
      });
      return arr;
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    ...mapActions({
      selectPlay: "selectPlay"
    })
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        return;
      }
      this.search(newQuery);
    }
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
  overflow: hidden
  .item
    width 100%
    padding 0 20px
    box-sizing: border-box
    line-height: 30px
    font-size: 14px
    no-wrap()
    .iconfont
      color: $color-theme
      margin-right: 10px
</style>
