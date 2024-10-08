const https = require('https');
const fs = require('fs');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'projectbim.cl';
const port = 443;

const options = {
  key: fs.readFileSync('/home/project/ssl/keys/df823_b098b_a6094588e439c38a5dc74d9f1325ff8e.key'), // Ruta a tu archivo .key
  cert: fs.readFileSync('/home/project/ssl/certs/projectbim_cl_df823_b098b_1736135299_3dd40c50fa44d04ca9601b8667058f13.crt'), // Usar el archivo correcto aquí
  ca: [
    fs.readFileSync('/home/project/ssl/certs/projectbim_cl_df823_b098b_1736135299_3dd40c50fa44d04ca9601b8667058f13.crt'), // Archivo principal (si corresponde)
    // Agregar aquí otros certificados intermedios si están disponibles
  ],
};

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
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
      res.end('internal server error');
    }
  }).listen(port, () => {
    console.log(`> Ready on https://${hostname}:${port}`);
  });
});
