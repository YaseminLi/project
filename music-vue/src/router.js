import Vue from 'vue'
import Router from 'vue-router'
import Rank from './components/rank.vue'
import Recommend from './components/recommend.vue'
import Search from './components/search.vue'
import Singer from './components/singer.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
      path:'/',
      redirect: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
        path: '/recommend',
        name: 'recommend',
        component: Recommend
      },
      {
        path: '/search',
        name: 'search',
        component: Search
      },
      {
        path: '/singer',
        name: 'singer',
        component: Singer
      }
  ]
});

