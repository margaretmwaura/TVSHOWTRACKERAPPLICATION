<template>
    <div>
        <div>

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
                            <button>Create account</button>
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
    export default {
        data() {
            return {
                moviename : " ",
                moviecast : " ",
                movieplot : " ",
                moviegenre : " ",
                movieimage : " ",
                movieimagesres : " "
            }
        },
        computed : {
            ...mapGetters([
                'currentuser',
                // ...
            ]),
        },

        methods: {
            create() {
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
                this.$store.dispatch('createmovie',[this.moviename, this.moviecast,this.movieplot,this.moviegenre,this.movieimagesres]);

            }
        },

    }
</script>

<style scoped>

</style>
