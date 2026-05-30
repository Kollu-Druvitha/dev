//1.create a backend server in node.js, tht returns the sum endpoint
//2.write an html file, tht hits the backend server using the fetch api
const express = require('express');
const app = express();

const cors=require('cors');

app.use(express.json());
app.use(cors()); //it allows requests from any frontend domains
// app.cors({
//     origin:'https://google.com',"https://example.com"     //whenever its required to restrict to certain domains, we can use this syntax
// })

// app.get("/",function(req,res){           //this hosts both frontend and backend on a single endpoint 
//     res.sendFile(__dirname + "public/index.html");      which doesn't require cors, but it is not a good practice to host both frontend and backend on a single endpoint
// })

app.post("/sum",function(req,res){
    const a=parseInt(req.body.a);
    const b=parseInt(req.body.b);
    const sum=a+b;
    res.json({sum});
})

app.listen(3000);