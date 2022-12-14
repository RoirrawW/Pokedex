import express from 'express';
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import pokemonRouter from "./routes/pokemon.js";
import cors from "cors";
import session from 'express-session';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const db = process.env.BDD_URL;
const app = express()
const router = express.Router()

app.use(session({secret: process.env.SECRET_KEY, saveUninitialized: true,resave: true}))
app.use(cors())
app.use(express.static("./assets"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
router.use(userRouter)
router.use(pokemonRouter)

router.get("/*", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT, function(err){
    if (err) {
        console.log(err);
    }else{
        console.log(`connected at ${process.env.APP_URL}`);
    }
})

mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connected to database mongodb");
    }
})


export default router

