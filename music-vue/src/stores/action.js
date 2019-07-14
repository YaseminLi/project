import * as types from './mutation-types';
import {shullfle} from "common/js/filter.js";
import {playMode} from "common/js/config.js";

function indexFind(list,song){
    return list.findIndex(item=>{
        return item.id==song.id
    })
}
 //点击歌曲播放
export const selectPlay=function({commit,state},{list,index}){

    commit(types.SET_SEQUENCE_LIST,list)
    if(state.mode==playMode.random){
        let randomList=shullfle(list);
        commit(types.SET_PLAY_LIST,randomList)
        index=indexFind(randomList,list[index])
    }else{
        commit(types.SET_PLAY_LIST,list)
    }
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_CURRENT_INDEX,index)
}
//切换到随机播放模式
export const randomPlay=function({commit},{list}){
    commit(types.SET_MODE, playMode.random)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_SEQUENCE_LIST,list)
    commit(types.SET_FULL_SCREEN,true)
    let randomList=shullfle(list);
    commit(types.SET_PLAY_LIST,randomList)
    commit(types.SET_CURRENT_INDEX,0)
}

//播放列表的清空所有歌曲功能
export const clearPlaylist=function({commit}){
    commit(types.SET_PLAY_LIST,[])
    commit(types.SET_SEQUENCE_LIST,[])
    commit(types.SET_CURRENT_INDEX,0)
    commit(types.SET_PLAYING_STATE, false)
}

//删除播放列表的某一首歌
/* eslint-disable */
export const removeSong=function({commit,state},{item,index}){
let sequenceList=state.sequenceList.slice();
let playList=state.playList.slice();
sequenceList.splice(index,1);
playList=playList.filter(song=>song.id!==item.id)
let indexNew=playList.findIndex(song=>song.id==state.playList[state.currentIndex].id);
if(indexNew==-1){
    indexNew=index
}

commit(types.SET_SEQUENCE_LIST,sequenceList)
commit(types.SET_PLAY_LIST,playList)
commit(types.SET_CURRENT_INDEX,indexNew)
if (!playList.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}