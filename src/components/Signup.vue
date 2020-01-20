<template>
    <div>
        <form v-on:submit.prevent="create">
            <p>Create an Account to Allow you to post Movies</p>
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
                            <input v-model="password" type="password">
                        </label>
                    </div>
                    <div class="cell medium-12 large-12 small-12">
                        <button class="primary button expanded">Create account</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import notificationmixin from "../Mixins/notificationmixin";
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

                if(this.firstname === " " || this.email === " " | this.password === " ")
                {
                    this.informwithnotification("Error" , "Enter all details");
                }
                else
                {
                    this.firstname = " ";
                    this.email = " ";
                    this.password = " ";
                    this.$store.dispatch('signingupusers',[this.firstname, this.email,this.password]);
                }
            }
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
