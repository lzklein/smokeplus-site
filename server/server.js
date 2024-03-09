const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const initRoutes = require('./routes');
const { Order } = require('./models');
const cors = require('cors');
const cron = require('node-cron');
const { Op } = require('sequelize');
const fs = require('fs');
const { Storage } = require('megajs');

require('dotenv').config();

const sequelize = require('./config');

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());

// mega info
const megaEmail = process.env.MEGA_EMAIL;
const megaPassword = process.env.MEGA_PASSWORD;
const backupPath = './mydatabase.db';

const megaBackup = async () => {
  try {
    const storage = await new Storage({
      email: megaEmail,
      password: megaPassword,
    }).ready;

    const timestamp = new Date().toISOString().replace(/[-T:]/g, '').split('.')[0];
    const newFileName = `mydatabase_${timestamp}.db`;

    const fileContent = fs.readFileSync(backupPath);
    const uploadBackup = await storage.upload(newFileName, fileContent).complete;

    console.log('File upload successful');
  } catch (error) {
    console.error('Error in upload:', error);
  }
};


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
  console.log("Posting order!");
  // console.log('Request Body:', req.body);

  const { order, name } = req.body;
  const { cart } = order;
  const cartString = JSON.stringify(cart)

  const randomNumberGenerator = () => {
    const characters = '1234567890';
    let result = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return parseInt(result);
  }

  let id;
  let isUniqueId = false;

  while (!isUniqueId) {
    id = randomNumberGenerator();

    // Check if the generated id is unique
    const existingOrder = await Order.findOne({ where: { id } });

    if (!existingOrder) {
      isUniqueId = true;
    }
  }

  try {
    const newOrder = await Order.create({
      id: id,
      user: name,
      cart: cartString,
    }); 
    console.log(newOrder.toString());

    io.emit('orderPost', newOrder);

    // Send the created order back in the response
    res.status(201).json({ order: newOrder });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Auto Delete Old Orders every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Running scheduled task to delete orders older than or equal to 1 hour...');

  try {
    // Calculate the timestamp 1 hour ago
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    // Delete orders older than or equal to 1 hour
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

// auto backup
cron.schedule('0 0 * * 0', () => {
  console.log('Backing up database...');
  megaBackup();
});

// manual backup
router.post('/mega-backup', async (req, res) => {
  console.log('manual backup starting!')
  try {
    await megaBackup();
    res.json({ message: 'Mega backup initiated successfully' });
  } catch (error) {
    console.error('Error in mega backup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Init routes
app.use('/api', initRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
