import { ClassicModel } from '../../models/classic.js';
let classicModel = new ClassicModel ();
Page({
  data: {
    classic:''
  },
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      this.setData({classic:res.data});
    });
  }
})