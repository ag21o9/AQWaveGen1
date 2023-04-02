const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbf = require("./src/dbfile");
require('dotenv').config()
const path = require("path");
const port = 3000


p = mongoose.connect("mongodb+srv://Abhijeet2109:abhijeet21o9@cluster0.ohwhhle.mongodb.net/?retryWrites=true&w=majority"
);

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/signup", async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var pass = req.body.password;
  var pass2 = req.body.confirm_password;

  if (pass === pass2) {
    try {
      var data = new dbf({
        name: name,
        email: email,
        password: pass,
      });

      const v = await data.save();
      // res.sendFile("signup successfull");
      res.render("signin");
    } catch (e) {
      console.log(e);
    }
  } else {
    res.render("index", {
      invalid: "password is invalid",
    });
  }
});

app.post("/verify", async (req, res) => {
  var em = req.body.idn;
  var psw = req.body.pswn;

  try {
    // const d = new dbf;
    const da = await dbf.find({ email: em });
    if (da[0]["password"] === psw) {
      res.render("homepage");
    } else {
      res.render("signin", { invalid: "Invalid ID password" });
    }
  } catch (e) {
    // console.log(e);
    res.render("signin", { invalid: "Invalid ID password" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  // res.send("Hello World!");
  res.render("homepage");
});
app.get("/signin", (req, res) => {
  // res.send("Hello World!");
  res.render("signin");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
