module.exports = class movie
{
    constructor(id,url,movie_name, movie_genre,movie_cast,movie_plot,movie_image,season,red,green,blue) {
        this.id = id;
        this.url= url;
        this.movie_name = movie_name;
        this.movie_genre = movie_genre;
        this.movie_cast = movie_cast;
        this.movie_plot = movie_plot;
        this.movie_image = movie_image;
        this.season = season;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    display() {
        console.log(this.id + this.movie_name + this.movie_genre + this.movie_cast + this.movie_plot + this.movie_image);
    }
};
