import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {ContentModel, UserModel} from "./db";
import dotenv from "dotenv";
import { userMiddleware } from "./middleware";

dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const JWT_URL=process.env.JWT_URL;

if (!JWT_URL) {
  throw new Error("JWT_URL is not defined");
}

const app=express()
app.use(express.json())

app.post("/api/v1/signup",async (req,res)=>{
    //zod validation,hash the password
    const username=req.body.username;
    const password=req.body.password;

    try{
        await UserModel.create({
        username:username,
        password:password,
        })

        res.json({
            message:"User signed up"
        })
    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
})

app.post("/api/v1/signin",async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const existingUser=await UserModel.findOne({
        username,
        password
    })
    if(existingUser){
        const token=jwt.sign({
            id: existingUser._id
        },JWT_SECRET)
        res.json({
            token
        })
    }else{
        res.status(403).json({
            message:"Incorrect Credentials"
        })
    }
})

app.post("/api/v1/content",userMiddleware,async (req,res )=>{
    const title=req.body.title;
    const type=req.body.type;
    const link=req.body.link;
    await ContentModel.create({
        title,
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags:[]
    })
    res.json({
        message: "Content added"
    })
})

app.get("/api/v1/content",userMiddleware,async (req,res)=>{
    //@ts-ignore
    const userId=req.userId;
    const content=await ContentModel.find({
        userId
    }).populate("userId","username")
    res.json({
        content
    })
})

app.delete("/api/v1/content",userMiddleware,async  (req,res  )=>{
    const contentId=req.body.contentId;
    await ContentModel.deleteMany({
        _id:contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message:"Content deleted"
    })
})

app.post("/api/v1/brain/share",(req,res)=>{
    
})

app.get("/api/v1/brain/:shareLink",(req,res)=>{
    
})

app.listen(3001)