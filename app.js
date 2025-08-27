const http = require('http');
const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-type', 'text-plain');
  res.end('mi primer API updated');
}) 

server.listen(port, hostname);