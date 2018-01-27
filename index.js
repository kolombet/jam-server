"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public", { maxAge: 30 * 86400000 }));
let packages = [];
class Package {
}
app.get("/", (req, res) => {
    res.send("it's alive!");
});
app.get("/secretDebug", (req, res) => {
    res.send(JSON.stringify(packages));
});
app.get("/getPackage", (req, res) => {
    const message = packages[packages.length - 1];
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
        p.message = req.body.message || "";
        packages.push(p);
        res.send("ok");
        return;
    }
    res.send("bad data");
});
app.listen(3000);
//# sourceMappingURL=index.js.map