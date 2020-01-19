export default {

    methods : {

        informwithnotification(title , message)
        {
            console.log("The mixin function has arrived");
            this.$notify({
                group: 'foo',
                title: title,
                text: message
            });
        }
}
};
