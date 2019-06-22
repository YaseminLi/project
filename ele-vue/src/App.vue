<template>
  <div id="app">
    <v-header :seller='seller'/>
    <div class="tab border-1px">
      <router-link tag="div" class="tab-item" to="/goods">商品</router-link>
      <router-link tag="div" class="tab-item" to="/ratings">评价</router-link>
      <router-link tag="div" class="tab-item" to="/seller">商家</router-link>
    </div>
    <div class="content">
      <router-view :seller='seller'></router-view>
    </div>
  </div>
</template>

<script>
import header from "components/header/header";
export default {
  data() {
    return {
      seller:{}
    };
  },
 created(){
    this.get();
  },
  methods:{
    get:function(){
       this.$http.get('/api/seller').then(response => {
                                  this.seller = response.body;
                                 }, ()=> {
                                    console.log('获取商家数据失败');
            });}
  },
  components: {
    "v-header": header
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' >
@import './common/stylus/mixin.styl';
  @import '../../common/stylus/variable.styl';
#app
  .tab
    display: flex
    align-items: center
    height: 40px
    width: 100%
    border-1px($color-row-line)
    .tab-item
      flex: 1
      font-size: 14px
      color: $color-grey-s
      text-align: center
    .router-link-active
      color: $color-red
</style>
