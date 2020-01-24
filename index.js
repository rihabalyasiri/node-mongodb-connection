const mongoose = require("mongoose");
const keys = require("./config/keys");
const fs = require("fs");
const http = require("http");
const url = require("url");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }); //connect to mongoodb through mongoose
const Cat = mongoose.model("Cat", { name: String }); //new collection erstellen

const kitty = new Cat({ name: "Zildjian" }); //new record erstellen in above collection
kitty.save().then(() => console.log("meow")); //save record in the collection

const tempLogin = fs.readFileSync(`${__dirname}/login.html`, "utf-8");

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/login") {
    res.writeHead(200, {
      "Content-type": "text/html"
    });

    res.end(tempLogin);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world"
    });
    res.end("<h1>Page not found!</h1>");
  }
});




server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

//connect to mongodb without mongoose
// var MongoClient = require('mongodb').MongoClient;
// var urlMongo = keys.mongoURI;

// MongoClient.connect(urlMongo, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   dbo.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });
