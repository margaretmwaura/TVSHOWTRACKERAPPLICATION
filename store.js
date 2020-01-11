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
            },


});
