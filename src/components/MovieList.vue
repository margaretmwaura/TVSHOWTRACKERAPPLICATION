<template>
        <div>
            <div>
                <input type="text" v-model="search" placeholder="Seach Movie">
                <div v-for="item in filtertedmovies" :key="item.id">
                    <Movie :movie="item"> </Movie>
                </div>
            </div>

        </div>
</template>

<script>

    import Movie from "./Movie.vue";
    import {mapGetters, mapState} from 'vuex'
    export default {
        components: {
            Movie,
        },
        data() {
            return {
                search:''
            }
        },
        computed :{
            ...mapGetters([
                'gettingMovies',
                'currentuser',
                'gettingcommentsandratings'
                // ...
            ]),
            filtertedmovies : function () {
                return this.gettingMovies.filter((movie) =>{
                        return movie.moviename.match(this.search)
                    }
                )
            }
        },
        methods :{

        },
        mounted() {
            this.$store.dispatch('getAllMovies');
            this.$store.dispatch('getAllCommentsAndRatings');
        }

    }
</script>

<style lang="scss" >
    .card-list {
        display: grid;
        grid-gap: 1em;
    }

    .card-item {
        background-color: dodgerblue;
        padding: 2em;
    }

    ul {
        list-style-type: none;
    }
</style>

