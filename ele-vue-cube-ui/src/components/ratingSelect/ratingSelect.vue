<template>
  <div class="rating-select">
    <div class="rateType border-bottom-1px">
      <span class="positive" :class="{'active':selectType=='2'}" @click="select(2)">
        {{desc.all}}
        <span class="ratings-num">{{ratings?ratings.length:'0'}}</span>
      </span>
      <span class="positive" :class="{'active':selectType=='0'}" @click="select(0)">
        {{desc.positive}}
        <span class="ratings-num">{{positives?positives.length:'0'}}</span>
      </span>
      <span class="negative" :class="{'active':selectType=='1'}" @click="select(1)">
        {{desc.negative}}
        <span class="ratings-num">{{negatives?negatives.length:'0'}}</span>
      </span>
    </div>
    <div class="switch" @click.stop="toggleContent" >
      <i class="icon-check_circle" :class="{'on':onlyContent}"></i>
      <span class="selectedRatings">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        onlyContent:false,
        selectType:2
    };
  },
  props: {
    ratings: Array,
    desc:{
        type:Object,
        default(){
            return {
                all:'全部',
                positive:'满意',
                negative:'不满意'
            };
        }
    }
  },
  computed: {
    positives() {
      if(!this.ratings){
        return;
      }
      return this.ratings.filter(item=>(item.rateType==0));
    },
    negatives() {
      if(!this.ratings){
        return;
      }
     return this.ratings.filter(item=>(item.rateType==1));
    }
  },
  methods: {
    toggleContent: function(event) {
       //阻止浏览器派发的点击事件
       console.log(event);
       
      if (!event._constructed) {
        return;
      }
      console.log("a");
      
      this.onlyContent=!this.onlyContent;
      console.log(this.onlyContent);
      
      this.$emit('contentOnly',this.onlyContent);
    },
    select:function(type){
        this.selectType=type;
        this.$emit('selectType',type);
    },
  },
  components: {}
};
</script>

<style lang='stylus' >
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'
.rating-select
    padding 18px 18px 0 18px
    border-bottom 1px solid $color-row-line
    .rateType
        padding-bottom: 18px
        display: flex
        .positive,.negative
            padding: 8px 12px
            font-size: $fontsize-small
            border-radius: 2px
            margin-right: 8px
            .ratings-num
                font-size: 8px
        .positive
            color: $color-grey-s
            background: $color-light-blue
            &.active
                color: white
                background: $color-blue
        .negative
                color: $color-grey-s
                background: $color-background-sssss
                &.active
                    color: white
                    background: $color-grey-s
    .switch
        padding: 12px 0
        display: flex
        color: $color-grey
        .icon-check_circle
            font-size: 24px
            marign-right: 4px
            &.on
                color $color-green
        .selectedRatings
            font-size: $fontsize-small
            line-height: 24px

</style>
