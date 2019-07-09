import * as types from './mutation-types';
import {shullfle} from "common/js/filter.js";
import {playMode} from "common/js/config.js";

function indexFind(list,song){
    return list.findIndex(item=>{
        return item.id==song.id
    })
}
 /* eslint-disable */ 
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

export const randomPlay=function({commit},{list}){
    commit(types.SET_MODE, playMode.random)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_SEQUENCE_LIST,list)
    commit(types.SET_FULL_SCREEN,true)
    let randomList=shullfle(list);
    commit(types.SET_PLAY_LIST,randomList)
    commit(types.SET_CURRENT_INDEX,0)
}