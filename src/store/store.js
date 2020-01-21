import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import componentNormalizer from "vue-loader/lib/runtime/componentNormalizer";


Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        token : ' ',
        movies : [],
        commnra : [],
        subscribed : [],
        signupresponse : ' ',
        signupfailure : ' ',
        loginresponse : ' ',
        loginfailure : ' ',
        createresponse : ' ',
        createfailure : ' ',
        editresponse : ' ',
        editfailure : ' ',
        deleteresponse : ' ',
        deletefailure : ' ',
        subsciberesponse : ' ',
        subscribefail : ' ',
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
                        console.log("The token gotten from signup " + this.state.token);
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
                        console.log("The token gotten from Login " + this.state.token);
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
                        'Authorization': 'Bearer ' + this.state.token
                    }
                })
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        this.state.createresponse = "Sucess";
                        console.log("The store state " + this.state.createresponse);
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
        addCommentmut(id,comment)
        {
            axios
                .post('http://localhost:4000/comments',[id,comment])
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        console.log("Getting movies was a success + the response " + response.data.param);
                        let passed = JSON.parse(response.data.param);
                        console.log("This is the passed data " + passed);
                        this.state.commnra = [];
                        this.state.commnra = passed;
                    }
                })
                .catch(error =>
                {
                })
        },
        addRatingmut(id,rate)
        {
            axios
                .post('http://localhost:4000/ratings',[id,rate])
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        console.log("Getting movies was a success + the response " + response.data.param);
                        let passed = JSON.parse(response.data.param);
                        console.log("This is the passed data " + passed);
                        this.state.commnra = [];
                        this.state.commnra = passed;
                    }
                })
                .catch(error =>
                {
                })
        },
        getallCommentsAndRatingsmut()
        {
            axios
                .get('http://localhost:4000/commentsandratings')
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        console.log("Getting comments and ratings was a success + the response " + response.data.param);
                        let passed = JSON.parse(response.data.param);
                        console.log("This is the passed data " + passed);
                        this.state.commnra = [];
                        this.state.commnra = passed;
                    }
                })
                .catch(error =>
                {
                })
        },
        deletemoviecommentsandratingsmut({context},id)
        {
            console.log("This is the id that is being passed across " + id);
            axios
                .delete('http://localhost:4000/deletemovie/' + id,{
                    headers: {
                        'Authorization': 'Bearer ' + this.state.token
                    }
                })
                .then(response => {
                    const code = response.status;
                    if(code === 200)
                    {
                        console.log("Deleting comments and ratings was a success + the response " + response.data.commnra);
                        let passedc = JSON.parse(response.data.commnra);
                        console.log("This is the passed data " + passedc);
                        this.state.commnra = [];
                        this.state.commnra = passedc;

                        console.log("Getting movies + the response " + response.data.movies);
                        let passedm = JSON.parse(response.data.movies);
                        console.log("This is the passed data " + passedm);
                        this.state.movies = [];
                        this.state.movies = passedm;
                        this.state.deleteresponse = "Was a sucess"
                    }
                })
                .catch(error =>
                {
                    this.state.deletefailure = "It failed"
                })
        },
        addSubscribermut(id,email)
        {
            axios
                .post('http://localhost:4000/newsubsriber',[id,email])
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        this.state.subsciberesponse = "Success"
                    }
                    else
                    {
                        this.state.subscribefail = "Fialed"
                    }
                })
                .catch(error =>
                {
                    this.subscribefail = "Failed"
                })
        },
        editamoviemut(movieid,moviename, moviegenre,moviecast,movieplot,movieimage)
        {
            axios
                .post('http://localhost:4000/movieditsedit' , [movieid,moviename, moviegenre,moviecast,movieplot,movieimage],{
                    headers: {
                        'Authorization': 'Bearer ' + this.state.token
                    }
                })
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        console.log("Getting movies was a success + the response " + response.data.param);
                        // let passed = JSON.parse(response.data.param);
                        // console.log("This is the passed data " + passed);
                        // this.state.movies = [];
                        // this.state.movies = passed;
                        this.state.editresponse = "Movieeditted"
                    }
                })
                .catch(error =>
                {
                    this.state.editfailure = "It failed"
                })
        },
        logoutmut()
        {
            this.state.token = ' '
        },
        clearcreatemovieresponsemut()
        {
            this.state.createresponse = ' '
        },
        clearfailuremovieresponsemut()
        {
            this.state.createfailure = ' '
        },
        cleareditmovieresponsemut()
        {
            this.state.editresponse = ' '
        },
        cleareditfailureresponsemut()
        {
          this.state.editfailure = ' '
        },
        clearsubscriptionresponsemut()
        {
            this.state.subsciberesponse = ' '
        },
        clearsubscriptionfailuremut()
        {
            this.state.subscribefail = ' '
        },
        getsubscribedmut({context},email)
        {
            axios
                .get('http://localhost:4000/usersubscriptions/' + email)
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        console.log("Getting movies was a success + the response " + response.data.param);
                        let passed = JSON.parse(response.data.param);
                        console.log("This is the passed data " + passed);
                        this.state.subscribed = [];
                        this.state.subscribed = passed;
                    }
                })
                .catch(error =>
                {
                })
        },
        clearsubscribemut()
        {
            this.state.subscribed = ' '
        }

    },
        getters:
            {
                currentuser: state => {
                    return state.token
                },
                gettingMovies: state => {
                    return state.movies
                },
                gettingcommentsandratings: state => {
                    return state.commnra
                },
                getsubscriptions: state => {
                    return state.subscribed
                }

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
                addrating({commit},id,rate)
                {
                    commit('addRatingmut',id,rate);
                },
                addcomment({commit},id,comment)
                {
                    commit('addCommentmut',id,comment);
                },
                getAllCommentsAndRatings({commit})
                {
                    commit('getallCommentsAndRatingsmut');
                },
                deletemoviecommentsandratings({ context, commit},id)
                {
                    commit('deletemoviecommentsandratingsmut',id);
                },
                addSubscriber({commit} , id ,email)
                {
                    commit('addSubscribermut',id,email)
                },
                editamovie({commit} , movieid,moviename, moviegenre,moviecast,movieplot,movieimage)
                {
                    commit('editamoviemut' ,movieid,moviename, moviegenre,moviecast,movieplot,movieimage)
                },
                logout({commit})
                {
                    commit('logoutmut')
                },
                clearcreatemovieresponse({commit})
                {
                    commit('clearcreatemovieresponsemut')
                },
                clearfailuremovieresponse({commit})
                {
                    commit('clearfailuremovieresponsemut')
                },
                cleareditmovieresponse({commit})
                {
                    commit('cleareditmovieresponsemut')
                },
                cleareditfailureresponse({commit})
                {
                    commit('cleareditfailureresponsemut')
                },
                clearsubscriptionresponse({commit})
                {
                    commit('clearsubscriptionresponsemut')
                },
                clearsubscriptionfailure({commit})
                {
                    commit('clearsubscriptionfailuremut')
                },
                getsubscribed({ context, commit},email)
                {
                    commit('getsubscribedmut',email)
                },
                clearsubscribe({commit})
                {
                    commit('clearsubscribemut')
                }

            },


});
