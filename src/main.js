import Vue from 'vue';
import App from './App.vue';
import store from "./store/store";
import Notifications from 'vue-notification'
import router from "./approutes/routes";
import date from "./Filters/date";
import truncating from "./Filters/truncating";
import StarRating from 'vue-star-rating'

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


Vue.use(Notifications);
Vue.use(VueAxios, axios);
Vue.filter('date',date);
Vue.filter('truncate',truncating);
Vue.component('star-rating', StarRating);

import VueAxios from 'vue-axios';
import axios from 'axios';
import firebase from "firebase";

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

