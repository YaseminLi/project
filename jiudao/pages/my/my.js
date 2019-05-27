import {
  ClassicModel
} from "../../models/classic.js";
const classicModel = new ClassicModel();
Page({
  data: {
    userInfo: '',
    authorized: false,
    favor: '',
    count: ''
  },

  onLoad: function (options) {
    this.userAuthorized();
    classicModel.getClassicFavor((data) => this.setData({ favor: data }));

  },
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo;
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },
  userAuthorized() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              })
            },
          });
        }
      }
    })
  },
  onMyMovieList: function (event) {
    wx.navigateTo({
      url: '../my-movie/my-movie',
    })
  },
  onAboutUs() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onShow: function () {
    let array = wx.getStorageSync('movieCollection');
    if (array) {
      this.setData({
        count:array.length
      })
    }
  }
})