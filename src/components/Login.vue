<template>
    <div>
        <form v-on:submit.prevent="create">
            <p>Login into your account </p>
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
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
                        <button class="primary button expanded">Login user</button>
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
                email : " ",
                password: " ",
            }
        },
        computed :  {
            ...mapGetters([
                'current_user',
                // ...
            ]),
            },
        methods: {
            create() {

                if(this.email === " " || this.password === " " )
                {
                    this.informwithnotification("Error" , "Enter all details");
                }
                else
                {
                    console.log("The data i am passing : " + this.email , this.password);
                    this.$store.dispatch('login_users',[this.email,this.password]);
                    this.email = " ";
                    this.password = " ";
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
