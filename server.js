const https = require('https');
const fs = require('fs');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// ✅ Rutas a los certificados de Let's Encrypt
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/projectbim.cl/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/projectbim.cl/fullchain.pem'),
};

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // ✅ Pasar 'options' al createServer y luego la función de manejo
  https.createServer(options, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, '0.0.0.0', () => {
    console.log(`> Ready on https://${hostname}:${port}`);
  });
});