<template>
 <div class="search-box">
 <div class="search-container">
        <i class="iconfont iconsousuo"/>
        <input type="text" placeholder="搜索歌曲、歌单、专辑" @click="beginSearch" v-model="inputValue"/>
        <i v-show="inputValue" class="iconfont iconquxiao" @click="clearInput"></i>
      </div>
 </div>
</template>

<script>
 export default {
     data(){
         return{
             inputValue:""
         }
     },
methods:{
    beginSearch(){
        this.$emit("beginSearch")
    },
    clearInput(){
        this.inputValue=""
        this.$emit("clearInput")
    }
},
watch:{
    inputValue(newValue){
        this.$emit("input",newValue)
    }
}
 };
</script>

<style lang='stylus' >
@import "~common/stylus/variable"
 .search-box
  padding 10px
  background: $color-background-dd
  .search-container
    border-radius: 10px
    position relative
    input 
        width 100%
        box-sizing border-box
        height 36px
        padding 8px 12px 8px 35px
        font-size 14px
        color $color-background-d 
        outline none
    .iconfont
        position absolute 
        color #b1b1b1
        font-size 20px
        bottom 7px
    .iconquxiao
        right 10px
    .iconsousuo
        left 10px
</style>
