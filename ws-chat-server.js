const { WebSocketServer } = require('ws');
const PORT = 3002;
const wss = new WebSocketServer({ port: PORT });

function nowIso() {
  return new Date().toISOString();
}

function sendJson(ws, message) {
  ws.send(JSON.stringify(message));
}

function createMessage(type, payload, from = 'system') {
  return {
    type,
    payload,
    from,
    timestamp: nowIso()
  };
}

function getBotReply(text) {
  const normalized = text.trim().toLowerCase();

  if (normalized.includes('hello') || normalized.includes('hi')) return 'Hello, I am your demo bot.';
  if (normalized.includes('angular')) return 'Angular 19 + RxJS + WebSocket works great.';
  if (normalized.includes('thanks')) return 'You are welcome. Need help with another exercise?';
  if (normalized.includes('bye')) return 'See you later.';
  if (normalized.includes('plexus')) return 'Plexus Tech sounds awesome.';
  return 'Message received. This is a predefined response.';
}

wss.on('connection', (ws) => {
  sendJson(ws, createMessage('status', { text: 'WebSocket connection opened' }));
  sendJson(ws, createMessage('notification', { text: 'Chatbot is ready' }));

  ws.on('message', (raw) => {
    let incoming;

    try {
      incoming = JSON.parse(raw.toString());
    } catch (error) {
      sendJson(ws, createMessage('notification', { text: 'Invalid message: malformed JSON' }));
      return;
    }

    if (!incoming?.type) {
      sendJson(ws, createMessage('notification', { text: 'Invalid message: missing type' }));
      return;
    }

    if (incoming.type === 'ping') {
      sendJson(ws, createMessage('pong', { text: 'pong' }));
      return;
    }

    if (incoming.type === 'chat') {
      const userText = incoming?.payload?.text ?? '';

      sendJson(ws, createMessage('chat', { text: userText }, 'user'));
      sendJson(ws, createMessage('chat', { text: getBotReply(userText) }, 'bot'));
      return;
    }

    sendJson(ws, createMessage('notification', { text: 'Unsupported message type' }));
  });
});

console.log('WebSocket server running on ws://localhost:' + PORT);