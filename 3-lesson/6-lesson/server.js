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
let count = 0;

io.on('connection', (client) => {
    console.log(`Websocket connected ${client.id}`);
    count++;
    console.log(`count = ${count}`);
    client.emit('server-con', { count, id: client.id })
    client.broadcast.emit('server-con', { count, id: client.id })

    client.on('disconnect', () => {
        count--;
        console.log(`Websocket disconnected ${client.id}`);
        console.log(`count = ${count}`);
        client.broadcast.emit('server-discon', { count: count, id_dis: client.id })
    })

    client.on('client-msg', (data) => {
        client.broadcast.emit('server-msg', { msg: data.msg, id: client.id });
        client.emit('server-msg', { msg: data.msg, id: client.id })
    })

});

server.listen(port, host, () =>
    console.log(`Server running at http://${host}:${port}`)
);