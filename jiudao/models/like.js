import {Http} from "../utils/util.js";
class LikeModel extends Http{
  like(behavior, artId,category){
    console.log(behavior,artId,category)
    let url = behavior == "like" ? "/like" :"/like/cancel";
    this.request({
      url:url,
      method:"POST"
    })
  }
}
export {
  LikeModel
};