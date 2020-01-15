module.exports = class subscriptiondits
{
    constructor(email) {
        this.time = Date.now();
        this.email = email;
    }

    display() {
        console.log(this.id + this.email);
    }
};
