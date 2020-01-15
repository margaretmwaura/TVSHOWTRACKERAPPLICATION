module.exports = class subscription
{

    constructor(id , subdetails) {
        this.id = id;
        this.subdetails = subdetails;
    }

    display() {
        console.log(this.id + this.subdetails);
    }
};
