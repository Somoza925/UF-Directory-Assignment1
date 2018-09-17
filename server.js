var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {

var parsedUrl = url.parse(request.url);
var data = JSON.stringify(listingData);
if (request.method == 'GET' && parsedUrl.pathname == '/listings'){
    console.log("hi")
    response.writeHead(200, {
      'Content-Type': 'text/plain' });
    
    response.end(data);
} else {
  response.writeHead(404, {
    'Content-Type': 'text/plain' });
  response.end("Bad gateway error");
}


  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
};

var server = http.createServer(requestHandler);

fs.readFile('listings.json', 'utf8', function(err, data) {
  if (err){
    console.log(err);
  }
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
   listingData = JSON.parse(data);

   // a server is created, but not started
   var server = http.createServer(requestHandler);

   server.listen(port, function() {
   //once the server is listening, this callback function is executed
   console.log('Server listening on: http://127.0.0.1:' + port);
    });
});


