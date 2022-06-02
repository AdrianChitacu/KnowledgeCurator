const staticDataRepo = require('./api/data/database/repos/staticDataRepo')

global.SERVER = 'http://localhost';
global.PORT = 8010;

function app_init()
{
    staticDataRepo.loadData();
}

module.exports = {app_init}