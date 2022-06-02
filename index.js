var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var path = require('path');

var app_start = require('./app_start');
var port = PORT;

// User controllers
var debugController = require('./controllers/debugController');
var searchController = require('./controllers/searchController');
var resultController = require('./controllers/resultController');
const { BlockList } = require('net');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use generic resources
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/tinyMCE', express.static(path.join(__dirname, '/node_modules/tinymce')));

// Use app resources
app.use('/js', express.static(path.join(__dirname, '/resources/js')))
app.use('/css', express.static(path.join(__dirname, '/resources/css')))
app.use('/content', express.static(path.join(__dirname, '/resources/content')))

// Set favicon
app.use(favicon(path.join(__dirname, '/resources/content/favicon.ico')));

// Set template
app.set('views', path.join(__dirname,'./views/ejs'));
app.set('view engine', 'ejs');



// Basic rooting
app.get('/', function(req, res)
{
    res.render('index', {title: 'KS',
                        displayStyle: "block"});
});

app.get('/debug', function(req, res)
{
    var dataPromise = debugController.getData();
    
    dataPromise.then(function(result) {
        res.render('debug', {dataList: result,
                                displayStyle: "block"});
    });
});

// Search rooting
app.post('/search', function(req, res)
{
    var dataPromise = searchController.getDocuments(req.body.search);

    dataPromise.then(function(result) {
        res.render('searchResults', {dataList: result,
                                        displayStyle: "block"});
    });

});

// Result Rooting
app.get('/insert', function(req, res)
{
    res.render("result", {title: '',
                          documentText: '',
                          keywords: [],
                          id: ""});
});

app.post('/result/formSubmit', function(req, res)
{
    var title = req.body.title;
    var documentText = req.body.documentText;
    var id = req.query.id;
    var keywords = req.body.keywords;

    var promise = null;

    if(id && id !== "0")
        promise = resultController.insertorUpdateDocument(id, title, documentText, keywords);
    else
        promise = resultController.insertorUpdateDocumentWithouID(title, documentText, keywords);

        promise.then(function(result) {
            
            var dataPromise = null;

            if(id && id !== "0")
            dataPromise = resultController.getDocumentById(id);
            else 
            dataPromise = resultController.getDocument({
                title: title,
                data: documentText,
                keywords: keywords
            });

            dataPromise.then(function(dataResult) 
            {
                res.redirect('/result?id='+dataResult._id);
            });
        });
});

app.get('/result', function(req, res)
{
    var dataPromise = resultController.getDocumentById(req.query.id);
    
    dataPromise.then(function(result) {
        res.render('result', {title: result.title,
                            documentText: result.data,
                            keywords: result.keywords,
                            id: result._id});
    });
});

// Start Server
app.listen(port, function() {
    console.log("Server - WEB APP - is listening on port: " + port)
});