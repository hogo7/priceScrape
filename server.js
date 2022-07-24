const express = require('express');
const grab = require('./grab.js');
const bodyParser = require('body-parser');
const app=express()
const port=3000
// make it faster with alredy opened browser
// const browser = require('./browsr.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.send({"message":"hello from express"})
})



app.post("/product",async(req,res)=>{
    let url= req.body.url;
    console.log(url);

    await grab.get_product(url).then((data)=>{res.send(data)});
})



app.listen(port,()=>{
    console.log(`waiting for request on port: ${port} ... `);
})