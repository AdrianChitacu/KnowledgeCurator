const dbClient = require('../db_client');

// Import Data JSON 
const documentTypes = require('../static_data/document_types.json');
const sources = require('../static_data/sources.json')

// Collections
const docTypesColl = 'Document_Types';
const sourcesColl = 'Sources';

async function loadData()
{
    await dbClient.init();

    await loadDocumentTypes();
    await loadSources();

    await dbClient.close();
}

async function loadDocumentTypes()
{
    for(const element of documentTypes) {
        await dbClient.updateOrInsert(docTypesColl, element, element);
    };   
}

async function loadSources()
{
    for(const element of sources) {
        await dbClient.updateOrInsert(sourcesColl, element, element);
    }; 
}

async function getAllDocumentTypes()
{
    await dbClient.init();

    var data = await dbClient.findAll(docTypesColl);

    await dbClient.close();

    return data;
}

async function getAllSources()
{
    await dbClient.init();

    var data = await dbClient.findAll(sourcesColl);

    await dbClient.close();

    return data;
}

module.exports = {loadData, getAllDocumentTypes, getAllSources};

