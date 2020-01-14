module.exports = class moviecomenra
{

    constructor(id , rate ,num, comment ) {
        this.id = id;
        this.rate = rate;
        this.num = num;
        this.comments = comment;
    }

    display() {
        console.log(this.id + this.rate);
    }
};
