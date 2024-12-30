const pool = require('../config/db');

const initializeSeats = async () => {
  const totalSeats = 80;
  const query = 'INSERT INTO seats (seat_number, status) VALUES ($1, $2)';
  for (let i = 1; i <= totalSeats; i++) {
    await pool.query(query, [i, 'available']);
  }
};

const getAvailableSeats = async () => {
  const query = 'SELECT * FROM seats WHERE status = $1 ORDER BY seat_number';
  const result = await pool.query(query, ['available']);
  return result.rows;
};

const reserveSeats = async (seatNumbers, userId) => {
    const query = 'UPDATE seats SET status = $1, reserved_by = $2 WHERE seat_number = ANY($3)';
    await pool.query(query, ['reserved', userId, seatNumbers]);
};

const resetSeats = async () => {
    const query = 'UPDATE seats SET status = $1, reserved_by = $2';
    await pool.query(query, ['available', null]);
};

const getSeats = async () => {
  const query = 'SELECT * FROM seats';
  const result =  await pool.query(query);
  return result.rows; 
};

module.exports = { initializeSeats, getAvailableSeats, reserveSeats, resetSeats, getSeats};
