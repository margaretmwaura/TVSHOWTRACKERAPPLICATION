<template>
    <div class="grid-frame">
        <div class="grid-container">
            <div class="grid-container" id="top">
                {{moviename}} - {{moviegenre}}
                <br>
            </div>
            <div class="grid-x grid-container grid-margin-x" id="moviedits">
                <div class="cell medium-12 large-6 small-12" id="moviedits_im">
                    <img :src="`../../public/images/${movieimagesres}`"/>
                </div>
                <div class="cell medium-12 large-6 small-12" id="moviedits_n">
                  {{movieplot}}
                    <br>
                    <br>
                    <p>Behold the cast :: {{moviecast}}</p>
                </div>
            </div>
            <div class="grid-x grid-margin-x" id="comments">
                <div class="cell medium-12 large-4 small-12" id="comments_input">
                    <p> Give us your feedback and rate it </p>
                    <div class="input-group">
                        <span class="input-group-label"> </span>
                        <input class="input-group-field" v-model="comments" placeholder="Place your comments" >
                        <div class="input-group-button">
                            <input type="submit" class="button" value="Submit" v-on:click="addcomment">
                        </div>
                    </div>
                    <p>Add your rating below between 1-5</p>
                    <div class="input-group">
                        <span class="input-group-label">1-5</span>
                        <input class="input-group-field" v-model="rating" placeholder="Place your rating" >
                        <div class="input-group-button">
                            <input type="submit" class="button" value="Submit" v-on:click="addrating">
                        </div>
                    </div>

                </div>
                <div class="cell medium-12 large-4 small-12" id="comments_peoples">
                    <h6>Other peoples reviews</h6>
                        <div v-for="comment in gettingcommentsandratings" :key="comment.id">
                            <div v-if="booleandeterminant(comment.id , movie.id)">
                                <li v-for="item in comment.comments" :key="item.id" style="list-style: none">
                                    <p>{{item.message}} sent one <span>{{item.time | date }}</span></p>
                                </li>
                                <p>Rating {{ratenum( comment.rate,  comment.num)}} </p>
                            </div>

                        </div>
                </div>
                <div class="cell medium-12 large-4 small-12" id="comments_subscribe">
                    <p>Subscribe</p>
                    <div class="input-group">
                        <span class="input-group-label"> </span>
                        <input class="input-group-field" v-model="email" placeholder="enter your email" >
                        <div class="input-group-button">
                            <input type="submit" class="button" value="Submit" @click="subscribe">
                        </div>
                    </div>
                    <router-link :to="{ name: 'Edit', params: { movie: this.movie } }" v-if="checkingtoken" tag="button"> Edit</router-link>
                    <button @click="deletemovie" v-if="checkingtoken">Delete Movie</button>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import CommentsAndRatings from "./CommentsAndRatings.vue";
    import notificationmixin from "../Mixins/notificationmixin";
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
            checkingtoken()
            {
                if(this.currentuser !== ' ')
                {
                    console.log("The Token is present " + this.currentuser);
                    this.check = true;
                    return true;
                }
                else
                {
                    console.log("The Token is absent" + this.currentuser);
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
                    path: '/',
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
        },
        watch: {
            '$store.state.subsciberesponse' : function () {
                console.log("Susbcribing");
                this.informwithnotification("Success" , "You are subscribed now");
                this.$store.dispatch('clearsubscriptionresponse');
                console.log("Store has changed");

            },
            '$store.state.subscribefail' : function () {
                console.log("Not subscribed");
                this.informwithnotification("Fail" , "You havent been added to the subscription list");
                this.$store.dispatch('clearsubscriptionfailure');
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
        padding-top: 2%;
       &_im
       {
           img
           {
               width: 100%;
               height: 100%;
               object-fit: cover;
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
            padding-top: 2%;
            text-align: center;
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
            padding-top: 3%;
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
</style>
