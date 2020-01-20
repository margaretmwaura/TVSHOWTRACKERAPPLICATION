import Signup from "../components/Signup";
import Login from "../components/Login";
import AddMovie from "../components/AddMovie";
import MovieList from "../components/MovieList";
import Movie from "../components/Movie";
import VueRouter from "vue-router";
import EditAMovie from "../components/EditAMovie";
import Vue from "vue";
Vue.use(VueRouter);


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
        name : 'Home',
        path: '/',
        component: MovieList,

    },
    {
        name : 'Edit',
        path: '/edit',
        component: EditAMovie,
        props:true
    },
    {
        name : 'Info',
        path: '/info',
        component: Movie,
        props:true
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
