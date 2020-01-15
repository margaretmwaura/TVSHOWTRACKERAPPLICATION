module.exports = class subscriptiom
{

    constructor(id , subdetails) {
        this.id = id;
        this.subdetails = subdetails;
    }

    display() {
        console.log(this.id + this.subdetails);
    }
};
