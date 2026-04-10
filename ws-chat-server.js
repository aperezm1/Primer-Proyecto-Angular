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

  if (normalized.includes('hola')) return 'Hola, soy tu bot de prueba.';
  if (normalized.includes('angular')) return 'Angular 19 + RxJS + WebSocket funciona muy bien.';
  if (normalized.includes('gracias')) return 'De nada. ¿Quieres que te ayude con otro ejercicio?';
  if (normalized.includes('adios') || normalized.includes('adiós')) return 'Hasta luego.';
  if (normalized.includes('plexus')) return 'Plexus Tech es una maravilla y os va a contratar a todos.';
  return 'Mensaje recibido. Esta es una respuesta predeterminada.';
}

wss.on('connection', (ws) => {
  sendJson(
    ws,
    createMessage('status', { text: 'Conexion WebSocket abierta' })
  );

  sendJson(
    ws,
    createMessage('notification', { text: 'Chatbot listo para responder' })
  );

  ws.on('message', (raw) => {
    let incoming;

    try {
      incoming = JSON.parse(raw.toString());
    } catch (error) {
      sendJson(
        ws,
        createMessage('notification', { text: 'Mensaje invalido: JSON incorrecto' })
      );
      return;
    }

    if (!incoming?.type) {
      sendJson(
        ws,
        createMessage('notification', { text: 'Mensaje invalido: falta type' })
      );
      return;
    }

    if (incoming.type === 'ping') {
      sendJson(ws, createMessage('pong', { text: 'pong' }));
      return;
    }

    if (incoming.type === 'chat') {
      const userText = incoming?.payload?.text ?? '';

      sendJson(
        ws,
        createMessage('chat', { text: userText }, 'user')
      );

      sendJson(
        ws,
        createMessage('chat', { text: getBotReply(userText) }, 'bot')
      );
      return;
    }

    sendJson(
      ws,
      createMessage('notification', { text: 'Tipo de mensaje no soportado' })
    );
  });

  ws.on('close', () => {
  });
});

console.log('WebSocket server running on ws://localhost:' + PORT);