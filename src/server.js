require('dotenv').config();
const app = require('./app');
const setupSeats = require('./utils/initializeSeats');
const pool = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.connect();
    console.log('Database connected.');
    await setupSeats(); // Initialize seats on server start
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log({error  })
    console.error('Error starting server:', error.message);
  }
};

startServer();
