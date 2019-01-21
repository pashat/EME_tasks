// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!


/**************************************************************************
****************************** csv2json *********************************
**************************************************************************/

// Variable für JSON-Objekt anlegen
const fs = require("fs");

let dataCSV = {};
async function readCsv(path) {
    dataCSV = await new Converter({checkType: true}).fromFile(path);
}
async function writeJson(path) {
    fs.writeFile(path, JSON.stringify(dataCSV, null, 4), error => {
        if (error) {
            console.log("couln't save the file:", error)
        } else {
            console.log("world_data.json saved");
        }
    });
}
(async () => {
    await readCsv("world_data.csv");
    await writeJson("world_data.json");
})();
/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

//https://expressjs.com/en/guide/routing.html

app.get("/items", (req, res) => {
    res.send(dataCSV);
});

app.get("/items/:id", (req, res) => {
    const id = req.params["id"];
    const item = dataCSV.find(x => x.id === parseInt(id));
    if (item === undefined) {
        // https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express
        res.status(400).send(`No id: ${id} in database.`);
    }
    res.send(item);
});

app.get("/items/:id1/:id2", (req, res) => {
    const id1 = req.params["id1"];
    const id2 = req.params["id2"];
    const items = dataCSV.filter(x => parseInt(id1) <= x.id && x.id <= parseInt(id2));
    console.log(items);
    res.send(items);
});

app.get("/properties", (req, res) => {
    const first = dataCSV[0];
    const keys = Object.keys(first);
    res.send(keys);
});

app.post("/items", (req, res) => {
    const newId = dataCSV.length === 0 ? 0 : Math.max.apply(null, dataCSV.map(x => x.id)) + 1;
    const newCountry = {
        id: newId,
        name: req.body.name.toString(),
        birth_rate_per_1000: parseFloat(req.body.birth_rate_per_1000),
        cell_phones_per_100: parseFloat(req.body.cell_phones_per_100)
    };
    console.log("new object:", newCountry);
    dataCSV.push(newCountry);
    res.status(400).send(`country ${newCountry.name} was added to list`)
});

app.get("/properties/:num", (req, res) => {
    const first = dataCSV[0];
    const keys = Object.keys(first);
    const numberOfProperty = req.params["num"];
    const property = keys[numberOfProperty];
    if (property === undefined) {
        // https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express
        res.status(800).send("No such property available");
    } else {
        res.send(property);
    }
});

app.delete("/items", (req, res) => {
    if (dataCSV.length > 0) {
        const country = dataCSV.pop();
        res.status(400).send(`Deleted last country: ${country.name}`);
    } else {
        res.status(800).send("No country left to delete");
    }
});

app.delete("/items/:id", (req, res) => {
    const id = req.params.id;
    const country = dataCSV.find(x => x.id === parseInt(id));
    if (country === undefined) {
        res.status(800).send(`No such id ${id} in database`)
    } else {
        dataCSV = dataCSV.filter(x => x !== country);
        res.send(`Item ${id} was deleted successfully`);
    }
});

// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
