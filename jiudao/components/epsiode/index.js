// components/data/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: String,
    pubdate: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: Number,
    month: ["0","一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
  },

  ready: function() {
    let year = this.properties.pubdate.substring(0, 4);
    let month = Number(this.properties.pubdate.substring(5, 7));
    this.setData({
      year: year,
      month: this.data.month[month]
    });
  }
})