const http = require('http');
const Airtable = require('airtable');

const { AIRTABLE_BASE, AIRTABLE_API_KEY, PORT = 3000 } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

const server = http.createServer((req, res) => {
  if (req.method !== 'POST' || req.url === '/') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
    return;
  }

  const path = req.url.slice(1, req.url.length);
  const table = decodeURIComponent(path);

  let body = '';
  req.on('data', data => {
    body += data;
  });

  req.on('end', () => {
    body = JSON.parse(body);

    base(table).create(body, (error, record) => {
      if (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(error.message);
        return;
      }

      res.end(record.getId());
    });
  });
});

server.listen(PORT);
