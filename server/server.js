const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const initRoutes = require('./routes');
const { Order } = require('./models');
const cors = require('cors');

require('dotenv').config();

const sequelize = require('./config');

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());

// Enable CORS for Express routes
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

const server = http.createServer(app);

// Enable CORS for Socket.IO
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('orderPost', (order) => {
    console.log('Order received:', order);

    io.emit('newOrder', order);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Order Post with IO
app.post('/api/orders', async (req, res) => {
  console.log("Posting!");
  console.log('Request Body:', req.body);

  const { id, userId, cart } = req.body;
  console.log("cart:", cart);
  try {
    const newOrder = await Order.create({
      id,
      user: userId,
      cart: JSON.stringify(cart),
    });

    // Emit a Socket.IO event when a new order is created
    console.log('emitting')
    io.emit('orderPost', newOrder);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Init routes
app.use('/api', initRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
