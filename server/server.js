const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const initRoutes = require('./routes');
const { Order } = require('./models');
const cors = require('cors');
const cron = require('node-cron');
const { Op } = require('sequelize');


require('dotenv').config();

const sequelize = require('./config');

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());

// Enable CORS for Express routes
app.use(cors({
  origin: 'https://smokeplus.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

const server = http.createServer(app);

// Enable CORS for Socket.IO
const io = socketIO(server, {
  cors: {
    origin: 'https://smokeplus.onrender.com',
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

  socket.on('orderDelete', () => {
    io.emit('updateInbox')
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Post order with io emit
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

    io.emit('orderPost', newOrder);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Auto Delete Old Orders
cron.schedule('* * * * *', async () => {
  console.log('Running scheduled task to delete orders older than 1 hour...');

  try {
    // Calculate the timestamp 1 hour ago
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    // Delete orders equal to or older than 1 hour
    const deletedOrdersCount = await Order.destroy({
      where: {
        createdAt: {
          [Op.lte]: oneHourAgo,
        },
      },
    });

    console.log(`Scheduled task completed. Deleted ${deletedOrdersCount} orders.`);
    io.emit('orderDelete');

  } catch (error) {
    console.error('Error running scheduled task:', error);
  }
});

// Init routes
app.use('/api', initRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
