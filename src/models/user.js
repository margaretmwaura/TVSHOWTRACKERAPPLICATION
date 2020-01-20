module.exports = class user
{
    constructor(name, email,password) {
        this.name = name;
        this.email = email;
        this.password = password

    }

    display() {
        console.log(this.email + " " + this.email + " " + this.password);
    }
};
