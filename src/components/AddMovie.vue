<template>
    <div>
        <form v-on:submit.prevent="create">
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
                        <label>Movie Image
                            <input type="file" @change="onFileSelected">
                        </label>
                    </div>
                    <div class="cell medium-12 large-12 small-12">
                        <button>Create account</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
    import  {mapState} from 'vuex'
    const multer = require('multer');
    export default {
        data() {
            return {
                moviename : " ",
                moviecast : " ",
                movieplot : " ",
                moviegenre : " ",
                movieimage : " "
            }
        },
        computed : mapState(["token"]),
        methods: {
            create() {
                const fb = new FormData();
                fb.append('image',this.movieimage , this.movieimage.name);
                console.log("The data i am passing : " + this.moviename + this.moviecast + this.movieplot + this.moviegenre);
            },
            onFileSelected(event)
            {
             this.movieimage = event.target.files[0];
            }
        },

    }
</script>

<style scoped>

</style>
