<template>
 <div class="shopcart">
    <div class="content">
        <div class="content-left">
            <div class="logo-wrapper" :class="{'haveSeleced':totalCount>0}">
                <div class="icon-shopping_cart" ></div>
                <div class="totalCount" v-show="totalCount>0">{{totalCount}}</div>
            </div>
            <div class="price" :class="{'haveSeleced':totalCount>0}">¥ {{totalPrice}}</div>
            <div class="desc">另需配送费 ¥ {{deliveryPrice}}元</div>
        </div>
        <div class="content-right" :class="payClass">{{payDesc}}</div>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     };
   },
   props:{
       deliveryPrice:{
           type:Number,
           default:0
       },
       minPrice:{
           type:Number,
           default:0
       },
       selectedFoods:{
           type:Array,
           default(){
               return [{
                   price:10,
                   count:3
               }];
           }
       }
   },
   methods:{
    //    drop(el){

    //    }
   },
   computed:{
       totalPrice(){
           let totalPrice=0;
           this.selectedFoods.forEach(food => {
               totalPrice+=food.price*food.count;
           });
           return totalPrice;
       },
       totalCount(){
           let totalCount=0;
           this.selectedFoods.forEach(food => {
               totalCount+=food.count;
           });
           return totalCount;
       },
       // eslint-disable-next-line
       payDesc(){
           let totalPrice=this.totalPrice;
           let minPrice=this.minPrice;
           if(this.totalPrice===0){
               return `¥ ${minPrice}起送`;
           }else if(totalPrice<minPrice){
               return `还差¥ ${minPrice-totalPrice}起送`;
           }else if(totalPrice>=minPrice){
               return `去结算`;
           }
       },
       payClass(){
           if(this.totalPrice>=this.minPrice){
               return 'enough';
            }else {
                return 'not-enough';
            }
       }
   }
 };
</script>
<style lang='stylus'>
.shopcart
  height 50px
  width 100%
  position fixed
  left 0
  bottom 0
  z-index 50
  background #141d27
  display flex
  .content
    display flex
    width 100%
    color rgba(255,255,255,0.4)
    .content-left
        display flex
        flex-direction row
        margin-right 12px
        flex 1
        .logo-wrapper
            width 44px
            height 44px
            margin 0 12px
            border 6px solid #141d27
            background #2b343c
            border-radius 44px
            position relative
            top -8px
            &.haveSeleced
                background #00a0dc
                .icon-shopping_cart
                    color white
            .icon-shopping_cart
                font-size 24px
                color rgba(255,255,255,0.4)
                width 24px
                height 24px
                margin 10px
            .totalCount
                font-size 9px
                color white
                background red
                height 16px
                width 24px
                text-align center
                border-radius 16px 
                line-height 16px
                position absolute
                top -6px
                right -6px
                box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
            margin 14px 12px 12px 0
            padding-right 12px
            font-size 16px
            font-weight 700
            line-height 24px 
            border-right 1px solid rgba(255,255,255,0.1)
            &.haveSeleced
                color white
        .desc
            font-size 10px
            line-height 24px
            margin-top 14px
    .content-right 
        flex 0 0 105px
        box-sizing border-box    
        height 50px
        width 105px
        padding 14px 8px 12px 8px
        font-size 12px
        line-height 24px
        font-weight 700
        text-align center
        &.enough
            background #00b43c
            color white
        &.not-enough
            background #2b333b
          
</style>
