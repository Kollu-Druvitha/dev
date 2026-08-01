"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./middleware");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
const JWT_URL = process.env.JWT_URL;
if (!JWT_URL) {
    throw new Error("JWT_URL is not defined");
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", async (req, res) => {
    //zod validation,hash the password
    const username = req.body.username;
    const password = req.body.password;
    try {
        await db_1.UserModel.create({
            username: username,
            password: password,
        });
        res.json({
            message: "User signed up"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await db_1.UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
});
app.post("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const title = req.body.title;
    const type = req.body.type;
    const link = req.body.link;
    await db_1.ContentModel.create({
        title,
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
});
app.get("/api/v1/content", (req, res) => {
});
app.delete("/api/v1/content", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
app.listen(3001);
//# sourceMappingURL=index.js.map