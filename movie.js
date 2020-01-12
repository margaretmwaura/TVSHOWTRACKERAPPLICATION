module.exports = class movie
{
    constructor(moviename, moviegenre,moviecast,movieplot,movieimage) {
        this.moviename = moviename;
        this.moviegenre = moviegenre;
        this.moviecast = moviecast;
        this.movieplot = movieplot;
        this.movieimag = movieimage

    }

    display() {
        console.log(this.moviename + this.moviegenre + this.moviecast + this.movieplot + this.movieimag);
    }
};
