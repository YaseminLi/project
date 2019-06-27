<template>
  <div id="app">
    <Tab />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script type="text/ecmascript-6">
import Tab from 'components/tab/tab'
export default{
  components:{
    Tab
  }
}
</script>

<style scoped lang="stylus">

</style>
