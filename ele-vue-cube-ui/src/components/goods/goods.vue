<template>
  <div class="goods">
    <cube-scroll-nav :side="true" :data="goods" :options="scrollOptions" v-if="goods.length">
      <template slot="bar" slot-scope="props">
        <cube-scroll-nav-bar direction="vertical" :txts="barTxts" :labels="props.labels" :current="props.current">
          <template slot-scope="props">
            <div class="text">
              <Support
                v-if="props.txt.type>=1"
                :size="3"
                :type="props.txt.type"
                
              />
              <span>{{props.txt.name}}</span>
              <!-- <span class="num" v-if="props.txt.count">
                <bubble :num="props.txt.count"></bubble>
              </span>-->
            </div>
          </template>
        </cube-scroll-nav-bar>
      </template>
      <cube-scroll-nav-panel
        v-for="item in goods"
        :key="item.name"
        :label="item.name"
        :title="item.name"
      >
        <div v-for="(food,index) in item.foods" :key="index" class="food-item border-bottom-1px">
          <img class="icon" :src="food.icon" />
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
        </div>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>

    <!-- <v-cartcontrol
      class="cartcontrol"
      :food="food"
      @decrease="decrease"
      @add="add"
      @ballDrop="ballDrop"
    />

    <v-shopcart
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
      :selectedFoods="selectedFoods"
      ref="shopcart"
      @clear="clear"
      @add="add"
      @decrease="decrease"
    />
    <v-food ref="food" :food="choosedFood" @add="add" @decrease="decrease" />--> 
  </div>
</template>

<script>
// import BScroll from "better-scroll";
// import shopcart from "components/shopcart/shopcart.vue";
// import food from "components/food/food.vue";
// import cartcontrol from "components/cartcontrol/cartcontrol.vue";
import Support from "base/support/support";
import { getGoods } from "api/index";
export default {
  data() {
    return {
      goods: [],
      classMap: ["decrease", "discount", "guarantee", "invoice", "special"],
      listHeight: [0],
      scrollY: 0,
      choosedFood: {},
      scrollOptions: {
        click: false
      }
    };
  },
  props: {
    seller: Object
  },
  components: {
    // "v-shopcart": shopcart,
    // "v-cartcontrol": cartcontrol,
    // "v-food": food,
    Support
  },
  computed: {
    // eslint-disable-next-line
    // currentIndex() {
    //   for (let i = 0; i < this.listHeight.length; i++) {
    //     if (
    //       !this.listHeight[i + 1] ||
    //       (this.scrollY >= this.listHeight[i] &&
    //         this.scrollY < this.listHeight[i + 1])
    //     ) {
    //       return i;
    //     }
    //   }
    //   return 0;
    // },
    barTxts() {
      let ret = [];
      this.goods.forEach(good => {
        const { type, name, foods } = good;
        let count = 0;
        foods.forEach(food => {
          count += food.count || 0;
        });
        ret.push({
          type,
          name,
          count
        });
      });
      return ret;
    },

    selectedFoods() {
      let foods = [];
      for (let i = 0; i < this.goods.length; i++) {
        for (let j = 0; j < this.goods[i].foods.length; j++) {
          let food = this.goods[i].foods[j];
          if (food.count > 0) {
            foods.push(food);
          }
        }
      }
      return foods;
    }
  },
  methods: {
    fetch() {
      getGoods().then(
        res => {
          this.goods = res;
          // this.$nextTick(() => {
          //   this._initScroll();
          //   this._calculateHeight();
          // });
        },
        () => {
          console.log("无法获取商品数据");
        }
      );
    },
    onChange(label) {
      console.log(label);
    },
    onSticky(current) {
      console.log(current);
    },
    selectMenu: function(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    decrease: function(food) {
      this.goods.forEach(items =>
        items.foods.forEach(item => {
          if (item === food) {
            if (item.count) {
              item.count -= 1;
            }
          }
        })
      );
    },
    add: function(food) {
      this.goods.forEach(items =>
        items.foods.forEach(item => {
          if (item === food) {
            if (!item.count) {
              this.$set(item, "count", 1);
            } else {
              item.count += 1;
            }
          }
        })
      );
    },
    ballDrop: function(target) {
      this._drop(target);
    },
    clear: function() {
      this.goods.forEach(items =>
        items.foods.forEach(item => {
          item.count = 0;
        })
      );
    },
    showFood: function(food) {
      this.$refs.food.showFood();
      this.choosedFood = food;
    },
    _drop: function() {
      // this.$refs.shopcart.drop(target);
    }
    // _initScroll: function() {
    //   this.menuScroll = new BScroll(this.$refs.menuWrapper, { click: true });
    //   this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
    //     click: true,
    //     probeType: 3
    //   });
    //   this.foodsScroll.on("scroll", pos => {
    //     this.scrollY = Math.abs(Math.round(pos.y));
    //   });
    // },
    // _calculateHeight: function() {
    //   let foodList = this.$refs.foodsWrapper.getElementsByClassName(
    //     "food-list-hook"
    //   );
    //   let height = 0;
    //   for (let i = 0; i < foodList.length; i++) {
    //     this.listHeight.push((height += foodList[i].clientHeight));
    //   }
    // }
  }
};
</script>

<style lang='stylus'>
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'
.goods
  position: absolute
  top: 0
  left: 0
  bottom: 50px
  width: 100%
  .cube-scroll-nav-bar
    width: 80px
    white-space: normal
    overflow: hidden
  .cube-scroll-nav-bar-item
    background: $color-background-sssssss
    padding: 0 10px
    height: 54px
    font-size: $fontsize-small
    color: $color-grey-s
    line-height: 14px
    display: flex
    align-items: center
    &.cube-scroll-nav-bar-item_active
      background: white
      font-weight: 700
      margin-top: -1px
    .text
      flex 1
      display: table-cell
      vertical-align: middle
      .icon
        margin-right: 2px
        width: 12px
        height: 12px
        background-size: 12px
        display: inline-block
        vertical-align: top
  .cube-scroll-nav-panel-title
    height: 26px
    padding-left: 14px
    font-size: 12px
    line-height: 26px
    color: $color-grey
    background: $color-background-sssssss
    border-left: 2px solid $color-col-line
    margin 0px
  .food-item
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
        color: $color-grey-ssss
      .description
        margin-top: 8px
        font-size: 10px
        line-height: 12px
        color: $color-grey
      .extra
        margin-top: 8px
        font-size: 10px
        color: $color-grey
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
          color: $color-red
        .oldPrice
          margin-left: 8px
          font-size: 10px
          color: $color-grey
          font-weight: 700
          text-decoration: line-through
    .cartcontrol
      position: absolute
      right: 0
      bottom: 12px
</style>
