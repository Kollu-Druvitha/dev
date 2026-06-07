//create a midddlewre tht logs each incoming requests HTTP method,
//URL, and timstamp to the console

const express=require("express")
const app=express()

function loggermiddleware(req,res,next){
    console.log("Method is "+req.method);
    console.log("URL is "+req.url);
    console.log("Time is "+new Date());
    next(); 
}


app.use(loggermiddleware);

app.get("/sum",function(req,res){
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.json({
        sum: a+b
    })
});

app.get("/multiply",function(req,res){
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.json({
        product: a*b
    })
});

app.listen(3001);