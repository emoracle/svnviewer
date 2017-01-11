var
express = require("express"),
bodyParser = require("body-parser"),
app = express(),
fs = require('fs'),
path = require('path'),
svnUltimate = require('node-svn-ultimate');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
  }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/upload', function (request, respond) {
  var
  body = '',
  filePath = __dirname + '/data/revisions.json';

  request.on('data', function (data) {
    //console.log('server-data: ' + data);
    body += data;
  });

  request.on('end', function () {
    //console.log("Server - end. Schrijf file :" + filePath);
    //console.log("Server - end. body : " + body);

    var obj = JSON.parse(body);
    obj.forEach(function(pad) {
      pad.files.forEach(function(file){
        delete file.svn_version;
      });
      pad.files.sort(function(a,b){
        return (a.name > b.name)?+1:-1;
      });
    });

    body = JSON.stringify(obj);
    //console.log("Server - end. filteredbody : " + body);

    fs.writeFile(filePath, body, function (err) {
      if (err)
        console.log(err);
      console.log("Klaar met schrijven");
      respond.end();
    });
  });
});

app.post('/controleer', function (req, res) {
  var body = '';
  
  req.on('data', function (data) {
    body += data;
  });
  
  req.on('end', function () {
    //console.log('Ontvangen op de server : ' + body);

    svnUltimate.util.getRevision(body, {lastChangeRevision : true}, function (err, revision) {
      if (err) {
        res.end("" + err);
      } else {
        //console.log(body + "  " + revision);
        res.end("" + revision);
      }
    });
  });
});

var server = app.listen(8001, function () {
    console.log("Listening on port %s...", server.address().port);
  });
