import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import path from 'path';
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);

mongoose.connect('mongodb://localhost/rocketsocket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, '..', 'public')));

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Socket', socket.id);
});

app.get('/', (request, response) => response.json({
  message: 'Hello world!',
}));

export { server, io };
