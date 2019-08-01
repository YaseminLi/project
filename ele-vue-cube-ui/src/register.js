import {createAPI} from "cube-ui"
import Vue from "vue"

import Detail from "components/detail/detail"
import ShopcartList from "components/shopcart-list/shopcart-list"
import ShopcartSticky from "components/shopcart-sticky/shopcart-sticky"
createAPI(Vue,Detail)//注册组件
createAPI(Vue,ShopcartList)
createAPI(Vue,ShopcartSticky)