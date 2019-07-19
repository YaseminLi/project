<template>
  <div class="user">
    <switches @switchItem="switchItem" :switches="switches" :currentIndex="switchesCurrentIndex" />
    <div class="play-btn" @click.stop="playRandom">
      <i class="iconfont iconbofang"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list favourite" v-show="switchesCurrentIndex==0">
      <scroll>
        <div>
          <songList :songs="favoriteList" @selectItem="selectSong" />
        </div>
      </scroll>
    </div>
    <div class="list play" v-show="switchesCurrentIndex==1">
      <scroll>
        <div>
          <songList :songs="playHistory" @selectItem="selectSong" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import switches from "base/switches/switches";
import { Song } from "common/js/song.js";
import { mapGetters, mapActions } from "vuex";
import scroll from "base/scroll/scroll";
import songList from "base/song-list/song-list";
export default {
  data() {
    return {
      switches: ["我喜欢的", "最近听的"],
      switchesCurrentIndex: 0
    };
  },
  computed: {
    ...mapGetters(["playHistory", "favoriteList"])
  },
  methods: {
    switchItem(index) {
      this.switchesCurrentIndex = index;
    },
    selectSong(song) {
      this.insertSong(new Song(song));
    },
    playRandom() {
      let list =
        this.switchesCurrentIndex == 0 ? this.favoriteList : this.playHistory;
      list.forEach(item => {return new Song(item)});
      this.randomPlay({
        list
      });
    },
    ...mapActions({
      insertSong: "insertSong",
      randomPlay: "randomPlay"
    })
  },
  components: {
    switches,
    scroll,
    songList
  }
};
</script>

<style lang='stylus' >
.user
  .play-btn
    height: 40px
    display: flex
    justify-content: center
    align-items: center
    font-size: 14px
    .iconfont
      font-size: 18px
  .list
    position: fixed
    top: 136px
    bottom: 0
    width: 100%
    overflow: hidden
</style>
