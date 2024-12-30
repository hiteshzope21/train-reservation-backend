const { initializeSeats } = require('../models/seat');

const setupSeats = async () => {
  try {
    await initializeSeats();
    console.log('Seats initialized successfully.');
  } catch (error) {
    console.error('Error initializing seats:', error.message);
  }
};

module.exports = setupSeats;
