<template>
 <div class="seller">
    <div class="desc">
      <div class="header border-1px" >
        <div class="name">{{seller.name}}</div>
        <div class="score">
          <v-star :size=36 :score='seller.score'/>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <div class="collect">
          <i class="icon-favorite"></i>
          <span class="text">已收藏</span>
        </div>
      </div>
      <div class="delivery">
        <div class="item">
          <div class="title">起送价</div>
          <div class="content"><span class="num">{{seller.minPrice}}</span>元</div>
        </div>
        <div class="item">
          <div class="title">商家配送</div>
          <div class="content"><span class="num">{{seller.deliveryPrice}}</span>元</div>
        </div>
          <div class="item">
          <div class="title">平均配送时间</div>
          <div class="content"><span class="num">{{seller.deliveryTime}}</span>元</div>
        </div>
      </div>
    </div>
    <div class="bulletin-supports">
      <div class="bulletin">
        <div class="title">公告与活动</div>
       <div class="content">{{seller.bulletin}}</div>
      </div>
      <div class="supports">
        <div class='item' v-for="(item,index) in seller.supports" :key="index">
          <i class="icon"></i>
          <span class="text">{{item.description}}</span>
        </div>
      </div>
    </div>
    <div class="pics">
      <div class="title">商家实景</div>
      <div class="container">
        <img v-for='(item,index) in seller.pics' :src="item" :key="index">
      </div>
    </div>
    <div class="infos">
      <div class="title">商家信息</div>
      <div class="container">
        <div v-for="(item,index) in seller.infos" :key="index">{{item}}</div>
      </div>
    </div>
 </div>
</template>

<script>
import star from 'components/star/star';
 export default {
   props:{
     seller:Object
     },

   methods:{
  
   },
   components: {
     'v-star':star
   }
 };
</script>

<style lang='stylus' scoped>
@import '../../common/stylus/mixin.styl';
.seller
  background #f3f5f7
  .desc
    marign 0 18px
    border-bottom 1px solid rgba(7,17,27,0.1)
    background white
    .header
      padding 18px 0
      border-1px(rgba(7,17,27,0.1))
      .name
        font-size 14px
        color:rgb(7,17,27)
    .delivery
      padding 18px 0
 
</style>
