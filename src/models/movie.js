module.exports = class movie
{
    constructor(id,url,moviename, moviegenre,moviecast,movieplot,movieimage) {
        this.id = id;
        this.url= url;
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
