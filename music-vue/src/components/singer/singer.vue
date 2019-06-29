<template>
  <div class="singer">
    <scroll class="singer-wrapper" :data='singer' ref="singerWrapper" > 
      <div>
        <div  class="singer-container"  v-for="(item,index) in singer" :key="index">
          <h1 class="title">{{item.title}}</h1>
          <div>
            <div class="singer-item" v-for="(singer,index) in item.items" :key="index">
              <img class="avatar" :src="singer.avatar">
              <span class="name">{{singer.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="list-shortcut">
        <span @click='selectTitle(index)' class="item" v-for="(item,index) in singer" :key="index">{{index==0?'热':item.title}}</span>
    </div>
  </div>
</template>

<script>
import { getSinger } from "api/singer.js";
import { ERR_OK } from "api/config.js";
import scroll from "base/scroll/scroll.vue";

const HOT_SINGER_LEN = 10;
const HOT_NAME = "热门";

export default {
  data() {
    return {
      singer: []
    };
  },
  created() {
    this._getSinger();
  },
  methods: {
      selectTitle(index){
          let a=this.$refs.singerWrapper.getElementsByClassName("singer-container");
          console.log(a);
          console.log(index);
          
          
      },
    _getSinger() {
      getSinger().then(res => {
        if (res.code === ERR_OK) {
          this._normalizeSinger(res.data.list);
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
          map.hot.items.push({
            id: item.Fsinger_id,
            name: item.Fsinger_name,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${
              item.Fsinger_mid
            }.jpg?max_age=2592000`
          });
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push({
          id: item.Fsinger_id,
          name: item.Fsinger_name,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${
            item.Fsinger_mid
          }.jpg?max_age=2592000`
        });
      });
      let singer = [];
      singer.push(map.hot);
      for (let i = "A".charCodeAt(); i < "Z".charCodeAt() + 1; i++) {
        if (map[String.fromCharCode(i)]) {
          singer.push(map[String.fromCharCode(i)]);
        }
      }
      this.singer = singer;
    }
  },
  components: {
    scroll
  }
};
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';
.singer-wrapper
    position: fixed
    top: 44px
    bottom: 0
    width: 100%
    overflow hidden
    .singer-container
        padding-bottom 30px
        .title
            height 30px
            line-height 30px
            padding-left 20px
            background $color-background-dd 
            color $color-text
            font-size 12px
        .singer-item
            width 100%
            box-sizing border-box
            padding 20px 0 0 30px
            display flex
            align-items center
            .avatar
                border-radius 50%
                width 50px
                height 50px
            .name
                font-size 14px
                color $color-text
                margin-left 20px
    
.list-shortcut
    position absolute
    right 0
    bottom 50px
    width 20px
    padding 20px 0
    border-radius 10px
    background  $color-background-dd 
    display flex
    flex-direction column
    .item
        font-size 12px
        height 12px
        width 14px
        color $color-text
        padding 3px
        background $color-background-dd 
        color $color-text
        text-align center
</style>