<template>
  <scroll class="suggest">
    <div>
      <div
        v-for="(item,index) in suggest"
        :key="index"
        class="item"
        @click.stop="selectItem(item)"
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
import Singer from "common/js/singer.js";
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
        return item.name;
      } else {
        return `${item.songname}-${item.singer}`;
      }
    },
    iconClass(type) {
      return type == TYPE_SINGER ? "iconfont iconsinger" : "iconfont iconsong";
    },
    selectItem(item) {
      if (item.type == TYPE_SINGER) {
        this.$router.push({
          path: `/search/${item.singermid}`
        });
        this.setSinger(item);
        this.$emit("clearInput");
      }else {
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
          this._normalizeResult(res.data);
        }
      });
    },
    _normalizeResult(data) {
      let arr = [];
      if (data.zhida && data.zhida.singerid) {
        const singer=new Singer({
          id:data.zhida.singerid,
          mid:data.zhida.singermid,
          name:data.zhida.singername,
        })
        singer.type=TYPE_SINGER;
        arr.push(singer)
      }
      processSongsUrl(this._normalizeSongs(data.song.list)).then(songs => {
        arr = arr.concat(songs);
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
