import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import store from "../store";
import Signup from "./components/Signup.vue";
import Login from "./components/Login";
import AddMovie from "./components/AddMovie";

import Notifications from 'vue-notification'
Vue.use(Notifications);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

import VueAxios from 'vue-axios';
import axios from 'axios';


const routes = [
  {
    name : 'Sign',
    path: '/sign',
    component: Signup,

  },
  {
    name : 'Login',
    path: '/login',
    component: Login,

  },
  {
    name : 'Create',
    path: '/create',
    component: AddMovie,

  },
];
const router = new VueRouter({
  mode: 'history',
  routes: routes
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

