<template>
  <div class="singer">
   <listview :data='singers' @select='selectSinger'/>
   <router-view></router-view>
  </div>
</template>

<script>
import { getSinger } from "api/singer.js";
import { ERR_OK } from "api/config.js";
import Singer from "common/js/singer.js";
import listview from 'base/listview/listview';

const HOT_SINGER_LEN = 10;
const HOT_NAME = "热门";

export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSinger();
  },
  methods: {
    selectSinger(singer){
      this.$router.push({
        path:`/singer/${singer.id}`
      })
    },
    _getSinger() {
      getSinger().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_id,
              name: item.Fsinger_name,
              mid: item.Fsinger_mid
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_id,
            name: item.Fsinger_name,
            mid: item.Fsinger_mid
          })
        );
      });
      let singer = [];
      singer.push(map.hot);
      for (let i = "A".charCodeAt(); i < "Z".charCodeAt() + 1; i++) {
        if (map[String.fromCharCode(i)]) {
          singer.push(map[String.fromCharCode(i)]);
        }
      }
      return singer;
    }
  },
  components: {
    listview
  }
};
</script>

<style scoped lang="stylus">

</style>