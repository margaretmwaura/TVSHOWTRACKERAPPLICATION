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
                            <input type="text" v-model="lastname">
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
    import  {mapState} from 'vuex'
    export default {
        data() {
            return {
                firstname : " ",
                lastname : " ",
                password: " ",
            }
        },
        computed : mapState(["name"]),
        methods: {
            create() {

                alert("The method has been called");
                console.log("The data i am passing : " + this.firstname + this.lastname + this.password);
                this.$store.dispatch('signingupusers',[this.firstname, this.lastname ,this.password]);
            }
        },

    }
</script>

<style scoped>

</style>
