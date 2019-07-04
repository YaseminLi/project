<template>
  <transition appear name="slide">
    <musicList :singerInfo='singerInfo' :songs='songs'/>
  </transition>
</template>

<script>
import { getSingerDetail} from "api/singer.js";
import { ERR_OK } from "api/config.js";
import { mapGetters } from "vuex";
import musicList from 'components/music-list/music-list';
import {createSong,processSongsUrl} from 'common/js/song.js'
export default {
  data() {
    return {
        singerInfo:{},
        songs:[]
    };
  },
  created() {
    this._getSingerDetail();
  },
  computed: {
    ...mapGetters(["singer"])
  },
  methods: {
    _getSingerDetail() {
      if(!this.singer.id){
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code == ERR_OK) {
          processSongsUrl(this._normalizeSingerDetail(res.singer.data)).then((songs)=>{
            this.songs=songs;
          });
        }
      });
    },
    _normalizeSingerDetail(data){
        let musicList=[];
        let list=data.songlist;
        for(let i=0;i<list.length;i++){
          if(list[i].mid&&list[i].album.mid){
             musicList.push(createSong(list[i]))
          }
         
        }
       
        let singerInfo=Object.assign({},this.singer,{
            fans:data.singer_info.fans,
            desc:data.singer_brief,
            total_song:data.total_song
        })
        this.singerInfo=singerInfo;
        return musicList;
    }
  },
  components: {
      musicList
  }
};
</script>

<style lang='stylus'>
@import '~common/stylus/variable'

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.slide-enter-active, .slide-leave-active
  transition: all 0.8s
</style>
