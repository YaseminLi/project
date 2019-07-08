<template>
  <transition appear name="slide">
    <div class="singer-detail" >
      <i @click="back" class="iconfont iconreturn" />
      <div  class="head" ref="singerHead" :style={zIndex:0}>      
        <img class="avatar" :src="singerInfo.avatar" />
        <div class="name">{{singerInfo.name}}</div>
        <div class="fans">粉丝 {{normalizeNum(singerInfo.fans)}}</div>
        <div class="desc">{{singerInfo.desc}}</div>
        <div class="play" v-show="songs.length>0">
          <i class="iconfont iconbofang" />
          <span>随机播放全部</span>
        </div>
        <div class="play" v-show="songs.length==0">
          <span>无法获取到歌曲！</span>
        </div>
      </div>
      <loading v-show="songs.length==0"/>
      <scroll
        class="list"
        :data="songs"
        :probeTybe="probeType"
        :listenScroll="listenScroll"
        @scroll="scroll"
        v-show="songs.length>0"
      >
        <div class="list-content">
          <div class="total">
            歌曲共
            <span class="num">{{singerInfo.total_song}}首</span>
          </div>
          <songList :songs="songs" @selectItem='selectItem'/>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import { getSingerDetail } from "api/singer.js";
import {normalizeNum} from 'common/js/filter.js'
import { ERR_OK } from "api/config.js";
import { mapGetters,mapActions} from "vuex";
import songList from "base/song-list/song-list";
import scroll from "base/scroll/scroll";
import { createSong, processSongsUrl } from "common/js/song.js";
import loading from 'base/loading/loading'
export default {
  data() {
    return {
      singerInfo: {},
      songs: [],
      probeType: 3,
      listenScroll: true,
      scrollY: 0
    };
  },
  created() {
    this._getSingerDetail();
  },
  computed: {
    ...mapGetters(["singer"]),
    // show(){
    //     return this.singerInfo.fans&&this.singerInfo.desc
    // }
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push("/singer");
      }
      getSingerDetail(this.singer).then(res => {
        if (res.code == ERR_OK) {
          console.log(res.data);
          processSongsUrl(this._normalizeSingerDetail(res.data)).then(songs => {
            this.songs = songs;
          });
        }
      });
    },
    _normalizeSingerDetail(data) {
      let musicList = [];
      let list = data.list;
      for (let i = 0; i < list.length; i++) {
        musicList.push(createSong(list[i]));
      }
      let singerInfo = Object.assign({}, this.singer, {
        fans: data.fans,
        desc: data.SingerDesc,
        total_song: data.total
      });
      this.singerInfo = singerInfo;
      return musicList;
    },
    back() {
      this.$router.push("/singer");
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    normalizeNum(num){
      return normalizeNum(num)
    },
    selectItem(item,index){
      this.selectPlay({
          list: this.songs,
          index
        })
    },
   ...mapActions([
        'selectPlay'
      ])
  },
  watch: {
    scrollY(newY) {
      let zIndex=0;
      if (newY < -304) {
        console.log('zindex');
        
        this.$refs.singerHead.style.zIndex=10;
         this.$refs.singerHead.style.height=`35px`;
      }else{this.$refs.singerHead.style.zIndex=zIndex;
      this.$refs.singerHead.style.height=`339px`;}
    }
  },
  components: {
    songList,
    scroll,
    loading
  }
};
</script>

<style lang='stylus'>
@import '~common/stylus/variable'
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.slide-enter-active, .slide-leave-active
  transition: all 0.8s
.singer-detail
  background: white
  position: absolute
  top: 0
  width: 100%
  bottom: 0
  .iconreturn
      color: $color-theme-d
      position: fixed
      left: 10px
      top:10px
      font-size: 30px
      font-weight: 700
      z-index 20
  .head
    position relative
    padding: 12px 30px 0px 30px
    display: flex
    flex-direction: column
    align-items: center
    background white
    overflow hidden
    .avatar
      width: 190px
      height: 190px
      border-radius: 50%
      margin-bottom: 25px
      box-shadow: 0 7px 13px rgba(0, 0, 0, 0.21)
    .name
      font-size: 18px
      color: $color-text
      margin-bottom: 12px
    .fans
      font-size: 16px
      color: $color-text
      margin-bottom: 12px
    .desc
      width: 100%
      font-size: 14px
      color: $color-text-l
      margin-bottom: 12px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
    .play
      width: 190px
      height: 40px
      border-radius: 20px
      color: white
      background: $color-theme-d
      // box-shadow: 0 6px 32px rgba(24, 213, 156, 0.5)
      display: flex
      justify-content: center
      align-items: center
      .iconbofang
        font-size: 24px
  .list
    position: fixed
    bottom: 0
    width: 100%
    top: 381px
    .list-content
      background white
      .total
        margin-left: 16px
        font-size: 12px
        color: $color-text-l
        padding-top 20px
        .num
          margin-left: 5px
</style>
