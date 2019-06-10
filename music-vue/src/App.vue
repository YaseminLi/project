<template>
  <div id="app">
    <MHeader />
    <Tab />
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from './components/m-header'
import Tab from './components/tab'
export default{
  components:{
    MHeader,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/variable"
  #app
    color: $color-theme
</style>
