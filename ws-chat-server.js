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

function getBotReplyKey(text) {
  const normalized = text.trim().toLowerCase();

  if (normalized.includes('hola') || normalized.includes('hello') || normalized.includes('hi')) {
    return 'WS.BOT.HELLO';
  }
  if (normalized.includes('angular')) {
    return 'WS.BOT.ANGULAR';
  }
  if (normalized.includes('gracias') || normalized.includes('thanks')) {
    return 'WS.BOT.THANKS';
  }
  if (normalized.includes('adios') || normalized.includes('adiós') || normalized.includes('bye')) {
    return 'WS.BOT.BYE';
  }
  if (normalized.includes('plexus')) {
    return 'WS.BOT.PLEXUS';
  }

  return 'WS.BOT.DEFAULT';
}

wss.on('connection', (ws) => {
  sendJson(ws, createMessage('status', { textKey: 'WS.STATUS.OPEN' }));
  sendJson(ws, createMessage('notification', { textKey: 'WS.NOTIFICATION.READY' }));

  ws.on('message', (raw) => {
    let incoming;

    try {
      incoming = JSON.parse(raw.toString());
    } catch (error) {
      sendJson(ws, createMessage('notification', { textKey: 'WS.ERROR.INVALID_JSON' }));
      return;
    }

    if (!incoming?.type) {
      sendJson(ws, createMessage('notification', { textKey: 'WS.ERROR.MISSING_TYPE' }));
      return;
    }

    if (incoming.type === 'ping') {
      sendJson(ws, createMessage('pong', { textKey: 'WS.PONG' }));
      return;
    }

    if (incoming.type === 'chat') {
      const userText = incoming?.payload?.text ?? '';

      sendJson(ws, createMessage('chat', { text: userText }, 'user'));
      sendJson(ws, createMessage('chat', { textKey: getBotReplyKey(userText) }, 'bot'));
      return;
    }

    sendJson(ws, createMessage('notification', { textKey: 'WS.ERROR.UNSUPPORTED_TYPE' }));
  });
});

console.log('WebSocket server running on ws://localhost:' + PORT);