const staticDataRepo = require('../database/repos/staticDataRepo');

async function getAllTypes()
{
   return await staticDataRepo.getAllDocumentTypes();
}

module.exports = {getAllTypes}