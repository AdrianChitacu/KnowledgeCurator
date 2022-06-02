var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// API Funtions
var documentTypesAPI = require('./api_functions/document_types');
var documentsAPI = require('./api_functions/documents');
var debugAPI = require('./api_functions/debug');

// Start
var api = require('./api_start');
var port = PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(error, req, res, next) {
    console.log("Got Request: " + JSON.stringify(req.body));
    console.log("Sent Response: " + JSON.stringify(res.body));
    
    if(error)
        throw error;

    next();
});

// API Routes
app.get('/data/getDocumentTypes', (req, res) => {

    var dataPromise = documentTypesAPI.getAllTypes();

    dataPromise.then(function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    });
});

app.get('/data/getAllDocuments', (req, res) => {

    var dataPromise = documentsAPI.getAllDocuments();

    dataPromise.then(function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    });
});

app.post('/data/insertOrUpdate', (req, res) => {

    var dataPromise = documentsAPI.insertOrUpdateDocument(req.body);

    dataPromise.then(function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    });

});

app.post('/data/getDocuments', (req, res) => {

    var dataPromise = documentsAPI.getDocuments(req.body);

    dataPromise.then(function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    });
});

app.post('/data/getDocumentsByTitle', (req, res) => {

    var dataPromise = documentsAPI.getDocumentsByTitle(req.body.title);

    dataPromise.then(function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    });
});


// Default
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({status: 'OK'}));
})

// Test Function
app.get('/data/healthCheck', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        status: 'OK'
    }));
});

app.get('/data/test', (req, res) => {

    var dataPromise = debugAPI.test();

    dataPromise.then( (result) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
}   );
});

// Start Server
app.listen(port, function() {
    console.log("Server - DATA API - is listening on port: " + port)

    api.api_init();
});