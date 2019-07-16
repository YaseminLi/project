<template>
  <div class="search" ref="search">
    <searchBox @query="queryChange" ref="box" />
    <div class="search-wrapper" ref="wrapper">
      <scroll ref="scroll" class="scroll">
        <div>
          <div class="hotkeys">
            <div class="title">热门搜索</div>
            <div class="container">
              <span
                class="key"
                v-for="(item,index) in hotkeys"
                :key="index"
                @click.stop="search(item.k)"
              >{{item.k}}</span>
            </div>
          </div>
          <div class="serach-history" v-show="searchList.length>0">
            <searchList
              :searchList="searchList"
              @clear="clearSearchList"
              @remove="removeSearchItem"
              @addSearch="search"
            />
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="result">
      <suggest :query="query" ref="suggest" @saveSearch="saveSearch" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getHotKey } from "api/search.js";
import { ERR_OK } from "api/config.js";
import searchBox from "base/search-box/search-box";
import suggest from "base/suggest/suggest";
import searchList from "base/search-list/search-list";
import scroll from "base/scroll/scroll";
import { playlistMixin } from "common/js/mixin.js";
import { mapGetters } from "vuex";
import {
  saveToLocal,
  loadFromLocal,
  removeLocalAll,
  removeLocalItem
} from "common/js/storage.js";
const HOTKEYS_NUM = 9;
export default {
  mixins: [playlistMixin],
  data() {
    return {
      hotkeys: [],
      query: "",
      searchList: []
    };
  },
  computed: {
    ...mapGetters["playList"]
  },
  created() {
    this._initHotKey();
    this.searchList = loadFromLocal("_search_");
  },
  methods: {
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? `60px` : `0`;
      this.$refs.search.style.bottom = bottom;
      this.$refs.wrapper.style.bottom = bottom;
      this.$refs.result.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    queryChange(query) {
      this.query = query;
    },
    search(query) {
      this.$refs.box.setQuery(query);
    },
    saveSearch() {
      saveToLocal("_search_", this.query.trim());
      this.searchList = loadFromLocal("_search_");
    },
    clearSearchList() {
      removeLocalAll("_search_");
      this.searchList = loadFromLocal("_search_");
    },
    removeSearchItem(value) {
      removeLocalItem("_search_", value);
      this.searchList = loadFromLocal("_search_");
    },
    _initHotKey() {
      getHotKey().then(res => {
        if (res.code == ERR_OK)
          this.hotkeys = res.data.hotkey.slice(0, HOTKEYS_NUM);
      });
    }
  },
  watch: {
    query(newQuery) {
      this.query = newQuery;
    }
  },
  components: {
    searchBox,
    suggest,
    searchList,
    scroll
  }
};
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl'
.search
  position: fixed
  width: 100%
  top: 44px
  bottom: 0
  .search-wrapper
    position: fixed
    width: 100%
    top: 100px
    bottom: 0
    .scroll
      width: 100%
      height: 100%
      overflow: hidden
      .hotkeys
        padding: 20px
        .title
          font-size: 14px
          font-weight: 700
          line-height: 21px
          margin-bottom: 8px
          color: $color-theme
        .container
          display: flex
          flex-wrap: wrap
          .key
            margin: 0 14px 10px 0
            padding: 0 10px
            border: 1px solid $color-theme
            line-height: 30px
            font-size: 14px
            color: $color-theme
            border-radius: 16px
            &:first-child
              color: $color-text-dd
              border: 1px solid $color-text-dd
      .search-history
        width: 100%
  .search-result
    position: fixed
    top: 100px
    bottom: 0
    width: 100%
    overflow: hidden
    margin-top 10px
</style>