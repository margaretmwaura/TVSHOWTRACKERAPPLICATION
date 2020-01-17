<template>
    <div id="app">
        <div id="app_rou">
            <div id="app_rou_inner">
                <router-link to="/show" id="thing">Movies</router-link>
                <router-link to="/create" id="thingt">Create</router-link>
                <router-link to="/sign" id="thingtt">Signup</router-link>
                <router-link to="/Login" id="thingttt">Login</router-link>
                <button id="log_out" @click="logoutuser">Log Out</button>
            </div>
          <p>{{token}}</p>
        </div>
        <router-view></router-view>
        <notifications group="foo" ></notifications>
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
        computed :{
            ...mapState(["token"]),
        },
        methods: {
            logoutuser()
            {
                this.$store.dispatch('logout');

            }
        }
    }
</script>
<style lang="scss">
    @import "../foundation/css/app.css";
    @import "../foundation/css/foundation.css";
    #app {
        &_rou
        {
            width: 100%;
            height: 100px;
            background-color: indianred;

            &_inner
            {
                padding-top: 50px;
                text-align: center;

                #thing
                {
                    color: indigo;
                    margin-right: 50px;
                    text-decoration: none;

                }
                #thingt
                {
                    color: indigo;
                    margin-right: 50px;
                    text-decoration: none;
                }
                #thingtt
                {
                    color: indigo;
                    margin-right: 50px;
                    text-decoration: none;
                }
                #thingttt
                {
                    color: indigo;
                    margin-right: 50px;
                    text-decoration: none;
                }
            }
        }
    }
</style>
