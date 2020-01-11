
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

let allusers = [];
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


