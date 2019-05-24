// components/tag/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  externalClasses: ['tag-class'],
  properties: {
    content: String,
  },
  methods: {
onTap:function(event){
  this.triggerEvent('tapping', {comment:this.data.content}, {});
}
  }
})