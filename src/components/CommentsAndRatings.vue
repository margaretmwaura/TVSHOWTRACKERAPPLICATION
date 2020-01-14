<template>
    <div class="grid-frame">
        <div class="grid-container">
            <div class="grid-x">
                <div class="cell medium-1 large-1 small-1"></div>
                <div class="cell medium-1 small-1 large-1">
                    <p id="userid">{{ ratenum( comnradat.rate,  comnradat.num) }}</p>
                </div>
                <div class="cell medium-1 small-1 large-1">
                    <li v-for="item in comnradat.comments" :key="item.id">
                        <p>{{item.time}}</p>
                        <p>{{item.message}}</p>
                    </li>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Movie",
        data() {
            return {
                comments : '',
                rating : ' '
            }
        },
        methods :{
            ratenum : function ( num , numtwo)
            {
                if(num !==0){
                    return (num/numtwo)
                }
                else
                {
                    return "There are no ratings yet";
                }

            }

        },
        props: {
            comnradat: Array,
        },

    }
</script>

<style scoped>

</style>
