<template>
  <div class="search">
    <div class="search-bar">
      <div class="search-container">
        <i class="iconfont iconsousuo"/>
        <input type="text" placeholder="搜索歌曲、歌单、专辑" @click="search" v-model="inputValue"/>
        <span v-show='isSearching' class="cancel" @click="cancelSearch">取消</span>
        <i v-show="inputValue" class="iconfont iconquxiao" @click="clearInput"></i>
      </div>
    </div>
    <div class="hotkeys" v-show="!isSearching">
      <div class="title">热门搜索</div>
      <div class="container" >
        <span class="key" v-for="(item,index) in hotkeys" :key="index">{{item.k}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearch } from "api/search.js";
import { ERR_OK } from "api/config.js";
const HOTKEYS_NUM = 9;
export default {
  data() {
    return {
      hotkeys: [],
      isSearching:false,
      inputValue:''
    };
  },
  created() {
    this._initSearch();
  },
  methods: {
      search(){
          this.isSearching=true;
      },
      cancelSearch(){
          this.isSearching=false;
          this.inputValue='';
      },
      clearInput(){
        this.inputValue='';
      },
    _initSearch() {
      getSearch().then(res => {
        if (res.code == ERR_OK) console.log(res.data.hotkey);
        this.hotkeys = res.data.hotkey.slice(0, HOTKEYS_NUM);
      });
    }
  }
};
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl'
.search-bar
  padding 10px
  background: $color-background-dd
  .search-container
    border-radius: 10px
    position relative
    input 
        width 100%
        box-sizing border-box
        height 36px
        padding 8px 12px 8px 35px
        font-size 14px
        color $color-background-d 
        outline none
    .cancel
        background: $color-background-dd
        color $color-theme
        height 36px
        padding 0 10px
        font-size 14px
        position absolute
        bottom 0
        right 0
        line-height 36px
    .iconfont
        position absolute 
        color #b1b1b1
        font-size 20px
        bottom 7px
    .iconquxiao
        right 60px
    .iconsousuo
        left 10px
.hotkeys
    padding 15px
    .title
          font-size 14px
          font-weight 700
          line-height 21px
          margin-bottom 8px
          color $color-theme
    .container
        display flex
        flex-wrap wrap
        .key
            margin 0 14px 10px 0
            padding 0 10px
            border 1px solid $color-theme
            line-height 30px
            font-size 14px
            color $color-theme
            border-radius 16px
            &:first-child
                color $color-text-dd
                border 1px solid $color-text-dd
</style>