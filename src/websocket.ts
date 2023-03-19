import WebSocket from 'ws';

const socketUrl = 'ws://127.0.0.1:63733';
let ws: WebSocket;

export function startWebsocket() {
    ws = new WebSocket(socketUrl);
    
    ws.on('error', console.error);

    ws.on('open', function open() {
        ws.send('something');
    });

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
}