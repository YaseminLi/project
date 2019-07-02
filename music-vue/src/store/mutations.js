//定义修改的操作

import * as types from './mutation-types'
import { type } from 'os';

const mutations={
    [types.SET_SINGER](state,singer){
        state.singer=singer
    }
}

export default mutations;