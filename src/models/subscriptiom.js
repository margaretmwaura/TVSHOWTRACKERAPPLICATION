module.exports = class subscriptiom
{

    constructor(id , subscribers_details) {
        this.id = id;
        this.subscribers_details = subscribers_details;
    }

    display() {
        console.log(this.id + this.subscribers_details);
    }
};
