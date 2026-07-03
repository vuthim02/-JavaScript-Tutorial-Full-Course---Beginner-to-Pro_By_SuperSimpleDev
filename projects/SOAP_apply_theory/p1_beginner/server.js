const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const SOAP_URL = 'http://www.dneonline.com/calculator.asmx';

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/soap-proxy') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const soapAction = req.headers['soapaction'] || '';

      const options = {
        hostname: 'www.dneonline.com',
        port: 80,
        path: '/calculator.asmx',
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'Content-Length': Buffer.byteLength(body),
          'SOAPAction': soapAction,
        },
      };

      const proxyReq = http.request(options, proxyRes => {
        let data = '';
        proxyRes.on('data', chunk => data += chunk);
        proxyRes.on('end', () => {
          res.writeHead(proxyRes.statusCode, {
            'Content-Type': 'text/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
          });
          res.end(data);
        });
      });

      proxyReq.on('error', err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      });

      proxyReq.write(body);
      proxyReq.end();
    });
    return;
  }

  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`SOAP Lab running at http://localhost:${PORT}`);
});
