<template>
    <div>
        <form @submit.prevent="create" id="form">
            <p>Login into your account </p>
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
                    <div class="cell medium-12 large-12 small-12">
                        <label>Email
                            <input type="text" v-model="form.email">
                        </label>
                    </div>
                    <div class="cell medium-12 large-12 small-12">
                        <label>Password
                            <input v-model="form.password" type="password">
                        </label>
                    </div>
                    <div class="cell medium-12 large-12 small-12">
                        <button class="primary button expanded" type="submit">Login user</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import axios from "axios";
    import notificationmixin from "../Mixins/notificationmixin";
    export default {
        data() {
            return {
               form:{}
            }
        },
        computed :  {
            ...mapGetters([
                'current_user',
                // ...
            ]),
            },
        methods: {
           async create()
             {
                await axios.post('http://localhost:4000/login',this.form)
                  .then(response =>{
                      console.log("This is the token " + response.data.token);
                      this.$store.state.token = response.data.token;

                      this.form.email = " ";
                      this.form.password = " ";
                      console.log("The value after the function " + this.form.email + " " + this.form.password + " Gal did it");
                  });

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
