var documentsRepo = require('../database/repos/documentsRepo');

async function insertOrUpdateDocument(document)
{
    await documentsRepo.insertOrUpdateDocument(document);
}

async function getAllDocuments()
{
    return await documentsRepo.getAllDocuments();
}

async function getDocuments(filter)
{
    return await documentsRepo.getDocuments(filter);
}

async function getDocumentsByTitle(filter)
{
    return await documentsRepo.getDocuments({title: new RegExp(filter,'i')});
}

async function getDocumentById(id)
{
    return await documentsRepo.getDocumentById(id);
}

module.exports = {
    insertOrUpdateDocument,
    getDocumentsByTitle,
    getAllDocuments,
    getDocuments,
    getDocumentById
}