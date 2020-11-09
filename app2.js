const http = require('http');

const hostname = '127.0.0.1';
var port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});