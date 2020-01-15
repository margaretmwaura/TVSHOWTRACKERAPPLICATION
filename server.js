
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    jwt = require('jsonwebtoken');

const user = require('./user');
const movie = require('./movie');
const comment = require('./comment');
const comentnra = require('./moviecomenra');
const webpush = require('web-push');
let userfile = require('fs');
const app = express();

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

let fileread = userfile.readFileSync('userdata.json');
let allusers = JSON.parse(fileread);

let filemovie = userfile.readFileSync('moviedata.json');
let allmovies = JSON.parse(filemovie);

let filecommentsnra = userfile.readFileSync('commentsandratings.json');
let allcommentsnra = JSON.parse(filecommentsnra);

console.log("This are all the users " + allusers);
app.post('/signup', (req, res) =>
{
    const userdits = req.body;
    let userfromnet = userdits[1];
    console.log(userfromnet[0]);
    console.log(userfromnet[1]);
    console.log(userfromnet[2]);

   let userob = new user(userfromnet[0] , userfromnet[1] , userfromnet[2]);
   allusers.push(userob);
   console.log("This is the created user : " + userob.display());
    if(userob != null)
    {
             jwt.sign({userob},'secretkey' , (error,token)=>
             {
                res.status(200).json({token : token});
                let userdata = JSON.stringify(allusers , null , 2);
                userfile.writeFile('userdata.json' , userdata , finished);
                function finished(error)
                {
                    if(error)
                    {
                        console.log("There was an error , no data added to the file");
                    }
                    else
                    {
                        console.log("There was no error encountereed we are all set")
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
    const userdits = req.body;
    let userfromnet = userdits[1];
    console.log(userfromnet);
    console.log(userfromnet[0]);
    console.log(userfromnet[1]);

    let flag = 0;
    let user = ' ';
   // allusers.forEach( function (item)

   for(let i = 0 ; i<allusers.length ; i++)
    {
        let storedemail = allusers[i].email;
        let email = userfromnet[0];
        console.log("Within the loop " + email + "and the comparing one " + storedemail);
        if(storedemail === email)
        {
            user = allusers[i];
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
               console.log("There was an erro while trying to generate key " + error);
           }
           res.status(200).json({token: token});
       });
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
app.post('/moviedits',verifyToken, (req, res) =>
{
    const moviedits = req.body;
    let movied = moviedits[1];
    console.log(movied[0]);
    console.log(movied[1]);
    console.log(movied[2]);
    console.log(movied[3]);
    //The fourth attribute I am retrieving it using the file name because it is an object from the uploading of image response
    console.log(movied[4].file);
    //generate id
    let id  = generate_unique_ids();
    let newmovie = new movie(id,movied[0] , movied[1] , movied[2] , movied[3] , movied[4].file);
    allmovies.push(newmovie);

    // jwt.verify(req.token,'secretkey',(err,auth) =>
    // {
    //     console.log("This is the token " + req.token);
    //     if(err)
    //     {
    //         res.sendStatus(403);
    //         console.log("There was an error");
    //     }
    //     else {
            let datastr = JSON.stringify(allmovies , null , 2);
            userfile.writeFile('moviedata.json' , datastr , finished);
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
                    let comenra = new comentnra(id , 0 ,0, arr);
                    allcommentsnra.push(comenra);
                    let datacomment = JSON.stringify(allcommentsnra , null , 2);
                    userfile.writeFile('commentsandratings.json' , datacomment , finished);
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
                    var myJson = JSON.stringify(allmovies);
                    res.status(200).json({param : myJson});

                }
            }
    //     }
    // });

});

//subsribe route
app.post('/subscribe' , (req,res) => {

    const subscription = req.body;

    //201 status
    res.status(201).json({});
    const payload = JSON.stringify({title : 'push tests' , message : 'There are new movies you should go checkout'});
    webpush.sendNotification(subscription,payload).catch(error => console.error());
});

app.get('/allmovies',(req,res) =>
{
    if(allmovies !== null)
    {
        console.log(allmovies);
        var myJson = JSON.stringify(allmovies);
        res.status(200).json({param : myJson});
    }
    else {
        res.status(403).json({error:"there was an error"})
    }
});

app.post('/comments' , (req,res) =>
{
    const moviecomments = req.body;
    let commenting = moviecomments[1];

    //This details should get me the id and the comment respectively
    console.log(commenting[0]);
    console.log(commenting[1]);

    let movieid = commenting[0];
    let commentnew = new comment(commenting[1]);

    // allcommentsnra.push(commentnew);

    // For this to work get the commentsnra object in the file that matches the id of the comment
    // edit it and then write to file

    for(let i = 0 ; i<allcommentsnra.length ; i++)
    {
        let comnrdetails  = allcommentsnra[i].id;
        console.log("Within the loop " + movieid + " and the comparing one " + comnrdetails);
        if(comnrdetails === movieid)
        {
            allcommentsnra[i].comments.push(commentnew);
            let usercomments = JSON.stringify(allcommentsnra , null , 2);
            userfile.writeFile('commentsandratings.json' , usercomments , finished);
            function finished(error)
            {
                if(error)
                {
                    console.log("There was an error , no data added to the file");
                }
                else
                {
                    var myJson = JSON.stringify(allcommentsnra);
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
    const movieratings = req.body;
    let ratings = movieratings[1];

    //This details should get me the id and the rating to put
    console.log(ratings[0]);
    console.log(ratings[1]);

    let movieid = ratings[0];
    for(let i = 0 ; i<allcommentsnra.length ; i++)
    {
        let comnrdetails  = allcommentsnra[i].id;
        console.log("Within the loop " + movieid + " and the comparing one " + comnrdetails);
        if(comnrdetails === movieid)
        {
            allcommentsnra[i].rate += parseInt(ratings[1], 10);
            allcommentsnra[i].num += 1;
            let usercomments = JSON.stringify(allcommentsnra , null , 2);
            userfile.writeFile('commentsandratings.json' , usercomments , finished);
            function finished(error)
            {
                if(error)
                {
                    console.log("There was an error , no data added to the file");
                }
                else
                {
                    var myJson = JSON.stringify(allcommentsnra);
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
    if(allcommentsnra !== null)
    {
        console.log(allcommentsnra);
        var myJson = JSON.stringify(allcommentsnra);
        res.status(200).json({param : myJson});
    }
    else {
        res.status(403).json({error:"there was an error"})
    }
});

app.delete('/deletemovie/:id',(req,res) => {

    const movieiddits = req.params.id;
    console.log("Data that has been sent " + movieiddits);
    for(let i=0 ; i<allmovies.length ; i++)
    {
        let current_movieid = allmovies[i].id;
        console.log("The real ids " +movieiddits + " "+" the comparing ud " + current_movieid);
        if(movieiddits === current_movieid)
        {
            const index = allmovies.indexOf(allmovies[i]);
            console.log("This is the index of the movie to be deleted " + index);
            console.log("A match has been found for the movies");
            console.log("The real ids " +movieiddits + " "+" the comparing ud " + current_movieid);
            if (index > -1) {
                allmovies.splice(index, 1);
                for(let i=0 ; i<allcommentsnra.length ; i++)
                {
                    let current_mommentraid = allcommentsnra[i].id;
                    console.log("The real ids " + movieiddits + " "+" the comparing ud " + current_mommentraid);
                    if(movieiddits === current_mommentraid)
                    {
                        console.log("A match has been found for the comments");
                        const index = allcommentsnra.indexOf(allcommentsnra[i]);
                        console.log("This is the index of the movie to be deleted " + index);
                        if (index > -1) {
                            allcommentsnra.splice(index, 1);
                          // Rewritting the file
                            //There are two files
                            let datastr = JSON.stringify(allmovies , null , 2);
                            userfile.writeFile('moviedata.json' , datastr , finished);
                            function finished(error)
                            {
                                if(!error)
                                {
                                    console.log("Movie removed from the file");
                                    let usercomments = JSON.stringify(allcommentsnra , null , 2);
                                    userfile.writeFile('commentsandratings.json' , usercomments , finished);
                                    function finished(error)
                                    {
                                        if(!error)
                                        {
                                            console.log("Comments has been removed from the file");
                                            let mymovies = JSON.stringify(allmovies);
                                            let mycomments = JSON.stringify(allcommentsnra);
                                            res.status(200).json({ commnra : mycomments , movies : mymovies});
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


