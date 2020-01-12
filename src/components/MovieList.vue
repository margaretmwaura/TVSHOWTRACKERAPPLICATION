<template>
    <div id="app">
        <li v-for="item in movie" :key="item.id">
            <Movie :movie="item"> </Movie>
        </li>
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
        computed : mapState(["movie","token"]),
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

