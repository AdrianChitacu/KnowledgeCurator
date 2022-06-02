var http = require('http'); 

var response;

// General Vars
apiHost = "localhost";
apiPort = 8020

async function getDocumentById(docRequest)
{
   var data = await apiCall_getDocument(JSON.stringify({_id: docRequest}));

   var returnData = data[0];

   returnData.data = ensureData(returnData.data);

   return returnData;
}

async function getDocument(docRequest)
{
   var data = await apiCall_getDocument(JSON.stringify(docRequest));

   var returnData = data[0];

   returnData.data = ensureData(returnData.data);

   return returnData;
}

function ensureData(data)
{
   if(data)
   {
      if(!data.startsWith('<p>'))
      {
         data = `<p>${data}</p>`      
         data = data.replace(/(?:\r\n|\r|\n)/g, '<br>');
      }
   }
   console.log(data);

   return data;
}

async function insertorUpdateDocument(id, title, text, keywords)
{
   await apiCall_insertOrUpdateDocument(JSON.stringify({_id: id,
                                                         title: title,
                                                         keywords: keywords,
                                                         data: text,
                                                         source: "Form",
                                                         type: "HTML"}));
}

async function insertorUpdateDocumentWithouID(title, text, keywords)
{
   await apiCall_insertOrUpdateDocument(JSON.stringify({
                                                         title: title,
                                                         keywords: keywords,
                                                         data: text,
                                                         source: "Form",
                                                         type: "HTML"
                                                      }));
}

async function apiCall_getDocument(requestData)
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

async function apiCall_insertOrUpdateDocument(requestData)
{
   var options = {
      host: apiHost,
      port: apiPort,
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
   } 
   catch (error)
   {
      console.error(error);
   }
}

module.exports = {getDocumentById,
                  getDocument,
                  insertorUpdateDocument,
                  insertorUpdateDocumentWithouID};