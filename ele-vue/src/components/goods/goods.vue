<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <div >
        <div v-for="(item,index) in goods" :key="index" class="name">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </div>
      </div>
    </div>

    <div class="foods-wrapper" ref="foodsWrapper">
      <div>
        <div v-for="(item,index) in goods" :key="index" class="food-list food-list-hook"> 
          <div class="name">{{item.name}}</div>
          <div
            v-for="(food,index) in item.foods"
            :key="index"
            class="food-item border-1px border-none"
          >
            <img class="icon" :src="food.icon">
            <div class="content">
              <div class="food-name">{{food.name}}</div>
              <div v-show="food.description" class="description">{{food.description}}</div>
              <div class="extra">
                <span class="sellCount">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="mark">¥</span>
                <span class="nowPrice">{{food.price}}</span>
                <span v-show="food.oldPrice" class="oldPrice">¥{{food.oldPrice}}</span>
              </div>
            </div>
            <div class="add">
              <i class="icon-remove_circle_outline icon"></i>
              <span class="count">1</span>
              <i class="icon-add_circle icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      goods: "",
      foodList:[],
      classMap: ["decrease", "discount", "guarantee", "invoice", "special"]
    };
  },
  components: {},
  created() {
    this.get();
  },
  methods: {
    get: function() {
      this.$http.get("/api/goods").then(
        response => {
          this.goods = response.body;
          console.log(response);
          this.$nextTick(() => {
            this._initScroll();
            this._computeHeight();
          });
        },
        () => {
          console.log("无法获取商品数据");
        }
      );
    },
    _initScroll: function() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {});
    },
    _computeHeight:function(){
      let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      for(let i=0;i<foodList.length;i++){
        
      }
      console.log(foodList);
    }
  }
};
</script>

<style lang='stylus'>
@import '../../common/stylus/mixin.styl'
.goods
  display: flex
  position: absolute
  top: 174px
  left: 0
  bottom: 50px
  width: 100%
  color: black
  .menu-wrapper
    flex: 0 0 80px
    background: #f3f5f7
    overflow: hidden
    .name
      padding: 0 12px
      width: 56px
      height: 54px
      font-size: 12px
      color: rgb(75, 85, 93)
      line-height: 14px
      display: table
      .text
        display: table-cell
        vertical-align: middle
        width: 56px
        border-1px(rgba(7, 17, 27, 0.1))
      .icon
        margin-right: 2px
        width: 12px
        height: 12px
        background-size: 12px
        background-repeat: no-repeat
        display: inline-block
        vertical-align: top
        &.decrease
          bg-img('decrease_3')
        &.discount
          bg-img('discount_3')
        &.guarantee
          bg-img('guarantee_3')
        &.invoice
          bg-img('invoice_3')
        &.special
          bg-img('special_3')
  .foods-wrapper
    flex: 1
    background: white
    overflow: hidden
    .food-list
      .name
        height: 26px
        padding-left: 14px
        font-size: 12px
        line-height: 26px
        color: rgb(147, 153, 159)
        background: #f3f5f7
        border-left: 2px solid #d9dde1
      .food-item
        border-1px(rgba(7, 17, 27, 0.1))
        display: flex
        margin: 0 18px
        padding: 18px 0
        position: relative
        &:last-child
          border-none()
        .icon
          height: 57px
          width: 57px
          border-radius: 2px
          margin-right: 10px
        .content
          flex: 1
          .food-name
            margin-top: 2px
            font-size: 14px
            color: rgb(7, 17, 27)
          .description
            margin-top: 8px
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
          .extra
            margin-top: 8px
            font-size: 10px
            color: rgb(147, 153, 159)
            .rating
              margin-left: 12px
          .price
            // margin-top: 4px
            line-height: 24px
            .mark
              font-size: 10px
              font-weight: normal
              color: red
              margin-top: 1px
              margin-right: 1px
            .nowPrice
              font-size: 14px
              font-weight: 700
              color: rgb(240, 20, 20)
            .oldPrice
              margin-left: 8px
              font-size: 10px
              color: rgb(147, 153, 159)
              font-weight: 700
              text-decoration: line-through
        .add
          position: absolute
          right: 0
          bottom: 18px
          display: flex
          flex-direction: row
          align-items: center
          .count
            display: block
            width: 24px
            font-size: 10px
            line-height: 24px
            color: rgb(143, 157, 159)
            text-align: center
          .icon
            width: 24px
            height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
            margin: 0
</style>
