import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import componentNormalizer from "vue-loader/lib/runtime/componentNormalizer";


Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        token : ' ',
        movies : [],
        signupresponse : ' ',
        signupfailure : ' ',
        loginresponse : ' ',
        loginfailure : ' ',
        createresponse : ' ',
        createfailure : ' ',
    },
    mutations: {
        createuser(firstname ,lastname ,password) {
            axios
                .post('http://localhost:4000/signup',[firstname,lastname,password])
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        this.state.token = response.data.token;
                        this.state.signupresponse = response.status;
                    }
                })
                .catch(error => {
                    this.state.signupfailure = "error";
                })

        },
        loginusermut(email , password) {
            axios
                .post('http://localhost:4000/login',[email,password])
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        this.state.token = response.data.token;
                        this.state.loginresponse = response.status;
                    }
                    else
                    {
                        this.state.loginfailure = "Error";
                    }
                })
                .catch(error => {
                    this.state.loginfailure = "error";
                })

        },
        createmoviemut(moviename, moviegenre,moviecast,movieplot,movieimage)
        {
            axios
                .post('http://localhost:4000/moviedits',[moviename, moviegenre,moviecast,movieplot,movieimage],{
                    headers: {
                        'Authorization': 'Bearer ' + this.state.name
                    }
                })
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        this.state.createresponse = response.status;
                        console.log("Creating movies was a success + the response " + response.data.param);
                        let passed = JSON.parse(response.data.param);
                        console.log("This is the passed data " + passed);
                        this.state.movies = [];
                        this.state.movies = passed;
                    }
                })
                .catch(error => {
                    this.state.createfailure = "error";
                })
        },
        getAllMoviesmut()
        {
            axios
                .get('http://localhost:4000/allmovies')
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        console.log("Getting movies was a success + the response " + response.data.param);
                        let passed = JSON.parse(response.data.param);
                        console.log("This is the passed data " + passed);
                        this.state.movies = [];
                        this.state.movies = passed;
                    }
                })
                .catch(error =>
                {
                })
        },
        addCommentmut()
        {

        },
        addRatingmut()
        {

        }



    },
        getters:
            {
                currentuser: state => {
                    return state.token
                },
            },
        actions:
            {
                signingupusers({commit}, firstname , lastname , password) {
                    commit('createuser',firstname,lastname,password);
                },
                loginusers({commit}, email, password) {
                    commit('loginusermut',email,password);
                },
                createmovie({commit}, moviename, moviegenre,moviecast,movieplot,movieimage)
                {
                    commit('createmoviemut',moviename, moviegenre,moviecast,movieplot,movieimage);
                },
                getAllMovies({commit})
                {
                    commit('getAllMoviesmut');
                },
                addrating({commit})
                {
                    commit('addRatingmut');
                },
                addcomment({commit})
                {
                    commit('addCommentmut');
                },
            },


});
