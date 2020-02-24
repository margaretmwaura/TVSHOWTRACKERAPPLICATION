<template>
    <div>
        <div>

            <form v-on:submit.prevent="create" enctype="multipart/form-data">
                <p> Add a new Movie to the list of movies</p>
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
                            <label>Movie URL
                                <input type="text" v-model="movieUrl">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <label>Movie Name
                                <input type="text" v-model="movieName">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <label>Movie Cast
                                <input type="text" v-model="movieCast">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <label>Movie genre
                                <input type="text" v-model="movieGenre">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <label>Movie Plot
                                <input type="text" v-model="moviePlot">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <label>Latest Season
                                <input type="text" v-model="movieSeason">
                            </label>
                        </div>
                        <div class="cell medium-12 large-12 small-12">
                            <button class="primary button expanded" v-bind:disabled="disabled">Add Movie</button>
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
                movieName : " ",
                movieCast : " ",
                moviePlot : " ",
                movieGenre : " ",
                movieImage : " ",
                movieImagesRes : " ",
                movieUrl:" ",
                movieSeason:" ",
                disabled : true
            }
        },
        computed : {
            ...mapGetters([
                'current_user',
                // ...
            ]),
        },
        methods: {
            create() {
                console.log("The data i am passing : " + this.movieName + this.movieCast + this.moviePlot + this.movieGenre);
                const fb = new FormData();
                fb.append('image',this.movieImage);
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
                            this.movieImagesRes = response.data;
                            console.log("This is the image name stored " + this.movieImagesRes);
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
                this.movieImage = event.target.files[0];
                console.log(this.movieImage)
            },
            uploadMovie()
            {
                const analytics = firebase.analytics();
                analytics.logEvent('create',"Event creation");

                if(this.movieName !== " " || this.movieGenre !== " " || this.movieCast !== " " || this.moviePlot !== " " || this.movieImagesRes !== " ")
                {
                    this.$store.dispatch('create_movie',[this.movieUrl,this.movieName, this.movieGenre,this.movieCast,this.moviePlot,this.movieImagesRes,this.movieSeason]);
                    this.movieName = " ";
                    this.movieGenre = " ";
                    this.movieCast = " ";
                    this.moviePlot = " ";
                }
                else
                {
                    this.infor_with_notification("Error" , "The details entered are insufficient");
                }

            },
        },
        mixins: [notificationmixin],

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
