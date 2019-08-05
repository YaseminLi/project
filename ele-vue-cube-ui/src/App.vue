<template>
  <div id="app">
    <Header :seller="seller" />
    <Tab :tabs="tabs" />
  </div>
</template>
<script>
import Header from "components/header/header";
import Tab from "base/tab/tab";
import Goods from "components/goods/goods";
import Ratings from "components/ratings/ratings";
import Seller from "components/seller/seller";
import { getSeller } from "api/index.js";
import qs from "query-string"
export default {
  data() {
    return {
      seller: {
        id:qs.parse(window.location.search).id
      }
    };
  },
  created() {
    this._getSeller();
  },
  computed: {
    tabs() {
      return [
        {
          label: "商品",
          components: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: "评论",
          components: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: "商家",
          components: Seller,
          data: {
            seller: this.seller
          }
        }
      ];
    }
  },
  methods: {
    _getSeller() {
      getSeller({id:this.seller.id}).then(data => {
        this.seller = data;
      });
    }
  },
  components: {
    Header,
    Tab
  }
};
</script>

<style lang="stylus"></style>
