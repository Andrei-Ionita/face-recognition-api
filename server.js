const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'andrei',
      database : 'smartbrain'
    }
});

db.select("*").from("users").then(data => console.log(data)); 

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req,res) => {
    res.send(database.users);
});

app.post("/signin", (req,res) => {signin.signinHandler(req, res, db, bcrypt)});

app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get("/profile/:id", (req, res) => {profile.profileHandler(req, res, db)});

app.put("/image", (req, res) => {image.handleImage(req, res, db)});

app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)});

app.listen(3000, () => {
    console.log("I am listening...");
});

/*

/--> res.send("this this is working")
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT --> user 

*/