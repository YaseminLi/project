<template>
  <scroll class="suggest" :data="suggest" :pullup="true" @scrollToEnd="searchMore">
    <div>
      <div v-for="(item,index) in suggest" :key="index" class="item" @click.stop="selectItem(item)">
        <i :class="iconClass(item.type)"></i>
        <span class="text">{{text(item)}}</span>
      </div>
      <div class="load" v-show="hasMore">
        <loading />
      </div>
      <div v-show="!hasMore && !suggest.length" class="no-result-wrapper">
        <noResult title=""/>
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
import loading from "base/loading/loading";
import noResult from "base/no-result/no-result"
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
      showSinger: true,
      hasMore: true
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
      this.$emit("saveSearch");

      if (item.type == TYPE_SINGER) {
        this.$router.push({
          path: `/search/${item.singermid}`
        });
        this.setSinger(item);

        this.$emit("clearInput");
      } else {
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
      this.hasMore = true;
      getSearchResult(query, this.page, this.showSinger, perpage).then(res => {
        if (res.code == ERR_OK) {
          this._checkMore(res.data);
          this._normalizeResult(res.data);
        }
      });
    },
    searchMore() {
      if (!this.hasMore) {
        return;
      }
      this.page += 1;
      this.search(this.query);
    },
    _checkMore(data) {
      if (
        !data.song.list.length ||
        (data.song.curpage - 1) * perpage + data.song.curnum >=
          data.song.totalnum
      ) {
        this.hasMore = false;
      }
    },
    _normalizeResult(data) {
      let arr = this.suggest;
      if (arr.length == 0) {
        if (data.zhida && data.zhida.singerid) {
          const singer = new Singer({
            id: data.zhida.singerid,
            mid: data.zhida.singermid,
            name: data.zhida.singername
          });
          singer.type = TYPE_SINGER;
          arr.push(singer);
        }
      }
      processSongsUrl(this._normalizeSongs(data.song.list)).then(songs => {
        arr = arr.concat(songs);
        this.suggest = arr;
      });
    },
    _normalizeSongs(list) {
      let arr = [];
      list.forEach(item => {
        if (item.songid && item.albumid) {
          arr.push(createSong(item));
        }
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
      this.suggest = [];
      this.search(newQuery);
    }
  },
  components: {
    scroll,
    loading,
    noResult
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
  .item
    width: 100%
    padding: 0 20px
    box-sizing: border-box
    line-height: 30px
    font-size: 14px
    no-wrap()
    .iconfont
      color: $color-theme
      margin-right: 10px
  .load
    text-align: center
</style>
