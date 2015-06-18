/**
 * Created by Umer on 6/18/2015.
 */

var port = 3030;
var msgs = {};
var bodyParser = require('body-parser');
var express = require('express');
var monk = require('monk');

var app = express();
var db = monk('localhost:27017/nodetest1');
var jsonParser = bodyParser.json();


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    next();
});

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.post("/data/*", jsonParser, function (req, res) {

// Set our collection
    var collection = db.get('messagescollection');

// Submit to the DB
    collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
        }

    });
});


app.use('/', express.static(__dirname + '/public'));

app.get("/data", function (req, res, next) {
    var collection = db.get('messagescollection');
    collection.find({}, {}, function (e, docs) {
        //console.log(docs);
        res.send(docs);
    });
});


var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);

});



