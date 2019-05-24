// components/image-button/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    openType: String
  },

  methods: {
    onGetUserInfo(e) {
      this.triggerEvent('getUserInfo', e.detail, {});
    }
  }
})