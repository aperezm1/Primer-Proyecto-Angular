const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    const sendEvent = () => {
      const payload = {
        timestamp: new Date().toISOString(),
        message: 'Evento SSE de prueba',
        value: Math.floor(Math.random() * 100)
      };
      res.write('data: ' + JSON.stringify(payload) + '\n\n');
    };

    sendEvent();
    const interval = setInterval(sendEvent, 5000);

    req.on('close', () => {
      clearInterval(interval);
      res.end();
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log('SSE server running on http://localhost:' + PORT + '/events');
});