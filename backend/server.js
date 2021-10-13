import express, { request } from "express";
// import { Mongoose } from "mongoose";
import connectDB from "./config/db.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// import {Profile, User, Auth, Post} from './routes'
import Profile from './routes/api/profile.js'
import User from './routes/api/users.js'
import Auth from './routes/api/auth.js'
import Post from './routes/api/post.js'

const PORT = process.env.PORT || 5000;
connectDB()

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use('/api/users',User)
app.use('/api/auth',Auth)
app.use('/api/post',Post)
app.use('/api/profile',Profile)