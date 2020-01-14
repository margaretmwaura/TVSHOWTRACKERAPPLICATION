module.exports = class comment
{
    constructor(message) {
        this.time = Date.now();
        this.message = message;
    }

    display() {
        console.log(this.time + this.message);
    }
};
