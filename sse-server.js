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

    let progress = 0;

    const sendProgressEvent = () => {
      progress = (progress + Math.floor(Math.random() * 15) + 5) % 101;

      const payload = {
        timestamp: new Date().toISOString(),
        messageKey: 'SSE.PROGRESS_MESSAGE',
        value: progress
      };

      res.write('event: progress\n');
      res.write('data: ' + JSON.stringify(payload) + '\n\n');
    };

    sendProgressEvent();
    const interval = setInterval(sendProgressEvent, 5000);

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