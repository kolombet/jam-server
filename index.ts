import * as express from "express";
let app = express();

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', "true");

  // Pass to next layer of middleware
  next();
});

// app.all('*', function(req, res,next) {
//   /**
//    * Response settings
//    * @type {Object}
//    */
//   var responseSettings = {
//       "AccessControlAllowOrigin": req.headers.origin,
//       "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
//       "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
//       "AccessControlAllowCredentials": true
//   };

//   /**
//    * Headers
//    */
//   res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials.toString());
//   res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin.toString());
//   res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'].toString() : "x-requested-with");
//   res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'].toString() : responseSettings.AccessControlAllowMethods);

//   if ('OPTIONS' == req.method) {
//       res.send(200);
//   }
//   else {
//       next();
//   }
// });

let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(__dirname + "/public", { maxAge: 30*86400000 }));

let packages:Array<Package> = [];
class Package {
  x:number;
  y:number;
  locationName:string;
  message:string;
}

app.get("/", (req, res) => {
  res.send("it's alive!");
});

app.get("/secretDebug", (req, res) => {
  res.send(JSON.stringify(packages));
})

app.get("/getPackage", (req, res) => {
  const message = packages[packages.length-1];
  res.send(JSON.stringify(message));
});

app.post("/sendPackage", (req, res) => {
  console.log("got package ");
  if (req.body) {
    console.log("body got " + JSON.stringify(req.body));
    const p = new Package();
    p.locationName = req.body.locationName || "";
    p.x = req.body.x || "";
    p.y = req.body.y || "";
    p.message  = req.body.message || "";
    packages.push(p);
    res.send("ok");
    return;
  }
  res.send("bad data");
});

app.listen(8080);
