<template>
  <div id="app">
    <v-header :seller='seller'/>
  </div>
</template>
<script>
import VHeader from "components/header/header";
export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.get();
  },
  methods: {
    get: function() {
      this.$http.get("/api/seller").then(
        response => {
          this.seller = response.body.data;
        },
        () => {
          console.log("获取商家数据失败");
        }
      );
    }
  },
  components: {
    VHeader
  }
};
</script>

<style lang="stylus">

</style>
