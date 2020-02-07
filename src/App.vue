<template>
    <div>
    <div id="app" class="grid-frame">
              <div id="app_bannermessage" class="grid-container grid-y">

                <div class="cell small-2 large-2 medium-2">
                    <div class="grid-x">
                        <div class="cell small-0 large-2 medium-2">
                            <div id="app_bannermessage_logo">
                                <p>MAGGIE
                                    <br>
                                    <span>
                                        Movies
                                        </span>

                                </p>
                            </div>
                        </div>
                        <div class="cell small-0 large-2 medium-2"></div>
                        <div class="cell small-12 large-8 medium-8">
                            <div id="app_bannermessage_inner">
                                <router-link to="/" id="thing">Movies</router-link>
                                <router-link to="/create" id="thingt" v-if="checkingtoken">Create</router-link>
                                <router-link to="/sign" id="thingtt" v-if="!checkingtoken">Signup</router-link>
                                <router-link to="/Login" id="thingttt" v-if="!checkingtoken">Login</router-link>
                                <button id="log_out" @click="logoutuser" v-if="checkingtoken">Log Out</button>
                                <button v-on:click="openModal" v-if="!showModal">Subscriptions</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="cell small-8 large-8 medium-8" id="app_bannermessage_message">
                    <p>MOVIES AND SERIES</p>
                    </div>

                 <div class="cell small-2 large-2 medium-2" id="app_bannermessage_arrow">

                     <div id="direction">

                             <p>Scroll down <span>
                                  <i class="fas fa-arrow-right" style="color: white "> </i>
                             </span></p>
                     </div>
                 </div>
              </div>
    </div>
<!--        <button v-if="checkingtoken" id="app_sanitycheck">You are Logged in</button>-->
<!--        <button v-if="!checkingtoken" id="app_sanitychecknot">You are not Logged in</button>-->
    <router-view>

    </router-view>
        <notifications group="foo" />

        <div class="grid-frame" id="footer">

            <p>A Movie Agency in Liason</p>
            <p>hello@maggie.com  . 04367578585 . 47478415y875</p>
            <div class="grid-container cell medium-12 small-12 large-12">
                <Modal v-if="showModal" :showModal=showModal v-bind:movies="getsubscriptions">
                </Modal>
                <button v-on:click="showSubscriptions" v-if="!showModal" > Show Subscriptions</button>
            </div>
        </div>

    </div>
</template>

<script>
    import Navbar from "./components/Navbar.vue";
     import Modal from "./components/Modal";
    import {mapGetters, mapState} from "vuex";
    export default {
        name: 'app',
        components:
            {
                Navbar,
                Modal
            },
        data (){
            return {
                check: ' ',
                showModal: false
            }
        },
        computed : {
            ...mapGetters([
                'currentuser',
                'getsubscriptions'
                // ...
            ]),
            checkingtoken()
            {
                if(this.currentuser !== ' ')
                {
                    console.log("The Token is present " + this.currentuser);
                    this.check = true;
                    return true;
                }
                else
                {
                    console.log("The Token is absent" + this.currentuser);
                    this.check = false;
                    return false
                }
            },
            openModal() {
                this.showModal = true;
            }
        },
        methods: {
            logoutuser()
            {
                this.$store.dispatch('logout');
            },
            showSubscriptions() {
                console.log("Opening the modal " + this.showModal);
                this.showModal = true;
            },

        }
    }
</script>
<style scoped lang="scss">
    @import "../foundation/css/app.css";
    @import "../foundation/css/foundation.css";
    #app {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../public/images/michael.jpg");
        height: 800px;
        width: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        position:relative;

        &_bannermessage
        {
            margin-left: 2.5%;
            margin-top: 4%;
            height: 700px;
            width: 100%;
            border: thick solid white;
            float: left;


            &_inner
            {
                padding-top: 5%;
                text-align: right;
                padding-right: 5%;
                font-family:Serif;

                button{
                    color: white;
                }
                #thing
                {
                    color: white;
                    margin-right: 3%;
                    text-decoration: none;

                }
                #thingt
                {
                    color: white;
                    margin-right: 3%;
                    text-decoration: none;
                }
                #thingtt
                {
                    color: white;
                    margin-right: 3%;
                    text-decoration: none;
                }
                #thingttt
                {
                    color: white;
                    margin-right: 3%;
                    text-decoration: none;
                }
                #thingtttt
                {
                    color: white;
                    margin-right: 3%;
                    text-decoration: none;
                }
                #thingtstat
                {
                    color: white;
                    margin-right: 3%;
                    text-decoration: none;
                }
            }

            &_logo
            {
                margin-top: 6%;
                p{
                    padding-top: 5%;
                    color: white;
                    padding-left: 5%;
                    font-size: 20px;
                    font-style: italic;
                    font-weight: bolder;
                    font-family:Serif;
                    span{
                        font-size: 16px;

                    }
                }
            }

            &_message
            {
                padding-top: 20%;
                p{
                    color: white;
                    padding-left: 1%;
                    font-size: 30px;
                    letter-spacing: 0.4em;
                    text-align: center;
                    font-family:Serif;
                }
            }

            &_arrows
            {

                #direction
                {
                    float: right;
                    p{
                        transform: rotate(90deg);
                        transform-origin: left top 0;
                        color: white;
                        font-size: 11px;
                    }
                }


            }
        }

        &_sanitycheck
        {
            margin-top: 3%;
            color: green;
            background-color: indianred;
            padding: 15px;
        }
        &_sanitychecknot
        {
            margin-top: 3%;
            color: rebeccapurple;
            background-color: indianred;
            padding: 15px;
        }

    }

    #footer
    {
        padding: 5%;
        background-color: gray;
        color: white;
        margin-top: 3%;
        p{
            font-size: 16px;
            font-family:Serif;
        }
    }
</style>
