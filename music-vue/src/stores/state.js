import {playMode} from 'common/js/config.js';
const state={
    singer:{},
    playingState:false,
    fullScreen:false,
    playList:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:0,
    disc:{}
}
export default state;