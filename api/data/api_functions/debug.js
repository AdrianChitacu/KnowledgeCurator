const dbClient = require('../database/db_client');

async function test()
{
    await dbClient.init();

    var testData = await dbClient.test();

    await dbClient.close();

    return testData;
}

module.exports = {test};