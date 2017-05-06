var express = require('express');
var path = require("path");
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function () {

    var app = express();
    var isLedOn = false;

    app.use(express.static('public'));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    var led = new five.Led(9);

    app.get('/blink-led', function (req, res) {
        if (!isLedOn) {
            led.fadeIn();
        }
        else {
            led.fadeOut();
        }

        isLedOn = !isLedOn;

        res.json({'on': isLedOn});
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    });

});
