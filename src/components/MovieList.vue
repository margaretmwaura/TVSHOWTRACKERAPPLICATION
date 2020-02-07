<template>
    <div class="grid-container small-12 large-12">
        <div class="grid-x" id="intro">
            <div class="cell medium-1 large-1 small-0">
            </div>
            <div class="cell medium-10 large-10 small-12" id="intro_message">
                <h5>Movies and Series</h5>
                <p>
                    To offer an idea of just how crowded the rest of the 2019 film and TV calendar is,
                    we've rounded up a comprehensive list of the biggest (and hopefully best) releases t
                    hat will be competing for your attention for the remainder of the year. From superhero action
                    thrillers to down-to-earth dramas and everything in between, here are all the movies and TV shows
                    that will blow you away in 2019
                    <input type="text" v-model="search" placeholder="Seach Movie">
                </p>
            </div>
            <div class="cell medium-1 large-1 small-0"></div>
        </div>
        <ul :style="this.gridStyle" class="card-list">
            <li v-for="(card, index) in filtertedmovies" class="card-item">
                <div class="grid-x grid-container" v-on:click="moveToFullInfo(card)">
                    <div class="cell medium-1 large-1 small-0">

                    </div>

                    <div class="cell medium-12 large-10 small-12">
                        <div class="grid-y" id="content">
                            <div class="cell medium-2 large-2 small-2 " id="content_title">
                                <p>{{card.moviename}} - {{card.moviegenre}}</p>
                            </div>
                            <div class="cell medium-10 large-10 small-10 " id="content_banner">
                                <img :src="`../../public/images/${card.movieimag}`"/>
                                <div class="overlay">
                                    <div class="text" id="overFlowLinks">
                                        <p >Watch the Movie pal</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="cell medium-1 large-1 small-0">

                    </div>
                </div>
            </li>
        </ul>

        <div id="video_dits" class="grid-x">
            <div class="cell medium-12 large-6 small-12" id="video_dits_vidoe">
                <iframe width="100%" height="315px" src="https://www.youtube.com/embed/Qz65no3WnJk?autoplay=1&mute=1"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                </iframe>
            </div>
            <div class="cell medium-12 large-6 small-12" id="video_dits_message">
                <p>
                    In the 1988 Tom Hanks film Big, a 12-year-old boy named Josh Baskin (David Moscow)
                    changes his life forever to impress an older girl. After being told that he’s too short for a
                    carnival ride, he enters a strange arcade machine and earnestly wishes to be “big.” The following
                    day,
                    Josh wakes up as a 30-year-old man (played by Hanks), whose initial confusion about the
                    corporeal switch later gives way to comedic hijinks and wholesome reflection.
                </p>
            </div>
        </div>

    </div>
</template>

<script>

    import Movie from "./Movie.vue";
    import CommentsAndRatings from "./CommentsAndRatings";
    import {mapGetters, mapState} from 'vuex'

    export default {
        components: {
            Movie,
            CommentsAndRatings,
        },
        data() {
            return {
                search: '',
                cards: [1, 2, 3, 4],
                numberOfColumns: 3,
                img:''
            }
        },
        computed: {
            ...mapGetters([
                'gettingMovies',
                'currentuser',
                'gettingcommentsandratings'
                // ...
            ]),
            filtertedmovies: function () {
                return this.gettingMovies.filter((movie) => {
                        return movie.movieplot.match(this.search)
                    }
                )
            },
            gridStyle: function () {
                return {
                    gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
                }
            },
        },
        methods: {
            onResize() {
                if (window.innerWidth < 1000) {
                    this.numberOfColumns = 1;
                    console.log("Window size is " + window.innerWidth);
                    console.log("CHnaged value " + this.numberOfColumns);
                    console.log("Tab")
                } else {
                    this.numberOfColumns = 3;
                    console.log("Window size is " + window.innerWidth);
                    console.log("CHnaged value " + this.numberOfColumns);
                    console.log("Mobile")

                }
            },
            booleandeterminant(one, two) {
                if (one === two) {

                    console.log("This two are very equal " + two + " " + one);
                    return true;
                } else {

                    console.log("This two are very different " + two + " " + one);
                    return false;
                }
            },
            moveToFullInfo(movie) {
                console.log("We want to see the movie" + movie.moviename);
                this.$router.push({
                    name: 'Info',
                    params: {
                        movie: movie,
                    }
                });
            },
            getImgUrl(image) {
                var images = require.context('../../public/images', false, /\.jpg$/);
                console.log("Image is " + images);
                return images('./' + image)
            }
        },
        mounted() {
            this.$store.dispatch('getAllMovies');
            this.$store.dispatch('getAllCommentsAndRatings');
            window.addEventListener('resize', this.onResize)
        },
        created() {

        },

        beforeDestroy() {
            window.addEventListener('resize', this.onResize)
        },

    }

</script>

<style scoped lang="scss">
    @import "../../foundation/css/app.css";
    @import "../../foundation/css/foundation.css";

    .card-list {
        display: grid;
        grid-gap: 1em;
    }

    ul {
        list-style-type: none;
    }

    #intro {

        &_message {
            text-align: center;
            padding-top: 5%;
            padding-bottom: 5%;
            font-family: Serif;

            h5 {
                font-style: italic;
                letter-spacing: 0.4em;
            }

            p {
                font-weight: bold;
                font-size: 16px;
            }

        }
    }

    #content {

        height: 400px;

        &_title {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
        }

        &_banner {
            position: relative;
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                display: block;
            }
            .overlay
            {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                height: 100%;
                width: 100%;
                opacity: 0;
                transition: .5s ease;
                background-color: #FFF0F5;
            }

            .text {

                border-radius: 50%;
                height: 200px;
                width: 200px;
                color: #ffffff;
                font-size: 17px;
                position: absolute;
                background-color: crimson;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                text-align: center;

                p{
                    color:white;
                    font-weight:bold;
                    margin-top:40%;
                }
            }

            #overFlowLinks  a:hover
            {
                color: white;
                border-bottom: 15px solid white;
            }

        }

        &_banner:hover .overlay
        {
            opacity: .9;
        }

    }

    #video_dits {

        background-color: antiquewhite;
        padding-top: 5%;
        padding-bottom: 5%;

        &_vidoe
        {

        }
        &_message {

            padding-top: 3%;
            text-align: center;
            font-family: Serif;
            font-weight: bold;
            font-size: 16px;
        }

    }

</style>

