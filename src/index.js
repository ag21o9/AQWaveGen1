const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbf = require("./dbfile");
const path = require("path");
const port = 3000;

p = mongoose.connect("mongodb://localhost:27017/registerpage");

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
      res.send("signup successfull");
    } catch (e) {
      console.log(e);
    }
  } else {
    res.render("index",{
        "invalid":"password is invalid"
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
