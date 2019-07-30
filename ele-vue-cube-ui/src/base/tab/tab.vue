<template>
  <div class="tab">
    <cube-tab-bar
      :data="tabs"
      v-model="selectedLabel"
      :showSlider="true"
      :useTransition="false"
      class="border-bottom-1px"
      ref="tabBar"
    ></cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :autoPlay="false"
        :showDots="false"
        :initial-index="index"
        :loop="false"
        @change="onChange"
        :options="slideOptions"
        @scroll="onScroll"
        ref="slide"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
            <component :is="tab.components" :seller="tab.data.seller" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      index: this.initialIndex,
      slideOptions: {
        listenScroll: true,
        probeType: 3
      }
    };
  },
  computed: {
    //双向绑定在cube-bar的v-model上，点击tab时，会调用set
    selectedLabel: {
      get() {
        return this.tabs[this.index].label;
      },
      set(newV) {
        this.index = this.tabs.findIndex(value => value.label == newV);
      }
    }
  },
  mounted(){
    this.onChange(this.index)
  },
  methods: {
    onChange(index) {
      this.index = index;
      const component=this.$refs.component[index]
      //切换tab时，同时获取该组件需要的数据
      component.fetch&&component.fetch()
    },
    onScroll(pos) {
      let tabWidth = this.$refs.tabBar.$el.clientWidth;
      let slideWidth = this.$refs.slide.slide.scrollerWidth;
      let transform = (-pos.x / slideWidth) * tabWidth;
      this.$refs.tabBar.setSliderTransform(transform);
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.tab
  position: fixed
  top: 134px
  bottom: 0
  left: 0
  right: 0
  display: flex
  flex-direction: column
  >>>.cube-tab
    font-size: $fontsize-medium
    padding: 13px 0
  .slide-wrapper
    flex: 1
    overflow: hidden
</style>
