
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    jwt = require('jsonwebtoken');

const user = require('./src/models/user');
const movie = require('./src/models/movie');
const comment = require('./src/models/comment');
const coments_and_ratings = require('./src/models/moviecomenra');
const subscription_object = require('./src/models/subscription_object');
const subscription = require('./src/models/subscription_details');
const webpush = require('web-push');
let user_file = require('fs');
const app = express();
var ColorThief = require('color-thief'),
    colorThief     = new ColorThief();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

const multer = require('multer');
const storage = multer.diskStorage({

    destination : function (req , file , cb) {

        cb(null , './public/images');

    },
    filename : function (req , file , cb) {

        cb(null , new Date().toISOString() + file.originalname )
    }
});

const upload = multer({storage: storage});
const port = process.env.PORT || 4000;

//Email configuration
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mwauramargaret1@gmail.com',
        pass: 'Aswift07'
    }
});

var mailOptions = {
    from: 'mwauramargaret1@gmail.com',
    to: 'mwauramargaret1@gmail.com',
    subject: 'Publishing your movie',
    text: `Your are getting this email because you choose to publish your movie`
};

const publicVapidKey = 'BMtwc-UhhkFA3TnKpx64d5FS6mzBl74aMXi7pso8tXIzQOSkdrpbtIx5QNqCTgfJ_ek8TvgIqXeM2BMLA1mDwg8';
const privateVapidKey = 'fOVBRtB538aA7zemMRK8sakAxYaYB0z1mf-jKsMQ5no';

webpush.setVapidDetails('mailto:mwauramargaret1@gmail.com',publicVapidKey,privateVapidKey);

app.listen(port, () => console.log('Hello world app listening on port ${port}!'));

let file_read = user_file.readFileSync('./src/database/userdata.json');
let all_users = JSON.parse(file_read);

let file_movie = user_file.readFileSync('./src/database/movie_instanceata.json');
let all_movies = JSON.parse(file_movie);

let file_comments_n_ra = user_file.readFileSync('./src/database/commentsandratings.json');
let all_comments_n_ra = JSON.parse(file_comments_n_ra);

let file_subscribers = user_file.readFileSync('./src/database/subscribers.json');
let all_subscribers= JSON.parse(file_subscribers);

console.log("This are all the users " + all_users);
app.post('/signup', (req, res) =>
{
    const user_details = req.body;
    let user_data = user_details[1];
    console.log(user_data[0]);
    console.log(user_data[1]);
    console.log(user_data[2]);

   let user_object = new user(user_data[0] , user_data[1] , user_data[2]);
   all_users.push(user_object);
   console.log("This is the created user : " + user_object.display());
    if(user_object !== null)
    {
             jwt.sign({user_object},'secretkey' , (error,token)=>
             {

                let userdata = JSON.stringify(all_users , null , 2);
                user_file.writeFile('./src/database/userdata.json' , userdata , finished);
                function finished(error)
                {
                    if(error)
                    {
                        console.log("There was an error , no data added to the file");
                    }
                    else
                    {
                        console.log("There was no error encountereed we are all set")
                        res.status(200).json({token : token});
                    }
                }

            }
        );


    }
    else
    {
        res.status(400).send("unable to save to database");

    }
});

app.post('/login', (req, res) =>
{
    const user_details = req.body;
    let user_data = req.body;
    console.log("This is what I have received " , user_data);
    console.log(user_data.email);
    console.log(user_data.password);

    let flag = 0;
    let user = ' ';
   // all_users.forEach( function (item)

   for(let i = 0 ; i<all_users.length ; i++)
    {
        let saved_email = all_users[i].email.trim();
        let email = user_data.email.trim();
        console.log("Within the loop " + email + "and the comparing one " + saved_email);
        if(saved_email === email)
        {
            user = all_users[i];
            console.log("User exists");
            flag = 1;
            break;
        }
        else
        {
            console.log("User doesnt exists");
            console.log(email);
        }


    };
    console.log("You exists value  and the value of the flag " + flag);

   if(flag === 1)
   {
       jwt.sign({user},'secretkey' , (error,token)=> {
           console.log("Key gotten");
           console.log(token);
           if(error)
           {
               console.log("There was an error while trying to generate key " + error);
           }
           res.status(200).json({token: token});
       });
   }
   else
   {
       res.status(403).json("Forbinddedn");
   }

});
app.post('/addmovie',upload.single('image'), (req, res) =>
{
    console.log(req.file);
    console.log(req.file.filename);
    const movie = req.body;
    if(movie != null)
    {
        res.status(200).json({file : req.file.filename});
    }
    else
    {
        req.status(403).json({error:error});
    }

});
app.post('/movie_details',verifyToken, (req, res) =>
{
    const movie_details = req.body;
    let movie_instance = movie_details[1];
    console.log(movie_instance[0]);
    console.log(movie_instance[1]);
    console.log(movie_instance[2]);
    console.log(movie_instance[3]);
    console.log(movie_instance[4]);
    //The fourth attribute I am retrieving it using the file name because it is an object from the uploading of image response
    console.log(movie_instance[5].file);
    //generate id

    console.log("The image " + movie_instance[5].file);
    let imgPath = './public/images/' + movie_instance[5].file;
    console.log("This is the image path " + imgPath);
    let image = user_file.readFileSync(imgPath);
    let rgb = colorThief.getColor(image);
    console.log("This is the most dorminat color " + rgb[0] + " " + rgb[1] + " " + rgb[2]);

    let id  = generate_unique_ids();
    let new_movie = new movie(id,movie_instance[0] , movie_instance[1] , movie_instance[2] , movie_instance[3] ,movie_instance[4], movie_instance[5].file,movie_instance[6],rgb[0],rgb[1],rgb[2]);
    all_movies.push(new_movie);


    jwt.verify(req.token,'secretkey',(err,auth) =>
    {
        console.log("This is the token " + req.token);
        if(err)
        {
            res.sendStatus(403);
            console.log("There was an error");
        }
        else {
            let data_string = JSON.stringify(all_movies , null , 2);
            user_file.writeFile('./src/database/movie_instanceata.json' , data_string , finished);
            function finished(error)
            {
                if(error)
                {
                    res.sendStatus(403);
                    console.log("There was an error , no data added to the file");
                }
                else
                {
                    // Since now a movie has been created create its comments object
                    let arr = [];
                    let comments_and_ratings = new coments_and_ratings(id , 0 ,0, arr);
                    all_comments_n_ra.push(comments_and_ratings);
                    let datacomment = JSON.stringify(all_comments_n_ra , null , 2);
                    user_file.writeFile('./src/database/commentsandratings.json' , datacomment , finished);
                    function finished(error) {
                        if (error) {
                            res.sendStatus(403);
                            console.log("There was an error , no data added to the file");
                        } else {
                        }
                    }

                    // Creating a subscription object now that a movie has been added
                    let subscription_array = [];
                    let subscription_object_instance = new subscription_object(id , subscription_array);
                    all_subscribers.push(subscription_object_instance);
                    let datasubscrp = JSON.stringify(all_subscribers , null , 2);
                    user_file.writeFile('./src/database/subscribers.json' , datasubscrp , finished);
                    function finished(error) {
                        if (error) {
                            res.sendStatus(403);
                            console.log("There was an error , no data added to the file");
                        } else {
                        }
                    }
// Sending a mail syaing a movie has been posted
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    console.log("There was no error encountereed we are all set");
                    var myJson = JSON.stringify(all_movies);
                    res.status(200).json({param : myJson});

                }
            }
        }
    });

});
//subsribe route
app.post('/subscribe' , (req,res) => {

    const subscription = req.body;
    //201 status
    res.status(201).json({});
    const payload = JSON.stringify({title : 'New Movies' , message : 'There are new movies you should go checkout'});
    webpush.sendNotification(subscription,payload).catch(error => console.error());
});

app.get('/all_movies',(req,res) =>
{
    if(all_movies !== null)
    {
        console.log(all_movies);
        var myJson = JSON.stringify(all_movies);
        res.status(200).json({param : myJson});
    }
    else {
        res.status(403).json({error:"there was an error"})
    }
});

app.post('/comments' , (req,res) =>
{
    const movie_comments = req.body;
    let commenting = movie_comments[1];

    //This details should get me the id and the comment respectively
    console.log(commenting[0]);
    console.log(commenting[1]);

    let movie_id = commenting[0];
    let new_comment = new comment(commenting[1]);

    // all_comments_n_ra.push(new_comment);

    // For this to work get the commentsnra object in the file that matches the id of the comment
    // edit it and then write to file

    for(let i = 0 ; i<all_comments_n_ra.length ; i++)
    {
        let comments_and_rating_details  = all_comments_n_ra[i].id;
        console.log("Within the loop " + movie_id + " and the comparing one " + comments_and_rating_details);
        if(comments_and_rating_details === movie_id)
        {
            all_comments_n_ra[i].comments.push(new_comment);
            let user_comments = JSON.stringify(all_comments_n_ra , null , 2);
            user_file.writeFile('./src/database/commentsandratings.json' , user_comments , finished);
            function finished(error)
            {
                if(error)
                {
                    console.log("There was an error , no data added to the file");
                }
                else
                {
                    var myJson = JSON.stringify(all_comments_n_ra);
                    res.status(200).json({param : myJson});
                    console.log("There was no error encountereed we are all set")
                }
            }

        }
        else
        {
            console.log("The movie does not exist");
        }


    };




});

app.post('/ratings' , (req,res) =>
{
    const movie_ratings = req.body;
    let ratings = movie_ratings[1];

    //This details should get me the id and the rating to put
    console.log(ratings[0]);
    console.log(ratings[1]);

    let movie_id = ratings[0];
    for(let i = 0 ; i<all_comments_n_ra.length ; i++)
    {
        let comments_and_rating_details  = all_comments_n_ra[i].id;
        console.log("Within the loop " + movie_id + " and the comparing one " + comments_and_rating_details);
        if(comments_and_rating_details === movie_id)
        {
            all_comments_n_ra[i].rate += parseInt(ratings[1], 10);
            all_comments_n_ra[i].num += 1;
            let user_comments = JSON.stringify(all_comments_n_ra , null , 2);
            user_file.writeFile('./src/database/commentsandratings.json' , user_comments , finished);
            function finished(error)
            {
                if(error)
                {
                    console.log("There was an error , no data added to the file");
                }
                else
                {
                    var myJson = JSON.stringify(all_comments_n_ra);
                    res.status(200).json({param : myJson});
                    console.log("There was no error encountereed we are all set");
                }
            }

        }
        else
        {
            console.log("No movie was found");
            // console.log(email);
        }


    };

});

app.get('/commentsandratings' , (req,res) =>
{
    if(all_comments_n_ra !== null)
    {
        console.log(all_comments_n_ra)
        var myJson = JSON.stringify(all_comments_n_ra);
        console.log("The json to send " + myJson);
        res.status(200).json({param : myJson});
    }
    else {
        console.log("There was an error getting the comments and the ratings ");
        res.status(403).json({error:"there was an error"})
    }
});

app.post('/newsubsriber' ,(req,res) =>
{
    const subscription_details = req.body;
    let new_subscriber = subscription_details[1];

    //This details should get me the id and the rating to put
    console.log(new_subscriber[0]);
    console.log(new_subscriber[1]);

    let subid = new_subscriber[0];
    for(let i = 0 ; i<all_subscribers.length ; i++)
    {
        let subscription_id  = all_subscribers[i].id;
        console.log("Within the loop " + subid + " and the comparing one " + subscription_id);
        if(subscription_id === subid)
        {
            let new_subscription = new subscription(new_subscriber[1]);
            all_subscribers[i].subscribers_details.push(new_subscription);
            let subscribers_string = JSON.stringify(all_subscribers , null , 2);
            user_file.writeFile('./src/database/subscribers.json' , subscribers_string , finished);
            function finished(error)
            {
                if(error)
                {
                    console.log("There was an error , no data added to the file");
                }
                else
                {
                    res.status(200).json();
                    console.log("There was no error encountereed we are all set");
                }
            }

        }
        else
        {
            console.log("No movie was found");
            // console.log(email);
        }


    };
});

app.delete('/deletemovie/:id',verifyToken,(req,res) => {

    const movie_params = req.params.id;
    console.log("Data that has been sent " + movie_params);

    jwt.verify(req.token,'secretkey',(err,auth) => {
        for (let i = 0; i < all_movies.length; i++) {
            let current_movie_id = all_movies[i].id;
            console.log("The real ids " + movie_params + " " + " the comparing ud " + current_movie_id);
            if (movie_params === current_movie_id) {
                const index = all_movies.indexOf(all_movies[i]);
                console.log("This is the index of the movie to be deleted " + index);
                console.log("A match has been found for the movies");
                console.log("The real ids " + movie_params + " " + " the comparing ud " + current_movie_id);
                if (index > -1) {
                    all_movies.splice(index, 1);
                    for (let i = 0; i < all_comments_n_ra.length; i++) {
                        let current_mommentraid = all_comments_n_ra[i].id;
                        console.log("The real ids " + movie_params + " " + " the comparing ud " + current_mommentraid);
                        if (movie_params === current_mommentraid) {
                            console.log("A match has been found for the comments");
                            const index = all_comments_n_ra.indexOf(all_comments_n_ra[i]);
                            console.log("This is the index of the movie to be deleted " + index);
                            if (index > -1) {
                                all_comments_n_ra.splice(index, 1);

                                for (let i = 0; i < all_subscribers.length; i++) {
                                    let current_subscription = all_subscribers[i].id;
                                    console.log("The real ids " + movie_params + " " + " the comparing ud " + current_subscription);
                                    if (movie_params === current_subscription) {
                                        const index = all_subscribers.indexOf(all_subscribers[i]);
                                        console.log("A match has been found for the subscribers");
                                        if (index > -1) {
                                            all_subscribers.splice(index, 1);
                                            // Rewritting the file
                                            //There are two files
                                            let data_string = JSON.stringify(all_movies, null, 2);
                                            user_file.writeFile('./src/database/movie_instanceata.json', data_string, finished);

                                            function finished(error) {
                                                if (!error) {
                                                    console.log("Movie removed from the file");
                                                    let user_comments = JSON.stringify(all_comments_n_ra, null, 2);
                                                    user_file.writeFile('./src/database/commentsandratings.json', user_comments, finished);

                                                    function finished(error) {
                                                        if (!error) {
                                                            let datasub = JSON.stringify(all_subscribers, null, 2);
                                                            user_file.writeFile('./src/database/subscribers.json', datasub, finished);

                                                            function finished(error) {
                                                                if (!error) {
                                                                    console.log("Comments has been removed from the file");
                                                                    let mymovies = JSON.stringify(all_movies);
                                                                    let mycomments = JSON.stringify(all_comments_n_ra);
                                                                    res.status(200).json({
                                                                        commnra: mycomments,
                                                                        movies: mymovies
                                                                    });
                                                                }
                                                            }

                                                        }
                                                    }
                                                }
                                            }
                                        }

                                    }

                                }


                            }
                        }
                    }
                }
            }
        }
    });
});


app.post('/movie_details_edit', verifyToken,(req, res) =>
{
    const movie_comments = req.body;
    let movie_details = movie_comments[1];
    console.log("These are the parameters we have gotten " + movie_details);
    let id = movie_details[0];
    let url = movie_details[1];
    let name = movie_details[2];
    let genre = movie_details[3];
    let cast = movie_details[4];
    let plot = movie_details[5];
    let mimage = movie_details[6].file;
    let season = movie_details[7];
    console.log("The updating dits " + id + " " + name + " " + genre + " " + cast + " " + plot + " " + mimage);

    jwt.verify(req.token,'secretkey',(err,auth) => {
        for (let i = 0; i < all_movies.length; i++) {
            let readmovie_id = all_movies[i].id;
            console.log("The real ids " + readmovie_id + " " + " the comparing ud " + id);
            if (readmovie_id === id) {
                all_movies[i].url = url;
                all_movies[i].movie_name = name;
                all_movies[i].movie_genre = genre;
                all_movies[i].movie_cast = cast;
                all_movies[i].movie_plot = plot;
                all_movies[i].movie_image = mimage;
                all_movies[i].season = season;
                let data_string = JSON.stringify(all_movies, null, 2);
                user_file.writeFile('./src/database/movie_instanceata.json', data_string, finished);

                function finished(error) {
                    if (error) {
                        res.sendStatus(403);
                        console.log("There was an error , no data added to the file");
                    } else {
                        console.log("Comparing time");
                        for (let i = 0; i < all_subscribers.length; i++) {
                            let compid = all_subscribers[i].id;
                            if (id === compid) {
                                console.log("Matching ids " + id + " " + compid);
                                let emails = all_subscribers[i].subscribers_details;
                                for (let i = 0; i < emails.length; i++) {
                                    let emailname = emails[i].email;
                                    var mailOptions = {
                                        from: 'mwauramargaret1@gmail.com',
                                        to: emailname,
                                        subject: 'Updates on the movies',
                                        text: 'Your movie subscription ' + name + ' has been updated'
                                    };
                                    // Sending a mail syaing a movie has been posted
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log('Email sent: ' + info.response);
                                        }
                                        console.log("Emails is " + emailname);
                                    });
                                }
                            }

                        }

                        let mymovies = JSON.stringify(all_movies);
                        res.status(200).json({movies: mymovies});
                    }
                }
            }
        }

    });
});

app.get('/usersubscriptions/:email' , (req,res) =>
{
    let email =  req.params.email;
    console.log("The email " + email);
    let subscription_details = [];
    for (let i = 0; i < all_subscribers.length; i++)
    {
        let id = all_subscribers[i].id;
        console.log("The id of the first subscrition " + id);
        let subscribers_details = all_subscribers[i].subscribers_details;
        console.log("To iterate " + subscribers_details);
        for(let j=0 ; j<subscribers_details.length ; j++)
        {
            console.log("The email of a subscription object " + subscribers_details[j].email);
            let compare_one = email.trim();
            let compare_two = subscribers_details[j].email.trim();
                if(compare_one === compare_two)
                {
                    console.log("The emailas are similar");
                    for(let k = 0 ; k<all_movies.length ; k++)
                    {
                        if(id === all_movies[k].id)
                        {
                            subscription_details.push(all_movies[k].movie_name);
                            console.log("The id pushed is " + all_movies[k].movie_name);
                        }
                    }

                }
            }


    }
    var myJson = JSON.stringify(subscription_details);
    res.status(200).json({param: myJson});
});
function verifyToken(req,res,next)
{

    //Note carefully this has to be a small a , otherwise it wont work
    const bearerHeader = req.headers['authorization'];
    console.log("This is the bearer header " + bearerHeader);
    if(typeof bearerHeader !== 'undefined')
    {
        const bearer = bearerHeader.split(' ');
        const bearertoken = bearer[1];
        req.token = bearertoken;
        next();
    }
    else
    {
        res.sendStatus(403)
    }
}

function generate_unique_ids() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}


