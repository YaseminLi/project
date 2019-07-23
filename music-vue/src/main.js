import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  loading: require('common/img/loading.jpeg'),
})
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   loading: require('common/img/loading.jpeg'),
//   attempt: 1
// })

import 'common/stylus/index.styl'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
