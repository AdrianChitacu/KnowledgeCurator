var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var path = require('path');

// API Funtions

// Start
var api = require('./api_start');
var port = PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// API Routes

// Default
app.get('/', (req, res) => {
    res.end(JSON.stringify({status: 'OK'}));
})


// Test Function
app.get('/data/healthCheck', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        status: 'OK'
    }));
});

// Start Server
app.listen(port, function() {
    console.log("Server - FILE API - is listening on port: " + port)

    api.api_init();
});