const express = require('express');
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");
const secretKey ="secretKey";

const PORT = 3000

const app = express()

app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.json('hi restaurants')
})

app.get("/users", (req, res) =>{
    res.json('Hello from server')
})

app.post("/users",(req,res)=>{
    const user={
        id:1,
        username:"rk",
        email:"rk@test.com"
    }
    jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
        res.json({token})
    })
})

app.post("/profile",verifyToken,(req,res)=>{
jwt.verify(req.token,secretKey,(err,authData)=>{
    if(err){
        res.send({result:"invalid token"})
    }else{
        res.json({message:"profile accessed",authData})
    }
})
})

function verifyToken(req,res,next){
const bearerHeader= req.headers['Authorization'];
if(typeof bearerHeader !== 'undefined'){
const bearer= bearerHeader.split(" ");
const token= bearer[1];
req.token=token;
next();
} else{
    res.send({
        result:'Token is not valid'
    })
}

}
app.listen(3000,()=>{
    console.log('server running on localhost:' + PORT);
});