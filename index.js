const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbf = require("./src/dbfile");
require("dotenv").config();
const path = require("path");
const NewsAPI = require("newsapi");

const newsapi = new NewsAPI("9f133693e41344ef9ea4b3e2eed4df22");

const port = process.env.PORT || 3000;

var d = new Date();
datetoday = d.toISOString().split("T")[0];
d.setDate(d.getDate() - 1);
dateytsday = d.toISOString().split("T")[0];

newsapi.v2
  .everything({
    q: "technology",
    from: dateytsday,
    to: datetoday,
    language: "en",
    page: 2,
  })
  .then((response) => {
    data = response.articles;
  })
  .catch((e) => {
    data = e;
  });
// }

// p = mongoose.connect("mongodb://localhost:27017/registerpage");
p = mongoose.connect(
  "mongodb+srv://Abhijeet2109:abhijeet21o9@cluster0.ohwhhle.mongodb.net/?retryWrites=true&w=majority"
);

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
  console.log("site open")
});

app.use(express.static(path.join(__dirname, "/public")));

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
      // res.render("homepage");
      res.sendFile(path.join(__dirname,"/public/home.html"))
    } else {
      res.render("signin", { invalid: "Invalid ID password" });
    }
  } catch (e) {
    // console.log(e);
    res.render("signin", { invalid: "Invalid ID password" });
  }
});

app.get('/info/:name/:age',(req,res)=>{
  console.log(req.params.name)
  console.log(req.params.age)
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/about", (req, res) => {
  try{
    res.sendFile("about.html")
  }catch{
    res.render("error")
  }
});
app.get("/newspage", (req, res) => {
  // console.log(newsf(0));
  try {
    res.render("news", {
      con: data[0]["title"],
      con1: data[1]["title"],
      con2: data[2]["title"],
      con3: data[3]["title"],
      con4: data[4]["title"],
      con5: data[5]["title"],
      con6: data[6]["title"],
      con7: data[7]["title"],
      con8: data[8]["title"],
      con9: data[9]["title"],
      con10: data[10]["title"],
      desc: data[0]["description"],
      desc1: data[1]["description"],
      desc2: data[2]["description"],
      desc3: data[3]["description"],
      desc4: data[4]["description"],
      desc5: data[5]["description"],
      desc6: data[6]["description"],
      desc7: data[7]["description"],
      desc8: data[8]["description"],
      desc9: data[9]["description"],
      desc10: data[10]["description"],
      urlg: data[0]["url"],
      urlg1: data[1]["url"],
      urlg2: data[2]["url1"],
      urlg3: data[3]["url"],
      urlg4: data[4]["url"],
      urlg5: data[5]["url"],
      urlg6: data[6]["url"],
      urlg7: data[7]["url"],
      urlg8: data[8]["url"],
      urlg9: data[9]["url"],
      urlg10: data[10]["url"],
      imgu: data[0]["urlToImage"],
      imgu1: data[1]["urlToImage"],
      imgu2: data[2]["urlToImage"],
      imgu3: data[3]["urlToImage"],
      imgu4: data[4]["urlToImage"],
      imgu5: data[5]["urlToImage"],
      imgu6: data[6]["urlToImage"],
      imgu7: data[7]["urlToImage"],
      imgu8: data[8]["urlToImage"],
      imgu9: data[9]["urlToImage"],
      imgu10: data[10]["urlToImage"],
    });
  } catch {
    res.render("/error");
  }
});

// urlToImage
// res.
app.get("/home", (req, res) => {
  // res.send("Hello World!");
  res.render("homepage");
});
app.get("/signin", (req, res) => {
  // res.send("Hello World!");
  res.render("signin");
});
app.get("/intp", (req, res) => {
  // res.send("Hello World!");
  res.render("interpret");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
