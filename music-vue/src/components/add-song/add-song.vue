<template>
  <div class="add-song" v-show="showing">
    <div class="header">
      添加歌曲到列表
      <i class="iconfont iconremove" @click.stop="close"></i>
    </div>
    <div class="search-box-wrapper">
      <searchBox :placeholder="searchBoxTitle" @query="queryChange" ref="box" />
    </div>
    <div class="shortcut">
      <switches @switchItem="switchItem" :switches="switches" :currentIndex="switchesCurrentIndex" />
    </div>
      <scroll :data="playHistory" ref="playList" class="play contentList" v-show="switchesCurrentIndex==0">
        <div>
          <songList :songs="playHistory" @selectItem="selectSong"/>
        </div>
      </scroll>
      <scroll  :data="searchHistory" ref="searchList" class="history contentList" v-show="switchesCurrentIndex==1">
        <div>
          <searchList
            :searchList="searchHistory"
            :title="false"
            @remove="removeSearchHistory"
            @addSearch="search"
          />
        </div>
      </scroll>
    <div class="search-result" v-show="query">
      <suggest :query="query" :showSinger="false" @saveSearch="saveSearch" />
    </div>
  </div>
</template>

<script>
import searchBox from "base/search-box/search-box";
import scroll from "base/scroll/scroll";
import searchList from "base/search-list/search-list";
import songList from "base/song-list/song-list";
import suggest from "base/suggest/suggest";
import { searchMixin } from "common/js/mixin.js";
import {mapGetters, mapActions} from "vuex"
import {Song} from "common/js/song.js"
import switches from "base/switches/switches.vue"
export default {
  mixins: [searchMixin],
  data() {
    return {
      showing: false,
      showPlay: true,
      searchBoxTitle: "搜索歌曲",
      switches:["最近播放","历史搜索"],
      switchesCurrentIndex:0
    };
  },
  computed:{
...mapGetters(["playHistory"])
  },
  methods: {
    show() {
      this.showing = true;
    },
    close() {
      this.showing = false;
    },
    showPlayList() {
      this.showPlay = true;
    },
    showSearchList() {
      this.showPlay = false;
    }, 
    selectSong(song,index){
      if(index!==0){
        this.insertSong(new Song(song))
      }
    },
    switchItem(index){
      this.switchesCurrentIndex=index;
    },
    ...mapActions({
      insertSong:"insertSong"
    })
  },
  components: {
    searchBox,
    scroll,
    searchList,
    songList,
    suggest,
    switches
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.add-song
  width: 100%
  position: fixed
  top: 0
  bottom: 0
  overflow: hidden
  background: white
  z-index: 200
  display: flex
  flex-direction: column
  .header
    text-align: center
    font-size: 18px
    line-height: 44px
    color: $color-theme
    .iconfont
      color: $color-theme-d
      position: absolute
      right: 20px
      font-size: 16px
  .contentList
    width: 100%
    position: fixed
    top: 152px
    bottom: 0
    overflow: hidden
  .search-result
    position: fixed
    width: 100%
    top: 100px
    bottom: 0
    overflow: hidden
</style>
