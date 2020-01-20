<template>
    <div>
        <div>

            <br>
            <br>

            <form v-on:submit.prevent="create" enctype="multipart/form-data">
                <div class="grid-container">
                    <div class="grid-x grid-padding-x">
                        <div class="cell medium-12 large-12 small-12">
                            <label>Movie Image
                                <input type="file" @change="onFileSelected">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <button>Upload image</button>
                        </div>
                    </div>
                </div>
            </form>

            <form v-on:submit.prevent="uploadMovie">
                <div class="grid-container">
                    <div class="grid-x grid-padding-x">
                        <div class="cell medium-12 large-12 small-12">
                            <label>Movie Name
                                <input type="text" v-model="moviename">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <label>Movie Cast
                                <input type="text" v-model="moviecast">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <label>Movie genre
                                <input type="text" v-model="moviegenre">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <label>Movie Plot
                                <input type="text" v-model="movieplot">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <button class="primary button expanded" v-bind:disabled="disabled">Edit movie</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>

    </div>
</template>

<script>
    import axios from "axios";
    import firebase from "firebase";
    import movie from '../models/movie'
    import notificationmixin from "../Mixins/notificationmixin";
    export default {
        name: "EditAMovie",
        data() {
            return{
                movie : ' ',
                id : ' ',
                moviename : ' ',
                moviecast: ' ',
                moviegenre: ' ',
                movieplot: ' ',
                movieimagesres : ' ',
                disabled : true
            }
        },
        created() {
            console.log("Edit has been called");

            this.movie = this.$route.params.movie;
            this.id = this.$route.params.movie.id;
            this.moviename = this.$route.params.movie.moviename;
            this.moviecast = this.$route.params.movie.moviecast;
            this.moviegenre = this.$route.params.movie.moviegenre;
            this.movieplot = this.$route.params.movie.movieplot;
            this.movieimagesres = this.$route.params.movie.movieimag;
        },
        methods: {
            create() {
                const fb = new FormData();
                fb.append('image',this.movieimage);
                axios
                    .post('http://localhost:4000/addmovie',fb,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                    .then(response => {
                        var code = response.status;
                        if(code === 200)
                        {
                            console.log("The response " + response.data);
                            this.movieimagesres = response.data;
                            console.log("This is the image name stored " + this.movieimagesres)
                            this.disabled = false
                        }
                        else
                        {
                            console.log("The response " + response.data)
                        }
                    })
                    .catch(error => {
                    })

            },
            onFileSelected(event)
            {
                console.log(event);
                this.movieimage = event.target.files[0];
                console.log(this.movieimage)
            },
            uploadMovie()
            {
                const analytics = firebase.analytics();
                analytics.logEvent('create',"Event Editting");
                console.log("We are editting a movie");


                if(this.moviename !== " " || this.moviegenre !== " " || this.moviecast !== " " || this.movieplot !== " " || this.movieimagesres !== " ")
                {
                    this.$store.dispatch('editamovie', [this.id,this.moviename, this.moviegenre,this.moviecast,this.movieplot,this.movieimagesres]);
                }
                else {
                    this.informwithnotification("Error" , "The details entered are insufficient");
                }

            }
        },
        watch: {
            '$store.state.editresponse' : function () {
                console.log("A movie has been editted");
                this.informwithnotification("Success" , "Movie has been editted");
                this.$store.dispatch('cleareditmovieresponse');
                console.log("Store has changed");

            },
            '$store.state.editfailure' : function () {
                console.log("A movie has not been editted");
                this.informwithnotification("Fail" , "Movie has been not been editted");
                this.$store.dispatch('cleareditfailureresponse');
            }

        },
        mixins: [notificationmixin],
    }
</script>

<style scoped>

</style>
