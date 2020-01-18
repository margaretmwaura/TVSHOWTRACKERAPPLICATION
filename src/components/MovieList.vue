<template>
        <div >
<!--           div Columns: <input v-model.number="numberOfColumns">-->
            <ul :style="gridStyle" class="card-list">
                <li v-for="(card, index) in cards" class="card-item">
                    {{ index + 1 }}
                </li>
            </ul>
            <button @click="addCard">
                Add card
            </button>
        </div>
</template>

<script>

    import Movie from "./Movie.vue";
    import {mapGetters, mapState} from 'vuex'
    export default {
        // components: {
        //     Movie,
        // },
        // data() {
        //     return {
        //         search:''
        //     }
        // },
        // computed :{
        //     ...mapGetters([
        //         'gettingMovies',
        //         'currentuser',
        //         'gettingcommentsandratings'
        //         // ...
        //     ]),
        //     filtertedmovies : function () {
        //         return this.gettingMovies.filter((movie) =>{
        //                 return movie.moviename.match(this.search)
        //             }
        //         )
        //     }
        // },
        // methods :{
        //
        // },
        // mounted() {
        //     this.$store.dispatch('getAllMovies');
        //     this.$store.dispatch('getAllCommentsAndRatings');
        // }

        data() {
            return {
                cards: [1, 2, 3, 4],
                numberOfColumns: 3,
            }
        },
        computed: {
            gridStyle() {
                return {
                    gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
                }
            },
        },
        methods: {
            addCard() {
                this.cards.push('new-card')
            },
        },
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

    body {
        background: #20262E;
        padding: 20px;
        font-family: Helvetica;
    }

    #app {
        background: #fff;
        border-radius: 4px;
        padding: 20px;
        transition: all 0.2s;
    }

    ul {
        list-style-type: none;
    }
</style>

