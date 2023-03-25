// var http = require("http");

// var server = http.createServer(function (request, response) {
//   if (request.method == "POST") {
//     var body = "";
//     request.on("data", function (data) {
//       body += data;
//     });
//     request.on("end", function () {
//       var POST = JSON.parse(body);
//       // POST is the post data
//     });
//   }
// });
// server.listen(80);

const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require("body-parser");
const fs = require("fs");

var port = 3000;

app.listen(port, function () {
  console.log("We are listening on port " + port);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/upload.html"));
});

app.post("", function (req, res) {
  var num = req.body.value;
  console.log(num);
  fs.writeFile("package.json", num, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  return res.end("done");
});
