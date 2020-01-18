<template>
    <div>
        <form v-on:submit.prevent="create">
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
                    <div class="cell medium-12 large-12 small-12">
                        <label>Name
                            <input type="text" v-model="firstname">
                        </label>
                    </div>
                    <div class="cell medium-12 large-12 small-12">
                        <label>Email
                            <input type="text" v-model="email">
                        </label>
                    </div>
                    <div class="cell medium-12 large-12 small-12">
                        <label>Password
                            <input type="text" v-model="password">
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
    import {mapGetters, mapState} from 'vuex'
    export default {
        data() {
            return {
                firstname : " ",
                email : " ",
                password: " ",
            }
        },
        computed :  {
            ...mapGetters([
                'gettingMovies',
                'currentuser',
                'gettingcommentsandratings'
                // ...
            ]),
        },
        methods: {
            create() {
                console.log("The data i am passing : " + this.firstname + this.email + this.password);
                this.$store.dispatch('signingupusers',[this.firstname, this.email,this.password]);
            }
        },

    }
</script>

<style scoped>

</style>
