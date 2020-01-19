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
                                <router-link to="/show" id="thing">Movies</router-link>
                                <router-link to="/create" id="thingt">Create</router-link>
                                <router-link to="/sign" id="thingtt">Signup</router-link>
                                <router-link to="/Login" id="thingttt">Login</router-link>
                                <button id="log_out" @click="logoutuser" >Log Out</button>
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
    <router-view>

    </router-view>

    </div>
</template>

<script>
    import Navbar from "./components/Navbar.vue";
    import {mapState} from "vuex";
    export default {
        name: 'app',
        components:
            {
                Navbar
            },
        data (){
            return {

            }
        },
        computed :  {
            token () {
                return this.$store.getters.currentuser
            }
        },
        methods: {
            logoutuser()
            {
                this.$store.dispatch('logout');

            }
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
            margin: 50px;
            height: 700px;
            width: 100%;
            border: thick solid white;
            float: left;

            &_inner
            {
                padding-top: 30px;
                float: right;
                padding-right: 30px;
                font-family:Serif;

                button{
                    color: white;
                }
                #thing
                {
                    color: white;
                    margin-right: 50px;
                    text-decoration: none;

                }
                #thingt
                {
                    color: white;
                    margin-right: 50px;
                    text-decoration: none;
                }
                #thingtt
                {
                    color: white;
                    margin-right: 50px;
                    text-decoration: none;
                }
                #thingttt
                {
                    color: white;
                    margin-right: 50px;
                    text-decoration: none;
                }
                #thingtttt
                {
                    color: white;
                    margin-right: 50px;
                    text-decoration: none;
                }
            }

            &_logo
            {
                p{
                    padding-top: 30px;
                    color: white;
                    padding-left: 30px;
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
                p{
                    color: white;
                    padding-left: 30px;
                    font-size: 30px;
                    letter-spacing: 0.4em;
                    text-align: center;
                    padding-top: 20%;
                    font-family:Serif;
                }
            }

            &_arrow
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

    }
</style>
