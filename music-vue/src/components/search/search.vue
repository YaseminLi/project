<template>
    <div>
        搜索
    </div>
</template>

<script>
import {getSearch} from 'api/search.js';
import {ERR_OK} from 'api/config.js';
    export default {
        data(){
            return {
                hotkey:[]
            }
        },
        created(){
            this._initSearch();
        },
        methods:{
            _initSearch(){
                getSearch().then(res=>{
                    if(res.code==ERR_OK)
                    console.log(res.data);
                    this.hotkey=res.data;
                })
            }
        }
    }
</script>

<style lang="stylus">


</style>