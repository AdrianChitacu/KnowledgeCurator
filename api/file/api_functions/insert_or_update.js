var http = require('http'); 

var response;

async function insertOrUpdate(requestData)
{
   var options = {
      host: "localhost",
      port: 8020,
      path: '/data/insertOrUpdate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': requestData.length
      }
   }
           
   var responseData = '';

   try {
      var req = new Promise((resolve, reject) => {
         
      var post = http.request(options, (res) => {

         res.on('data', (chunk) => {
            responseData += chunk;
         });

         res.on('end', () => {
            response = responseData;
            resolve(response);
         });
      
      })

      post.write(requestData);
      post.end();

      });

      await req;

   return JSON.parse(response);
   } 
   catch (error)
   {
      console.error(error);
   }

}

module.exports = {insertOrUpdate}