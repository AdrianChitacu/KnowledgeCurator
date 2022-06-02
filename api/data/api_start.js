const staticDataRepo = require('./database/repos/staticDataRepo')
const documentsRepo = require('./database/repos/documentsRepo');

global.SERVER = 'http://localhost';
global.PORT = 8020;

async function api_init()
{
    await staticDataRepo.loadData();
    await documentsRepo.loadInitialDocument();
}

module.exports = {api_init}