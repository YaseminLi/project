import Vue from 'vue';
import './cube-ui';
import App from './App.vue';
import 'common/stylus/index.styl';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount('#app');
