/**
 * Created by Umer on 6/17/2015.
 */

var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    app.type('text/plain');
    app.status(500);
    res.send('500 -  Server Error');

});
app.use('/home', function (req, res) {
    res.type("text/plain");
    res.status(200);
    res.send('Home page');
});

app.listen(app.get('port'), function () {

    console.log("Application started on " + app.get('port'));

});


