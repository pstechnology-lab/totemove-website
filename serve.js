const http = require('http');
const fs = require('fs');
const path = require('path');

const mime = { html: 'text/html', css: 'text/css', js: 'text/javascript', svg: 'image/svg+xml', ico: 'image/x-icon' };

http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  const filePath = path.join('.', urlPath === '/' ? 'index.html' : urlPath);
  const ext = path.extname(filePath).slice(1);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(3000, () => console.log('Serving on port 3000'));
