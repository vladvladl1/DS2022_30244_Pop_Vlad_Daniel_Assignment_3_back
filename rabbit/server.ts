const WebSocket1 = require('ws');
const wws = new WebSocket1.Server({port:8081})

wws.on('connection',(ws) => {
    console.log('a new conectiioon')
    ws.send(1);
})