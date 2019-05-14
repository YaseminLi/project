import {
  ClassicModel
} from '../../models/classic.js';
import {
  LikeModel
} from '../../models/like.js';
let classicModel = new ClassicModel();
let likeModel = new LikeModel();
Page({
  data: {
    classic: '',
    latest: true,
    first: false,
    likeStatus: false,
    likeCount: 0
  },
  onLoad: function(options) {
    let index = this.data.classic.index;
    classicModel.getLatest(index, (data) => {
      this.setData({
        classic: data,
        likeStatus: data.like_status,
        likeCount: data.fav_nums
        //...res
      });
      // this._getLikeStatus(res.index,res.type,)
    });
  },
  onLike: function(event) {
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },
  onNext: function(event) {
    this._updateClassic("next")
  },
  onPrevious: function(event) {
    this._updateClassic("previous")
  },
  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index;
    classicModel.getClassic(nextOrPrevious, index, (data) => {
      // this._getLikeStatus(res.index, res.type)
      this.setData({
        classic: data,
        first: classicModel.isFirst(data.index),
        latest: classicModel.isLatest(data.index)
      })
    });
  },
  _getLikeStatus: function(artId, category) {
    likeModel.getClassicLikeStatus(artId, category, (data) => {
      this.setData({
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      })
    })
  }
})