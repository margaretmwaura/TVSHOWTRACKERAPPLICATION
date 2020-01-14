<template>
    <div id="app">
            <input type="text" v-model="search" placeholder="Seach Blogs">
            <li v-for="item in filtertedmovies":key="item.id">
            <Movie :movie="item"></Movie>
            </li>
<!--           <li v-for="item in commnra" :key="item.id">-->
<!--               <CommentsAndRatings :comnradat="item"></CommentsAndRatings>-->
<!--           </li>-->
    </div>
</template>

<script>

    import Movie from "./Movie.vue";
    import CommentsAndRatings from "./CommentsAndRatings.vue";
    import  {mapState} from 'vuex'
    export default {
        components: {
            Movie,
            CommentsAndRatings
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

