
var http = require('http');
var path = require('path');
var express = require('express');

var app = express();
var server = http.createServer(app);

app.get('/:ID', function(req, res) {
  console.log('got this: '+req.params.ID);
  
  var response = undefined;
  var timestamp = Date.parse(req.params.ID);
  //console.log(timestamp);
  if (isNaN(parseInt(req.params.ID)) == false)
  {
    console.log("It's a date! " + req.params.ID);
    var u = new Date(parseInt(req.params.ID));
    response = { unix: u.getTime(), natural: u.toDateString()};
  }
  else if (isNaN(timestamp) == false)
  {
    console.log("It's a date! " + timestamp);
    var d = new Date(timestamp);
    response = { unix: d.getTime(), natural: d.toDateString()};
  }
  else
  {
    console.log("Not a date!");
    response = { unix: null, natural: null };
  }
  res.end(JSON.stringify(response));
});

app.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Timestamp server listening at", addr.address + ":" + addr.port);
});
