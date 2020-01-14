module.exports = class moviecomenra
{

    constructor(id , rate , comment ) {
        this.id = id;
        this.rate = rate;
        this.comments = comment;
    }

    display() {
        console.log(this.id + this.rate);
    }
};
