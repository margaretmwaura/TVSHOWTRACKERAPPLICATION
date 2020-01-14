<template>
    <div class="grid-frame">
        <div class="grid-container">
            <div class="grid-x">
                <div class="cell medium-1 large-1 small-1"></div>
                <div class="cell medium-1 small-1 large-1">
                    <p id="userid"> {{movie.moviename}}</p>
                </div>
                <div class="cell medium-1 small-1 large-1">
                    <p id="id"> {{movie.moviegenre}}</p>
                </div>
                <div class="cell medium-3 small-3 large-3">
                    <p id="title">{{movie.moviecast}}</p>
                </div>
                <div class="cell medium-5 small-5 large-5">
                    <p id="body">{{movie.movieplot}}</p>
                </div>
                <div class="cell medium-1 large-1 small-1"></div>
            </div>

            <div class="grid-x">
                <div class="cell medium-12 large-12 small-12">
                    <input v-model="comments" placeholder="Place your comments">
                    <button onclick="addcomment"></button>
                </div>
                <div class="cell medium-12 large-12 small-12">
                    <input v-model="rating" placeholder="Place your comments">
                    <button onclick="addrating"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Movie",
        data() {
            return {
                comments : '',
                rating : ' '
            }
        },
        props: {
            movie: Array,
        },
        methods :{
            addcomment()
            {

            },
            addrating()
            {

            }
        }
    }
</script>

<style scoped>
</style>
