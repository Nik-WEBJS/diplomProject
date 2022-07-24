import express from "express";
import mongoose from "mongoose";
import {registerValidator, loginValidator, postCreateValidator} from "./validation.js";
import checkAuth from './utils/checkAuth.js';
import * as PostController  from "./controllers/PostController.js"
import * as UserController from "./controllers/UserController.js";

mongoose.connect('mongodb+srv://admin:QWE123@cluster0.2q58cpl.mongodb.net/blog?retryWrites=true&w=majority').then(()=>
    console.log(
        "DB OK"
    ))
    .catch((err)=>console.log("DB error",err))

const app = express();

app.use(express.json());

app.post('/auth/login',loginValidator, UserController.login)
app.post('/auth/register',registerValidator, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/posts',checkAuth, postCreateValidator, PostController.create)
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id',checkAuth, PostController.remove)
app.patch('/posts/:id',checkAuth, PostController.update)

app.listen(4444, (err)=>{
    if(err){
        return console.log(err)
    }
    console.log("server ok")
});