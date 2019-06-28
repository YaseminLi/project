<template>
<div class="recommend">
    <scroll class="recommend-content" :data='discList' ref="scroll">
        <div>
          <slider v-if="slider.length>0" :slider="slider" @loadImg='loadImg'/>
          <div class="discList-wrapper">
            <h1 class="title">推荐歌单</h1>
            <div class="discList">
              <div class="item" v-for="(item,index) in discList" :key="index">
                <img v-lazy="item.imgurl">
                <p class="dissname">{{item.dissname}}</p>
                <div class="listennum">{{item.listennum}}</div>
              </div>
            </div>
          </div>
        </div>
    </scroll>
    <div class="loading-container" v-show="!discList.length">
      <loading />
    </div>
    
    </div>
</template>

<script>
import { getRecommend, getDiscList } from "api/recommend.js";
import { ERR_OK } from "api/config.js";
import slider from "base/slider/slider.vue";
import scroll from "base/scroll/scroll.vue";
import loading from "base/loading/loading.vue";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      slider: [],
      discList: []
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data);
          this.slider = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data);
          this.discList = res.data.list;
        }
      });
    },
    //轮播图的图片加载出来后刷新scroll，不然scroll的高度会少了轮播图的一块
    loadImg(){
      if(!this.checkloaded){
        this.checkloaded=true;
        setTimeout(()=>{
           this.$refs.scroll.refresh();
        },20)
      }
    }
  },
  components: {
    slider,
    scroll,
    loading
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
 .recommend-content
    position: fixed
    top: 44px
    bottom: 0
    width: 100%
    overflow hidden
    .discList-wrapper
      margin: 0 15px
      .title
        margin: 25px 0 20px 5px
        font-size: 16px
        color: $color-theme
      .discList
        display: flex
        flex-wrap: wrap
        .item
          width: 105px
          margin: 0 5px 10px 5px
          position: relative
          img
            height: 105px
            width: 105px
            border-radius: 5px
          .dissname
            padding: 6px 0
            font-size: 10px
            line-height: 14px
            color: $color-theme
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 2
          .listennum
            position: absolute
            top: 6px
            right: 6px
            color: white
            font-size: 10px
 .loading-container
   width 100%
   position absolute
   top: 50%
</style>

