
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    jwt = require('jsonwebtoken');


const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.listen(port, () => console.log('Hello world app listening on port ${port}!'));
let users = [];
app.post('/signup', (req, res) =>
{
    const user = req.body;
    console.log(user);
    users.push(user);

    console.log(users);
    if(user != null)
    {
        jwt.sign({user},'secretkey' , (error,token)=>{
                res.status(200).json({token : token})
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


