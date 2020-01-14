<template>
    <div id="app">
            <input type="text" v-model="search" placeholder="Seach Blogs">
            <div v-for="item in filtertedmovies" :key="item.id">
                <Movie :movie="item"> </Movie>
            </div>

    </div>
</template>

<script>

    import Movie from "./Movie.vue";
    import  {mapState} from 'vuex'
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
            ...mapState(["movies","token","commnra"]),
            filtertedmovies : function () {
                return this.movies.filter((movie) =>{
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
    #app {

        li{
            list-style: none;
        }
    }
</style>

