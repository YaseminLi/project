import {
  Http
} from "../utils/util.js";
//继承Http
class ClassicModel extends Http {
  getLatest(sCallback) {
    this.request({
      url: "/classic/latest.json",
      success:(res)=>{
        sCallback(res)
      }
    });
  }
};
export {
  ClassicModel
};