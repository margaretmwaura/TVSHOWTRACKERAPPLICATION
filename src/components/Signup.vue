<template>
    <div>
        <form v-on:submit.prevent="create">
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
                    <div class="cell medium-12 large-12 small-12">
                        <label>Name
                            <input type="text" placeholder=".medium-6.cell"  v-model="firstname">
                        </label>
                    </div>
                    <div class="cell medium-12 large-12 small-12">
                        <label>Email
                            <input type="text" placeholder=".medium-6.cell" v-model="lastname">
                        </label>
                    </div>
                    <div class="cell medium-12 large-12 small-12">
                        <label>Password
                            <input type="text" placeholder=".medium-6.cell" v-model="password">
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
                this.$store.dispatch('signingupusers',this.firstname, this.lastname, this.password);
            }
        },
        watch: {
            '$store.state.signupresponse' : function () {

                console.log("Store has changed");
                this.$notify({
                    group: 'foo',
                    title: 'Success post',
                    text: 'successful posting of data '
                });


            },
            '$store.state.signupfailure' : function () {
                this.$notify({
                    group: 'foo',
                    title: 'Failure post',
                    text: 'The posting of data was a fail'
                });
            }

        }
    }
</script>

<style scoped>

</style>
