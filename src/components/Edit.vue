<template>
    <div>
        <div>

            <form v-on:submit.prevent="edit" enctype="multipart/form-data">

                <p> Edit a movie</p>
                <div class="grid-container">
                    <div class="grid-x grid-padding-x">
                        <div class="cell medium-12 large-12 small-12">
                            <label>Movie Image
                                <input type="file" @change="onFileSelected">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <button class="button">Upload image</button>
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
                            <button class="primary button expanded" v-bind:disabled="disabled">Edit Movie</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>

    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from "axios";
    import firebase from "firebase";
    import notificationmixin from "../Mixins/notificationmixin";

    export default {

        data() {
            return {
                movie:" ",
                moviename : " ",
                moviecast : " ",
                movieplot : " ",
                moviegenre : " ",
                movieimage : " ",
                movieimagesres : " ",
                movieid:" ",
                disabled : true
            }
        },
        computed : {
            ...mapGetters([
                'currentuser',
                // ...
            ]),
        },
        methods: {
            edit() {
                console.log("The data i am passing : " + this.moviename + this.moviecast + this.movieplot + this.moviegenre);
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
                analytics.logEvent('create',"Event creation");

                if(this.moviename !== " " || this.moviegenre !== " " || this.moviecast !== " " || this.movieplot !== " " || this.movieimagesres !== " ")
                {
                    this.$store.dispatch('editamovie',[this.movieid,this.moviename, this.moviegenre,this.moviecast,this.movieplot,this.movieimagesres]);
                    this.moviename = " ";
                    this.moviegenre = " ";
                    this.moviecast = " ";
                    this.movieplot = " ";
                }
                else
                {
                    this.informwithnotification("Error" , "The details entered are insufficient");
                }

            },
        },
        watch: {
            '$store.state.createresponse' : function () {
                console.log("A movie has been created");
                this.informwithnotification("Success" , "Movie has been created");
                this.$store.dispatch('clearcreatemovieresponse');
                console.log("Store has changed");

            },
            '$store.state.createfailure' : function () {
                console.log("A movie has not been created");
                this.informwithnotification("Fail" , "Movie has been not been created");
                this.$store.dispatch('clearfailuremovieresponse');
            }

        },
        mixins: [notificationmixin],

        created() {
            console.log("Edit has been called");
            this.movie = this.$route.params.movie;
            this.moviename = this.$route.params.movie.moviename;
            this.moviecast = this.$route.params.movie.moviecast;
            this.movieplot = this.$route.params.movie.movieplot;
            this.moviegenre = this.$route.params.movie.moviegenre;
            this.movieimage = this.$route.params.movie.movieimage;
            this.movieid = this.$route.params.movie.id;

        },

    }
</script>

<style scoped lang="scss">
    p{
        font-weight: bold;
        text-align: center;
        font-size: 17px;
    }
    label{
        font-size:15px;
    }
</style>
