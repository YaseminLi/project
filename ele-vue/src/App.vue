<template>
 <div id="app">
   <v-header />
 <div class="tab"> 
   <router-link tag='div' class='tab-item' to='/goods'>商品</router-link>
   <router-link tag='div' class='tab-item' to='/ratings'>评价</router-link>
   <router-link tag='div' class='tab-item' to='/seller'>商家</router-link>
 </div>
 <div class="content">
   <router-view></router-view>
 </div>
 </div>
</template>

<script>
import header from 'components/header/header';
 export default {
   data () {
     return {

     };
   },
   components: {
     'v-header':header
   }
 };
</script>

<style lang='stylus' rel='stylesheet/stylus'>

 
</style>
