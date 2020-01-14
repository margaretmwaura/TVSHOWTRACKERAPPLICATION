module.exports = class movie
{
    constructor(id,moviename, moviegenre,moviecast,movieplot,movieimage) {
        this.id = id;
        this.moviename = moviename;
        this.moviegenre = moviegenre;
        this.moviecast = moviecast;
        this.movieplot = movieplot;
        this.movieimag = movieimage

    }

    display() {
        console.log(this.id + this.moviename + this.moviegenre + this.moviecast + this.movieplot + this.movieimag);
    }
};
