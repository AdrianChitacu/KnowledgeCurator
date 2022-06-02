const dbClient = require('../db_client');

var initialDoc = require("../static_data/documents.json");

const documentColl = 'Documents'

async function insertOrUpdateDocument(document)
{
    await dbClient.init();

    if(document._id && document._id !== "0")
        await dbClient.updateOrInsert(documentColl, {_id: document._id}, document);
    else
        await dbClient.updateOrInsert(documentColl, {title: document.title}, document);

    await dbClient.close();
}

async function getAllDocuments()
{
    await dbClient.init();

    var data =  await dbClient.findAll(documentColl);

    await dbClient.close();

    return data;
}

async function getDocuments(filter)
{
    await dbClient.init();

    var data = await dbClient.find(documentColl, filter);
    
    await dbClient.close();

    return data;
}

async function loadInitialDocument()
{
    await dbClient.init();

    for(const doc of initialDoc) {
        await dbClient.updateOrInsert(documentColl, {title: doc.title}, doc);
    };   

    await dbClient.close();
}

module.exports = {
    insertOrUpdateDocument,
    getAllDocuments,
    getDocuments,
    loadInitialDocument
}