import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import store from "../store";
import Signup from "./components/Signup.vue";
import Login from "./components/Login";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";

const firebaseConfig = {
  apiKey: "AIzaSyAedwFar_PxguO-ebvRUnM39rmPxH_OMYY",
  authDomain: "movievueapp-3a6d3.firebaseapp.com",
  databaseURL: "https://movievueapp-3a6d3.firebaseio.com",
  projectId: "movievueapp-3a6d3",
  storageBucket: "movievueapp-3a6d3.appspot.com",
  messagingSenderId: "347112932333",
  appId: "1:347112932333:web:a881aa00f019b82e885de4",
  measurementId: "G-1R405BW4ND"
};
firebase.initializeApp(firebaseConfig);

import Notifications from 'vue-notification'
Vue.use(Notifications);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

import VueAxios from 'vue-axios';
import axios from 'axios';
import firebase from "firebase";

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
  {
    name : 'Show',
    path: '/show',
    component: MovieList,

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

