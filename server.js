
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    jwt = require('jsonwebtoken');

const user = require('./user');
const movie = require('./movie');
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
app.listen(port, () => console.log('Hello world app listening on port ${port}!'));

let fileread = userfile.readFileSync('userdata.json');
let allusers = JSON.parse(fileread);

let filemovie = userfile.readFileSync('moviedata.json');
let allmovies = JSON.parse(filemovie);

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
    console.log(movied[4].file);
    let newmovie = new movie(movied[0] , movied[1] , movied[2] , movied[3] , movied[4].file);
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


