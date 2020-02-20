<template>
    <div class="grid-frame">
        <div class="grid-container">
            <div class="grid-container" id="top">
                {{movie_name}} - {{movie_genre}}
                <br>
            </div>
            <div class="grid-container" id="moviedits_n">
                {{movie_plot}}
                <br>
                <br>
                <p>Behold the cast :: {{movie_cast}}</p>
                <br>
                <p>Currently at Season :: {{movieSeason}}</p>
                <div id="comments_subscribe">
                    <p>Subscribe</p>
                    <div class="input-group">
                        <span class="input-group-label"> </span>
                        <input class="input-group-field" v-model="email" placeholder="enter your email" >
                        <div class="input-group-button">
                            <input type="submit" class="button" value="Submit" @click="subscribe">
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid-x grid-container grid-margin-x" id="moviedits">
                <div class="cell medium-12 large-6 small-12" id="moviedits_im">
                    <iframe width="100%" height="515" :src="movieUrl"
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                    </iframe>
                </div>
                <div class="cell medium-12 large-6 small-12" id="moviedits_comments_peoples">
                    <h6>Other peoples reviews</h6>
                    <div v-for="comment in getting_comments_and_ratings" :key="comment.id">
                        <div v-if="booleanDeterminant(comment.id , movie.id)">
                            <li v-for="item in comment.comments" :key="item.id" style="list-style: none">
                                <p>{{item.message}} sent on <span>{{item.time | date }}</span></p>
                            </li>
                            <div id="comments_input">
                                <p> Give us your feedback </p>
                                <div class="input-group">
                                    <span class="input-group-label"> </span>
                                    <input class="input-group-field" v-model="comments" placeholder="Place your comments" >
                                    <div class="input-group-button">
                                        <input type="submit" class="button" value="Submit" v-on:click="addComment">
                                    </div>
                                </div>
                            </div>
                            <p>Rating is :{{rateNum( comment.rate ,  comment.num  ) | truncate }} , you can rate below </p>
                        </div>
                    </div>
                    <star-rating @rating-selected="getUserRating($event)" :rating="rating" :star-size="30"> </star-rating>
                </div>
            </div>
            <div class="grid-container" id="with_perms" v-if="checkingToken">
                <router-link :to="{ name: 'Edit', params: { movie: this.movie } }" class="button">Edit Movie</router-link>
                <button @click="deleteMovie" class="button" id="with_perms_delete">Delete Movie</button>
            </div>

        </div>


    </div>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import CommentsAndRatings from "./CommentsAndRatings.vue";
    import notificationmixin from "../Mixins/notificationmixin";
    import firebase from "firebase";
    export default {
        name: "Movie",
        components : {
            CommentsAndRatings,
        },
        data() {
            return {
                comments : '',
                rating : ' ',
                email : ' ',
                movies: [],
                token: ' ',
                comnra: [],
                movie: ' ',
                id: ' ',
                movie_name : ' ',
                movie_cast : ' ',
                movie_genre : ' ',
                movie_plot : ' ',
                movie_images_res : ' ',
                movieUrl:" ",
                movieSeason:" ",
                rate: ' ',
                num:' ',
                rating: 0,
            }
        },
        computed :{
            ...mapGetters([
                'gettingMovies',
                'current_user',
                'getting_comments_and_ratings'
                // ...
            ]),
            checkingToken()
            {
                if(this.current_user !== ' ')
                {
                    console.log("The Token is present " + this.current_user);
                    this.check = true;
                    return true;
                }
                else
                {
                    console.log("The Token is absent" + this.current_user);
                    this.check = false;
                    return false
                }
            },
        },
        created() {
            console.log("Info has been called");

            this.movie = this.$route.params.movie;
            console.log("Details recevied " + this.movie);
            this.id = this.$route.params.movie.id;
            this.movie_name = this.$route.params.movie.movie_name;
            this.movie_cast = this.$route.params.movie.movie_cast;
            this.movie_genre = this.$route.params.movie.movie_genre;
            this.movie_plot = this.$route.params.movie.movie_plot;
            this.movie_images_res = this.$route.params.movie.movie_image;
            this.movieUrl=this.$route.params.movie.url.replace("watch?v=", "embed/");
            this.movieSeason= this.$route.params.movie.season;
        },
        methods :{
            addComment()
            {
               console.log("The comment you have added " + this.comments);
                this.$store.dispatch('add_comment',[this.movie.id,this.comments]);
            },
            addRating()
            {
               console.log("The rating you have added " + this.rating);
                this.$store.dispatch('add_rating',[this.movie.id,this.rating]);
            },
            booleanDeterminant(one , two) {
                if(one === two)
                {
                    console.log("This two are very equal " + two + " " + one);
                    return true;
                }
                else
                {
                    console.log("This two are very different " + two + " " + one);
                    return false;
                }
            },
            deleteMovie()
            {
                this.$store.dispatch('delete_movie_comments_and_ratings',this.movie.id);
                this.$router.push({
                    path: '/',
                });
                console.log(this.movie.id)
            },
            subscribe()
            {
                const analytics = firebase.analytics();
                analytics.logEvent('subscribe',"subscribed");
                this.$store.dispatch('addSubscriber',[this.movie.id, this.email]);
            },
            editMovie()
            {
                console.log("We want to edit the movie");
                this.$router.push({
                    path: '/edit',
                    params: {
                        editmovie: this.movie ,
                        // message: this.blog.message
                    }
                });
            },
            rateNum : function ( num , num_two)
            {
                if(num !==0){
                    return (num/num_two)
                }
                else
                {
                    return (0);
                }

            },
            getUserRating:function ($event) {
                this.rating = $event;
                console.log("This is the rating selected by the use " + this.rating);
                this.$store.dispatch('add_rating',[this.movie.id,this.rating]);
            }
        },
        mixins: [notificationmixin],
    }
</script>

<style scoped lang="scss">
    @import "../../foundation/css/app.css";
    @import "../../foundation/css/foundation.css";

    #top
    {
        padding-top: 5%;
        letter-spacing: 0.4em;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
    }
    #moviedits
    {

       &_im
       {

       }
        &_n
        {
            padding-top: 3%;
            text-align: center;
            font-family:Serif;
            font-weight: bold;
            font-size: 16px;

            star-rating{

            }
        }

        &_comments
        {
            &_peoples
            {
                p{
                    font-family:Serif;
                    font-weight: bold;
                    font-size: 16px;
                }
                h6
                {

                    padding-top: 3%;
                    font-weight: bold;
                    font-size: 18px;
                }

                span{
                    font-weight: normal;
                    font-size: 12px;
                    font-style: italic;
                }
            }

            &_input
            {
                text-align: center;
                padding-top: 3%;
                padding-left: 3%;

                p{
                    font-weight: bold;
                }

                button
                {
                    margin-top: 3%;
                    color: white;
                    background-color: indianred;
                    padding: 10px;
                }

                #indigo{
                    color : indigo;
                }
            }
            &_subscribe
            {
                padding-left: 3%;
                text-align: center;
                p{
                    font-weight: bold;
                }

                button
                {
                    margin-top: 3%;
                    color: white;
                    background-color: indianred;
                    padding: 10px;
                }

            }
        }
    }

    #with_perms
    {

        &_delete
        {
            color: white;
            background-color: indianred;
        }
    }

</style>
