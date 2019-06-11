<template>
  <div class="header">
    <div class="content">
      <img
        class="seller-img"
        src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"
      >
      <div class="text">
        <div class="seller-name">
          <img src="/resource/img/brand@2x.png" >
          <span>御品粥坊</span>
        </div>
        <p>蜂鸟专送/38分钟必达</p>
        <div></div>
      </div>
      <div class="num">www</div>
    </div>
    <div class="notice">www</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.header {
  width: 100%;

  .content {
    margin: 24px 12px 18px 24px;
    display: flex;

    .seller-img {
      height: 64px;
      width: 64px;
      border-radius: 2px;
      margin-right: 16px;
    }

    .text {
      margin: 2px 0;
    }
  }
}
</style>
