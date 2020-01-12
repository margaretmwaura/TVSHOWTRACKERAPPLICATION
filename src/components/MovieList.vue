<template>
    <div id="app">
        <ol v-for="item in movies" :key="item.moviename">
            <li v-for="sing in item":key="item.id">
            <Movie :movie="sing">{{item}}</Movie>
           </li>
        </ol>
    </div>
</template>

<script>

    import Movie from "./Movie.vue";
    import  {mapState} from 'vuex'
    export default {
        components: {
            Movie
        },
        data() {
            return {

            }
        },
        computed : mapState(["movies","token"]),
        mounted() {
            this.$store.dispatch('getAllMovies');
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

