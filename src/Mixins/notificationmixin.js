export default {

    methods : {

        infor_with_notification(title , message)
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
