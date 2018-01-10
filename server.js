
var http = require('http');
var path = require('path');
var express = require('express');

var app = express();
var server = http.createServer(app);

app.get('/:ID', function(req, res) {
  console.log('got this: '+req.params.ID);
  
  res.end();
});

app.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Timestamp server listening at", addr.address + ":" + addr.port);
});
