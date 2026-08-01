import mongoose, {model, Schema} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl=process.env.JWT_URL;

if(!mongoUrl){
    throw new Error("Mongo URL not found")
}
mongoose.connect(mongoUrl);


const UserSchema=new Schema({
    username:{type:String,unique:true},
    password:{type:String},
})
export const UserModel=model("User",UserSchema);


const ContentSchema=new Schema({
    title:String,
    link:String,
    type:{type:String,required:true},
    tags:[{type:mongoose.Types.ObjectId,ref:'tag'}],
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true}
})
export const ContentModel=model("Content",ContentSchema);
