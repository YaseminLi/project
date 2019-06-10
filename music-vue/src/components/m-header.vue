<template>
  <div class="m-header">
    <img class="icon" src="../common/image/icon.png">
    <h1 class="text">Music</h1>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.m-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height 44px;
  margin-top 6px;
}

.text {
  display: inline-block;
  line-height: 44px;
}

.icon {
  display: inline-block;
  width: 30px;
  height: 28px;
  margin-right 9px
}
</style>