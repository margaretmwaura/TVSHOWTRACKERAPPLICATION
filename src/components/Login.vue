<template>
    <div>
        <form v-on:submit.prevent="create">
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
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
                        <button>Login user</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
    import  {mapState} from 'vuex'
    export default {
        data() {
            return {
                email : " ",
                password: " ",
            }
        },
        computed : mapState(["token"]),
        methods: {
            create() {
                console.log("The data i am passing : " + this.email , this.password);
                this.$store.dispatch('loginusers',[this.email,this.password]);
            }
        },

    }
</script>

<style scoped>

</style>
