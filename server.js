
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    jwt = require('jsonwebtoken');

const user = require('./user');
let userfile = require('fs');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.listen(port, () => console.log('Hello world app listening on port ${port}!'));

let fileread = userfile.readFileSync('userdata.json');
let allusers = JSON.parse(fileread);

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
app.post('/addmovie', (req, res) =>
{
    const movie = req.body;
    let moviedata = movie[1];
    console.log(moviedata[0]);
    console.log(moviedata[1]);
    console.log(moviedata[2]);
    console.log(moviedata[3]);
    console.log(moviedata[4]);


    let userob = new user(userfromnet[0] , userfromnet[1] , userfromnet[2]);
    allusers.push(userob);
    console.log("This is the created user : " + userob.display());

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


