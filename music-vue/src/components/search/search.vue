<template>
  <div class="search">
    <searchBox @query="queryChange" ref="box" />
    <div class="hotkeys">
      <div class="title">热门搜索</div>
      <div class="container">
        <span
          class="key"
          v-for="(item,index) in hotkeys"
          :key="index"
          @click.stop="searchHotKey(item.k)"
        >{{item.k}}</span>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query"  ref="suggest"/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getHotKey } from "api/search.js";
import { ERR_OK } from "api/config.js";
import searchBox from "base/search-box/search-box";
import suggest from "base/suggest/suggest";
const HOTKEYS_NUM = 9;
export default {
  data() {
    return {
      hotkeys: [],
      query: ""
    };
  },
  created() {
    this._initHotKey();
  },
  methods: {
    queryChange(query) {
      this.query = query;
    },
    searchHotKey(query){
      this.$refs.box.setQuery(query)
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
    suggest
  }
};
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl'
.search
  .hotkeys
    padding: 15px
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
  .search-result
    position: fixed
    top: 100px
    bottom: 0
    width: 100%
    overflow: hidden
</style>