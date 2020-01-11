import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import componentNormalizer from "vue-loader/lib/runtime/componentNormalizer";

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        token : ' ',
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
        createmoviemut(movieimage, moviename ,moviecast , movieplot , moviegenre) {
            axios
                .post('http://localhost:4000/addmovie',[movieimage , moviename , moviecast , movieplot , moviegenre])
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        this.state.createresponse = response.status;
                    }
                    else
                    {
                        this.state.createfailure = "Error";
                    }
                })
                .catch(error => {
                    this.state.createfailure = "error";
                })

        },

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
                createmovie({commit}, movieimage, moviename ,moviecast , movieplot , moviegenre) {
                    commit('createmoviemut',movieimage, moviename ,moviecast , movieplot , moviegenre);
                },
            },


});
