module.exports = class user
{
    constructor(userId , id, title, body) {
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;

    }

    display() {
        console.log(this.userId + " " + this.id + " " + this.body + " " +  this.title);
    }
};
