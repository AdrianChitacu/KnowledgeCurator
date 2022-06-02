const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const ConnectionString =  "mongodb://localhost:27017";
const DBNAME = "KCDB";

// Connection Clients
var dbClient = null; // DB Server
var KCDB = null; // DB KCDB

async function init()
{
    dbClient = new MongoClient(ConnectionString);
    await dbClient.connect();

    KCDB = dbClient.db(DBNAME);

    console.log('Initialized connection to DB');
}

async function test()
{
    const admin = KCDB.admin();

    return {
        //status: await admin.serverStatus(),
        //databases: await admin.listDatabases(),
        collections: await KCDB.listCollections()
    }
}

async function insertToCollection(collectionName, data)
{
    await KCDB.collection(collectionName).insertMany(data);
}

async function updateOrInsert(collectionName, querry, data)
{
    querry = ensureObject(collectionName, querry);
    data = ensureObject(collectionName, data);

    await KCDB.collection(collectionName).updateOne(querry, {$set: data}, {upsert: true});
}

async function findAll(collectionName)
{
    var data = await KCDB.collection(collectionName).find({}).toArray();

    return data;
}

async function find(collectionName, filter)
{   
    filter = ensureObject(collectionName, filter);

    var data = await KCDB.collection(collectionName).find(filter).toArray();

    return data;
}

async function close()
{
    console.log('Closed DB Connection');

    await dbClient.close();

    dbClient = null;
    KCDB = null;
}

function ensureObject(collectionName, dataObject)
{
    dataObject = ensureID(dataObject);

    return dataObject;
}



function ensureID(dataObject)
{
    if(dataObject && dataObject._id && dataObject._id !== "0")
        dataObject._id = new ObjectId(dataObject._id);
    else if(dataObject)
        delete dataObject._id;

    return dataObject;
}

module.exports = {
     init,
     test,
     insertToCollection,
     updateOrInsert,
     findAll,
     find,
     close}
