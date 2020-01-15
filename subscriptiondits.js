module.exports = class subscription
{
    constructor(time , email ) {
        this.time = time;
        this.email = email;
    }

    display() {
        console.log(this.id + this.email);
    }
};
