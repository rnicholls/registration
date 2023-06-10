const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    const mimeType = req.url.match('.css$') ? 'text/css' : 'text/html';

    filePath = path.join(__dirname, filePath);

    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found!');
            return;
        }

        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(content);
    });
});

const port = 3000;
server.listen(port, () => {
    /* eslint-disable no-console */
    console.log('Server running at http://localhost:3000');
    /* eslint-enable no-console */
});
