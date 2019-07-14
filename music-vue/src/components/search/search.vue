<template>
  <div class="search">
    <searchBox @beginSearch="beginSearch" @clearInput="clearInput" @input="search" ref="serach-box"/>
    <div class="hotkeys" v-show="!isSearching">
      <div class="title">热门搜索</div>
      <div class="container">
        <span class="key" v-for="(item,index) in hotkeys" :key="index">{{item.k}}</span>
      </div>
    </div>
    <div class="search-result" v-show="suggest.length>0">
      <suggest :suggest="suggest" @clearInput="clearInput"/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getHotKey, getSearchResult } from "api/search.js";
import { ERR_OK } from "api/config.js";
import searchBox from "base/search-box/search-box";
import suggest from "base/suggest/suggest";
const HOTKEYS_NUM = 9;
export default {
  data() {
    return {
      hotkeys: [],
      isSearching: false,
      inputValue: "",
      suggest: []
    };
  },
  created() {
    this._initHotKey();
  },
  methods: {
    beginSearch() {
      this.isSearching = true;
    },
    clearInput() {
      this.isSearching = false;
      this.inputValue = "";
      this.suggest=[]
    },
    search(value) {
      getSearchResult(value).then(res => {
        if (res.code == ERR_OK) {
          console.log(res.code);
          
          this._normalizeResult(res.data);
        }
      });
    },
    _initHotKey() {
      getHotKey().then(res => {
        if (res.code == ERR_OK)
          this.hotkeys = res.data.hotkey.slice(0, HOTKEYS_NUM);
      });
    },
    _normalizeResult(result) {
      let arr = [];
      if (result.singer) {
        result.singer.itemlist.forEach(item => {
          arr.push({
            name: item.name,
            mid: item.mid,
            id: item.id,
            type:"singer"
          });
        });
      }
      if (result.song) {
        result.song.itemlist.forEach(item => {
          arr.push({
            name: item.name,
            mid: item.mid,
            id: item.id,
            type:"song"
          });
        });
      }
      this.suggest=arr;
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