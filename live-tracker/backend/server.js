// backend/server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// simple in-memory store for connected employees
const employees = {}; // { socketId: { userId, name, lat, lng, ts } }

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('employee:login', ({ userId, name }) => {
    // attach user info to socket
    socket.data.userId = userId;
    socket.data.name = name;
    employees[socket.id] = { userId, name, lat: null, lng: null, ts: null };
    // notify admins about new user (initial)
    io.emit('admin:update', Object.values(employees));
    console.log('employee logged in', name, userId);
  });

  socket.on('employee:location', (payload) => {
    // payload: { lat, lng, ts }
    if (!socket.data.userId) return;
    employees[socket.id] = {
      userId: socket.data.userId,
      name: socket.data.name,
      lat: payload.lat,
      lng: payload.lng,
      ts: payload.ts
    };
    // emit to admins (or to all)
    io.emit('admin:update', Object.values(employees));
  });

  socket.on('disconnect', () => {
    console.log('disconnect', socket.id);
    delete employees[socket.id];
    io.emit('admin:update', Object.values(employees));
  });
});

// simple mock login endpoint
app.post('/login', (req, res) => {
  const { userId, name } = req.body;
  if (!userId || !name) return res.status(400).json({ error: 'userId & name required' });
  // normally create token; here return ok
  return res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
