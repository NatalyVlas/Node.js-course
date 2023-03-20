import http from 'http';
import fs from 'fs';
import path from 'path';
import { Server } from 'socket.io';

const host = 'localhost';
const port = 3000;

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        const filePath = path.join(process.cwd(), 'index.html');
        const rs = fs.createReadStream(filePath);

        rs.pipe(response)
    }
});

const io = new Server(server);

io.on('connection', (client) => {
    console.log(`Websocket connected ${client.id}`, client.handshake);

    client.on('client-msg', (data) => {
        client.broadcast.emit('server-msg', { msg: data.msg });
        client.emit('server-msg', { msg: data.msg })
    })

});

server.listen(port, host, () =>
    console.log(`Server running at http://${host}:${port}`)
);