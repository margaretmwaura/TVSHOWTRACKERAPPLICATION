<template>
    <div>
        <transition name="modal">
            <div v-if="isOpen">
                <div class="overlay" @click.self="closeModal">
                    <div class="modal">
                        <h5>Search for your subscriptions</h5>
                        <div class="input-group">
                            <span class="input-group-label"> </span>
                            <input class="input-group-field" v-model="email" placeholder="Enter email" >
                            <div class="input-group-button">
                                <input type="submit" class="button" value="Submit" v-on:click="check">
                            </div>
                        </div>
                        <ul v-for="item in movies">
                            <p>{{item}}</p>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
        <button @click="isOpen = !isOpen">
            {{ isOpen ? "Close" : "Open" }} subscriptions
        </button>
    </div>
</template>

<script>


    export default {
        data: function () {
            return {
                isOpen: false,
                email: ' ',
                subscriptions : [],

            };
        },
        props: {
            movies: Array,
        },
        methods: {
            check() {
                this.$store.dispatch('get_subscribed',this.email);
                console.log("The email is " + this.email)
            },
            closeModal()
            {
                this.isOpen = false;
            }

        },
        };
</script>

<style scoped >
    .modal {
        width: 500px;
        height: 400px;
        margin: 0px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 2px;
        /*box-shadow: 0 2px 8px 3px;*/
        transition: all 0.2s ease-in;
        font-family: Helvetica, Arial, sans-serif;
    }
    .fadeIn-enter {
        opacity: 0;
    }

    .fadeIn-leave-active {
        opacity: 0;
        transition: all 0.2s step-end;
    }

    .fadeIn-enter .modal,
    .fadeIn-leave-active.modal {
        transform: scale(1.1);
    }
    button {
        padding: 7px;
        margin-top: 10px;
        background-color: indianred;
        color: white;
        font-size: 1.1rem;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #00000080;
        z-index: 999;
        transition: opacity 0.2s ease;
    }

    p{
        color: black;
    }
    h5{
        color: black;
        font-weight: bold;
    }
</style>
