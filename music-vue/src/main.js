import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload';
import FastClick from 'fastclick';

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preload:0.1,
  loading: require('common/img/loading.jpeg'),
  listenEvents: [ 'scroll' ]
})


import 'common/stylus/index.styl'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
