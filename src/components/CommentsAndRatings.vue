<template>
    <div class="grid-frame">
        <div class="grid-container">
            <div class="grid-x">
                <div class="cell medium-2 small-2 large-2">
                    <p id="userid">This is the rating {{ ratenum( comnradat.rate,  comnradat.num) }}</p>
                </div>
                <div class="cell medium-10 small-10 large-10">
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
