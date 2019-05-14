import { ClassicModel } from '../../models/classic.js';
import { LikeModel } from '../../models/like.js';
let classicModel = new ClassicModel ();
let likeModel=new LikeModel();
Page({
  data: {
    classic:'',
    latest:true,
    first:false
  },
  onLoad: function (options) {
    let index=this.data.classic.index;
    classicModel.getLatest(index,(res)=>{
      this.setData({classic:res});
    });
  },
  onLike:function(event){
    let behavior=event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },
  onNext: function (event) {
    this._updateClassic("next")
  },
  onPrevious: function (event) {
    this._updateClassic("previous")
  },
  _updateClassic:function(nextOrPrevious){
    let index = this.data.classic.index;
    classicModel.getClassic(nextOrPrevious, index, (res) => {
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index)
      })
    });
  }
})