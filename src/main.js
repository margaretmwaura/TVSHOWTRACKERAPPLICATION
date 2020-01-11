import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';


import Notifications from 'vue-notification'
Vue.use(Notifications);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

import VueAxios from 'vue-axios';
import axios from 'axios';


const routes = [
];
const router = new VueRouter({
  mode: 'history',
  routes: routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

