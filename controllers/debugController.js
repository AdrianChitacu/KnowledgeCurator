var http = require('http'); 

var response;

async function getData()
{
   var options = {
      host: "localhost",
      port: 8020,
      path: '/data/getAllDocuments',
      method: 'GET'
   }
           
   var data = '';

   try {
      var req = new Promise((resolve, reject) => {
         
      http.request(options, (res) => {

         res.on('data', (chunk) => {
            data += chunk;
         });

         res.on('end', () => {
            response = data;
            resolve(response);
         });
      
      }).end();

      });

      await req;

   return JSON.parse(response);
   } 
   catch (error)
   {
      console.error(error);
   }

}

module.exports = {getData}