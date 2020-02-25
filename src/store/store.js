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
        signup_response : ' ',
        signup_failure : ' ',
        login_response : ' ',
        login_failure : ' ',
        create_response : ' ',
        create_failure : ' ',
        edit_response : ' ',
        edit_failure : ' ',
        delete_response : ' ',
        delete_failure : ' ',
        subscibe_response : ' ',
        subscribe_fail : ' ',
    },
    mutations: {
        create_user(first_name ,last_name ,password) {
            axios
                .post('http://localhost:4000/signup',[first_name,last_name,password])
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        this.state.token = response.data.token;
                        console.log("The token gotten from signup " + this.state.token);
                        this.state.signup_response = response.status;
                    }
                })
                .catch(error => {
                    this.state.signup_failure = "error";
                })

        },
        login_user_mut(email , password) {
            axios
                .post('http://localhost:4000/login',[email,password])
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        this.state.token = response.data.token;
                        console.log("The token gotten from Login " + this.state.token);
                        this.state.login_response = response.status;
                    }
                    if(code === 403)
                    {
                        this.state.login_failure = "Error";
                    }
                })
                .catch(error => {
                    this.state.login_failure = "error";
                })

        },
        create_movie_mut(url,movie_name, movie_genre,movie_cast,movie_plot,movie_image,movieSeason)
        {
            axios
                .post('http://localhost:4000/movie_details',[url,movie_name, movie_genre,movie_cast,movie_plot,movie_image,movieSeason],{
                    headers: {
                        'Authorization': 'Bearer ' + this.state.token
                    }
                })
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        this.state.create_response = "Sucess";
                        console.log("The store state " + this.state.create_response);
                        console.log("Creating movies was a success + the response " + response.data.param);
                        let passed = JSON.parse(response.data.param);
                        console.log("This is the passed data " + passed);
                        this.state.movies = [];
                        this.state.movies = passed;
                    }
                })
                .catch(error => {
                    this.state.create_failure = "error";
                })
        },
        getAllMoviesmut()
        {
            axios
                .get('http://localhost:4000/all_movies')
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        console.log("Getting movies was a success + the response " + response.data.param);
                        let passed = JSON.parse(response.data.param);

                        this.state.movies = [];
                        this.state.movies = passed;
                        console.log("This is the passed data " + passed);
                    }
                })
                .catch(error =>
                {
                })
        },
        add_comment_mut(id,comment)
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
        add_rating_mut(id,rate)
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
        getallCommentsAndRatingsMut()
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
        delete_movie_comments_and_ratings_mut({context},id)
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
                        this.state.delete_response = "Was a sucess"
                    }
                })
                .catch(error =>
                {
                    this.state.delete_failure = "It failed"
                })
        },
        addSubscriberMut(id,email)
        {
            axios
                .post('http://localhost:4000/newsubsriber',[id,email])
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        this.state.subscibe_response = "Success"
                    }
                    else
                    {
                        this.state.subscribe_fail = "Fialed"
                    }
                })
                .catch(error =>
                {
                    this.subscribe_fail = "Failed"
                })
        },
        edit_movie_mut(movieid,url,movie_name, movie_genre,movie_cast,movie_plot,movie_image,movieSeason)
        {
            axios
                .post('http://localhost:4000/movie_details_edit' , [movieid,url,movie_name, movie_genre,movie_cast,movie_plot,movie_image,movieSeason],{
                    headers: {
                        'Authorization': 'Bearer ' + this.state.token
                    }
                })
                .then(response => {
                    var code = response.status;
                    if(code === 200)
                    {
                        console.log("Getting movies was a success + the response " + response.data.param);
                        this.state.edit_response = "Movieeditted"
                    }
                })
                .catch(error =>
                {
                    this.state.edit_failure = "It failed"
                })
        },
        get_subscribed_mut({context},email)
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

    },
        getters:
            {
                current_user: state => {
                    return state.token
                },
                gettingMovies: state => {
                    return state.movies
                },
                getting_comments_and_ratings: state => {
                    return state.commnra
                },
                get_subscriptions: state => {
                    return state.subscribed
                }

            },
        actions:
            {
                signing_up_users({commit}, first_name , last_name , password) {
                    commit('create_user',first_name,last_name,password);
                },
                login_users({commit}, email, password) {
                    commit('login_user_mut',email,password);
                },
                create_movie({commit}, url,movie_name, movie_genre,movie_cast,movie_plot,movie_image,movieSeason)
                {
                    commit('create_movie_mut',url,movie_name, movie_genre,movie_cast,movie_plot,movie_image,movieSeason);
                },
                getAllMovies({commit})
                {
                    commit('getAllMoviesmut');
                },
                add_rating({commit},id,rate)
                {
                    commit('add_rating_mut',id,rate);
                },
                add_comment({commit},id,comment)
                {
                    commit('add_comment_mut',id,comment);
                },
                getAllCommentsAndRatings({commit})
                {
                    commit('getallCommentsAndRatingsMut');
                },
                delete_movie_comments_and_ratings({ context, commit},id)
                {
                    commit('delete_movie_comments_and_ratings_mut',id);
                },
                addSubscriber({commit} , id ,email)
                {
                    commit('addSubscriberMut',id,email)
                },
                edit_movie({commit} , movieid,url,movie_name, movie_genre,movie_cast,movie_plot,movie_image,movieSeason)
                {
                    commit('edit_movie_mut' ,movieid,url,movie_name, movie_genre,movie_cast,movie_plot,movie_image,movieSeason)
                },
                logout({commit})
                {
                    commit('logout_mut')
                },
                get_subscribed({ context, commit},email)
                {
                    commit('get_subscribed_mut',email)
                },

            },


});
