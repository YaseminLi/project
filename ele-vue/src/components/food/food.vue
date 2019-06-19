<template>
  <div class="goods-detail">
    <div class="goods">
      <img class="image" src="/resource/food.jpeg">
      <div class="description">
        <div class="name">皮蛋</div>
        <div class="sellCountRating">
          <span class="sellCount">月售1份</span>
          <span class="rating">好评率100%</span>
        </div>
        <div class="price">
          <span class="mark">¥</span>
          <span class="nowPrice">12</span>
          <span class="oldPrice">¥13</span>
        </div>
        <div class="add-cart">加入购物车</div>
      </div>
    </div>
    <div class="introduction">
      <div class="title">商品介绍</div>
      <div class="content">一碗皮蛋粥</div>
    </div>
    <div class="rating-container">
      <div class="head">
        <div class="title">商品评价</div>
        <div class="rateType">
          <span class="all">全部<span class="num">57</span></span>
          <span class="thump-up">推荐<span class="num">57</span></span>
          <span class="thump-down">吐槽<span class="num">57</span></span>
        </div>
        <div class="contentOnly">
          <i class="icon-check_circle"></i>
          <span>只看有内容的评价</span>
        </div>
      </div>

      <div class="ratings">
        <div class="rating-item">
          <div class="time-user">
            <div class="time">
              <span class="date">2017</span>
              <span class="time">12:24</span>
            </div>
            <div class="user">
              <span class="id">3*****2</span>
              <img>
            </div>
          </div>
          <div class="content">
            <i class="icon-thumb_up"></i>
            <span class="text">味道不错</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.goods
  position fixed
  top -174px
  left 0
  bottom 50px
  width: 100%
  z-index 30
  background: #f3f5f7
  .image
    width: 100%
    height: 375px
  .description
    padding: 18px
    background: white
    border-1px(rgba(7, 17, 27, 0.1))
    .name
      font-size: 14px
      font-weight: 700
      color: rgb(7, 17, 27)
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
    .add-cart
      font-size: 10px
      color: white
      line-height: 12px
      border-radius: 12px
      background: rgb(0, 160, 220)
      width: 74px
      text-align: center
      height: 24px
  .introduction
    margin: 16px 0
    padding: 18px
    .title
      font-size: 14px
      color: rgb(7, 17, 27)
    .content
      margin-top: 6px
      margin-right: 8px
      font-size: 12px
      color: rgb(77, 85, 93)
      line-height: 24px
  .rating-container
    background: white
    .head
      padding: 18px
      .title
          font-size 14px
          color rgb(7,17,27)
          padding-bottom 6px
      .rateType
          margin 12px 0 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          display flex
          span 
            padding 8px 12px
            font-size 12px
            border-radius 2px
            .num
                font-size 16px
            &.all
                color white
               
</style>