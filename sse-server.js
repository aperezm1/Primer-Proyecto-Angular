const http = require('http');
const PORT = 3001;

function createProgressPayload(progress) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    messageKey: 'SSE.PROGRESS_MESSAGE',
    value: progress
  });
}

function sendProgress(res, progress) {
  res.write('event: progress\n');
  res.write('data: ' + createProgressPayload(progress) + '\n\n');
}

function handleSseConnection(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  let progress = 0;

  // Enviar el primer evento inmediatamente
  progress = (progress + Math.floor(Math.random() * 15) + 5) % 101;
  sendProgress(res, progress);

  // Enviar eventos periódicos
  const interval = setInterval(() => {
    progress = (progress + Math.floor(Math.random() * 15) + 5) % 101;
    sendProgress(res, progress);
  }, 5000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
}

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    handleSseConnection(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`SSE server running on http://localhost:${PORT}/events`);
});