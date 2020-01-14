<template>
    <div class="grid-frame">
        <div class="grid-container">
            <div class="grid-x">
                <div class="cell medium-1 large-1 small-1"></div>
                <div class="cell medium-1 small-1 large-1">
                    <p id="userid"> {{movie.moviename}}</p>
                </div>
                <div class="cell medium-1 small-1 large-1">
                    <p id="genre"> {{movie.moviegenre}}</p>
                </div>
                <div class="cell medium-3 small-3 large-3">
                    <p id="title">{{movie.moviecast}}</p>
                </div>
                <div class="cell medium-5 small-5 large-5">
                    <p id="body">{{movie.movieplot}}</p>
                </div>
                <div class="cell medium-5 small-5 large-5">
                    <p id="id">{{movie.id}}</p>
                </div>
                <div class="cell medium-1 large-1 small-1"></div>
            </div>

            <div class="grid-x">
                <div class="cell medium-12 large-12 small-12">
                    <input v-model="comments" placeholder="Place your comments"/>
                    <button v-on:click="addcomment">Add comment</button>
                    <p>{{comments}}</p>
                </div>
                <div class="cell medium-12 large-12 small-12">
                    <input v-model="rating" placeholder="Place your comments" v-on:blur="addrating"/>
                    <p>{{rating}}</p>
                </div>
            </div>
        </div>
        <div v-for="comment in commnra" :key="comment.id">
            <CommentsAndRatings :comnradat="comment" v-if="booleandeterminant(comment.id , movie.id)"> </CommentsAndRatings>
        </div>

    </div>
</template>

<script>
    import {mapState} from "vuex";
    import CommentsAndRatings from "./CommentsAndRatings.vue";
    export default {
        name: "Movie",
        components : {
            CommentsAndRatings
        },
        data() {
            return {
                comments : '',
                rating : ' '
            }
        },
        computed :{
            ...mapState(["movies","token","commnra"]),
        },
        props: {
            movie: Array,
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
            }
        }
    }
</script>

<style scoped>
</style>
