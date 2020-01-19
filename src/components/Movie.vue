<template>
    <div class="grid-frame">
        <div class="grid-container">
            <div class="grid-container" id="top">
                {{moviename}} - {{moviegenre}}
            </div>
            <div class="grid-x grid-container" id="moviedits">
                <div class="cell medium-6 large-6 small-12" id="moviedits_im">
                    <img :src="`../../public/images/${movieimagesres}`"/>
                </div>
                <div class="cell medium-6 large-6 small-12" id="moviedits_n">
                  {{movieplot}}
                    <br>
                    <br>
                    <p>Behold the cast :: {{moviecast}}</p>

                </div>

            </div>
            <div class="grid-x" id="comments">
                <div class="cell medium-4 large-4 small-4" id="comments_peoples">
                    <h6>Other peoples reviews</h6>
                        <div v-for="comment in gettingcommentsandratings" :key="comment.id">
                            <div v-if="booleandeterminant(comment.id , movie.id)">
                                <li v-for="item in comment.comments" :key="item.id" style="list-style: none">
                                    <p>{{item.message}} sent one <span>{{item.time | date }}</span></p>
                                </li>
                                <p>Rating {{ratenum( comment.rate,  comment.num)}}</p>
                            </div>

                        </div>
                </div>
                <div class="cell medium-4 large-4 small-4" id="comments_input">
                    <p>How is the show ? Give us your feedback . Get to rate it </p>
                    <input v-model="comments" placeholder="Place your comments"/>
                    <br>
                    <button v-on:click="addcomment">Add comment</button>
                    <br>
                    <p>Add your rating below</p>
                    <input v-model="rating" placeholder="Place your rating " v-on:blur="addrating"/>
                </div>
                <div class="cell medium-4 large-4 small-4" id="comments_subscribe">

                    <p>Get to know whenver there is a change in the show</p>

                    <input v-model="email" placeholder="enter your email">
                    <br>
                    <button @click="subscribe">Subscribe</button>
                    <br>
                    <br>
                    <router-link :to="{ name: 'Edit', params: { movie: this.movie } }">Navigate to Edit</router-link>
                    <br>
                    <button @click="deletemovie">Delete Movie</button>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import CommentsAndRatings from "./CommentsAndRatings.vue";
    export default {
        name: "Movie",
        components : {
            CommentsAndRatings
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
                moviename : ' ',
                moviecast : ' ',
                moviegenre : ' ',
                movieplot : ' ',
                movieimagesres : ' ',
                rate: ' ',
                num:' '
            }
        },
        computed :{
            ...mapGetters([
                'gettingMovies',
                'currentuser',
                'gettingcommentsandratings'
                // ...
            ]),
        },
        created() {
            console.log("Info has been called");

            this.movie = this.$route.params.movie;
            console.log("Details recevied " + this.movie);
            this.id = this.$route.params.movie.id;
            this.moviename = this.$route.params.movie.moviename;
            this.moviecast = this.$route.params.movie.moviecast;
            this.moviegenre = this.$route.params.movie.moviegenre;
            this.movieplot = this.$route.params.movie.movieplot;
            this.movieimagesres = this.$route.params.movie.movieimag;
        },
        methods :{
            addcomment()
            {
               console.log("The comment you have added " + this.comments);
                this.$store.dispatch('addcomment',[this.movie.id,this.comments]);
            },
            addrating()
            {
               console.log("The rating you have added " + this.rating);
                this.$store.dispatch('addrating',[this.movie.id,this.rating]);
            },
            booleandeterminant(one , two) {
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
            deletemovie()
            {
                this.$store.dispatch('deletemoviecommentsandratings',this.movie.id);
                this.$router.push({
                    path: '/show',
                });
                console.log(this.movie.id)
            },
            subscribe()
            {
                this.$store.dispatch('addSubscriber',[this.movie.id, this.email]);
            },
            editamovie()
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
            ratenum : function ( num , numtwo)
            {
                if(num !==0){
                    return (num/numtwo)
                }
                else
                {
                    return "There are no ratings yet";
                }

            }
        }
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
        padding-top: 0.5%;
       &_im
       {
           img
           {
               width: 100%;
               height: 100%;
           }
       }
        &_n
        {
            padding-top: 3%;
            text-align: center;
            font-family:Serif;
            font-weight: bold;
            font-size: 16px;
        }
    }

    #comments
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
                text-align: center;
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
                color: gray;
            }

            button
            {
                margin-top: 3%;
                color: white;
                background-color: indianred;
                padding: 10px;
            }
        }
        &_subscribe
        {
            padding-top: 3%;
            padding-left: 3%;
            text-align: center;
            p{
                font-weight: bold;
                color: gray;
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
</style>
