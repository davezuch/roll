// BASE SETUP
var express = require('express');
var app = express();
var port = process.env.PORT || 80;

// ROUTES
var router = express.Router();

router.get('/', function(req, res) {
    var roll = req.query.text;
    if(!roll) {
        res.send('No die paramaters passed!');
        return;
    }

    var parse = roll.match(/(\d)*d(\d+)/);
    if(!parse) {
        res.send('Invalid dice paramater: ' + roll);
        return;
    }

    var dice = parseInt(parse[1] || 1);
    var type = parseInt(parse[2]);
    var results = [];
    var total = 0;

    for(var i = 0; i < dice; i++) {
        var j = Math.floor(Math.random() * type) + 1;
        results.push(j);
        total += j;
    }

    res.send(total + (dice > 1 ? ' [' + results.join(', ') + ']' : ''));

    console.log(req.query.text);
});

// REGISTER ROUTES
app.use('/roll', router);


// START SERVER
app.listen(port);
console.log('Magic happens on port ' + port);