import {Http} from "../utils/util.js";
class LikeModel extends Http{
  //post建好后要完善
  like(behavior, artId,category){
    console.log(behavior,artId,category)
    let url = behavior == "like" ? "/like" :"/like/cancel";
    this.request({
      url:url,
      method:"POST"
    })
  }
  //post建好后要完善
  getLikeStatus(artId, category,sCallback){
    this.request({
      url: `classic/${category}/${artId}/favor`,
      success:(res)=>(
        sCallback(res.data)
      )
    })

  }
}
export {
  LikeModel
};