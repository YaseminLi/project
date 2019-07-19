import Vue from 'vue'
import Router from 'vue-router'
import Rank from './components/rank/rank.vue'
import Recommend from './components/recommend/recommend.vue'
import Search from './components/search/search.vue'
import Singer from './components/singer/singer.vue'
import singerDetail from './components/singer-detail/singer-detail.vue'
import disc from "./components/disc/disc.vue"
import topList from "./components/top-list/top-list.vue"
import user from "./components/user/user.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:  '/rank',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      children:[{
        path:":id",
        component:topList
      }]
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: disc
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children:[
        {
          path:':id',
          component:singerDetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
    }
  ]
});

