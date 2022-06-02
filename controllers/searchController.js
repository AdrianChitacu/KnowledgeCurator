var http = require('http'); 

var response;

// General Vars
apiHost = "localhost";
apiPort = 8020

async function getDocuments(filter)
{
   if(!filter)
   {
      return await apiCall_getAllDocuments();
   }
    // Validate string filters
   return await getDocumentsByTitle(filter);
}

async function getDocumentsByTitle(title)
{
   return await apiCall_getDocumentsByTitle(JSON.stringify({title: title}));
}

async function apiCall_getDocuments(requestData)
{
   var options = {
      host: apiHost,
      port: apiPort,
      path: '/data/getDocuments',
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

async function apiCall_getDocumentsByTitle(requestData)
{
   var options = {
      host: apiHost,
      port: apiPort,
      path: '/data/getDocumentsByTitle',
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

async function apiCall_getAllDocuments()
{
   var options = {
      host: apiHost,
      port: apiPort,
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



module.exports = {getDocuments, getDocumentsByTitle};