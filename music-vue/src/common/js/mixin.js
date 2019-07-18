import {mapGetters,mapMutations} from "vuex";
import { shullfle } from "common/js/filter.js";
import { playMode } from "common/js/config.js";
export  const playlistMixin={
    computed: {
        ...mapGetters([
          'playList'
        ])
      },
      mounted () {
        this.handlePlaylist(this.playList)
      },
      activated () {
        this.handlePlaylist(this.playList)
      },
      watch: {
        playList (newVal) {
          this.handlePlaylist(newVal)
        }
      },
      methods: {
        handlePlaylist () {
          throw new Error('component must implement handlePlaylist method')
        }
      }
    }

export const playerMixin={
  computed:{
    ...mapGetters(["sequenceList", "mode", "currentSong", "playList"]),
    modeIcon() {
      let mode = "";
      for (var key in playMode) {
        if (playMode[key] === this.mode) {
          mode = key;
        }
      }
      return `iconfont icon${mode}`;
    }
  },
  methods:{
    modeChange() {
      const mode = (this.mode + 1) % 3;
      this.setMode(mode);
      let list = [];
      if (mode == playMode.random) {
        list = shullfle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this._resetCurrentIndex(list);
      this.setPlayList(list);
    },
    _resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    ...mapMutations({
      setPlaylist: "SET_PLAY_LIST",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayingState: "SET_PLAYING_STATE"
    }),
  }
}