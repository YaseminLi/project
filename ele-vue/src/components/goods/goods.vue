<template>
  <div class="goods">
    <div class="menu-wrapper">
      <div v-for="(item,index) in goods" :key="index" class="name">
        <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>
        {{item.name}}
      </div>
    </div>
    
    <div class="goods-wrapper">
      <div v-for="(item,index) in goods" :key="index" class="foods">
        <div class="name">{{item.name}}</div>
        <div class="food-container">
          <div v-for="(food,index) in item.foods" :key="index" class="food">
            <img class="icon" :src="food.icon">
            <div class="detail">
              <div class="food-name">{{food.name}}</div>
              <div v-if="food.description" class="description">{{food.description}}</div>
              <div class="sellCountRating">
                <span class="sellCount">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="mark">¥</span>
                <span class="nowPrice">{{food.price}}</span>
                <span v-if="food.oldPrice" class="oldPrice">¥{{food.oldPrice}}</span>
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
export default {
  data() {
    return {
      goods: "",
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
        },
        () => {
          console.log("无法获取商品数据");
        }
      );
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
    .name
      width: 100%
      height: 54px
      font-size: 12px
      color: rgb(75, 85, 93)
      line-height: 14px
    mari  
      .icon
        width: 12px
        height: 12px
        background-size: 12px
        background-repeat: no-repeat
        display inline-block
        &.decrease
          bg-img('decrease_1')
        &.discount
          bg-img('discount_1')
        &.guarantee
          bg-img('guarantee_1')
        &.invoice
          bg-img('invoice_1')
        &.special
          bg-img('special_1')
  .goods-wrapper
    flex: 1
    background: white
    .foods
      .name
        height: 26px
        padding-left: 12px
        font-size: 12px
        line-height: 26px
        color: rgb(147, 153, 159)
        background: #f3f5f7
        border-left: 2px solid #d9dde1
      .food-container
        margin: 0 18px
        .food
          border-1px(rgba(7, 17, 27, 0.1))
          display: flex
          padding: 18px 0
          position: relative
          .icon
            height: 57px
            width: 57px
            border-radius: 2px
            margin-right: 10px
          .detail
            display: flex
            flex-direction: column
            .food-name
              margin-top: 2px
              font-size: 14px
              color: rgb(7, 17, 27)
            .description
              margin-top: 8px
              font-size: 10px
              color: rgb(147, 153, 159)
            .sellCountRating
              margin-top: 8px
              font-size: 10px
              color: rgb(147, 153, 159)
              .rating
                margin-left: 12px
            .price
              margin-top: 4px
              line-height: 24px
              display: flex
              .mark
                font-size: 10px
                font-weight: normal
                color: red
                margin-top: 1px
                margin-right: 1px
              .nowPrice
                font-size: 14px
                font-weight: 700
                color: red
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
