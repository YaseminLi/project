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
    var that =this;
    // classicModel.getLatest((res)=>{
    //   this.setData({classic:res.data});
    // });
    classicModel.getLatest(
      function(res){
        that.setData({ classic: res.data })
      }
    );
  },
  onLike:function(event){
    let behavior=event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },
  onNext: function (event) {
    let tap = event.detail.left;
   console.log(tap);
  },
  onPrevious: function (event) {
    let tap = event.detail.right;
    console.log(tap);
  }
})