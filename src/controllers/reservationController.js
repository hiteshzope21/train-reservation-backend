const { getAvailableSeats, reserveSeats, resetSeats, getSeats} = require('../models/seat');

const reserve = async (req, res) => {
  try {
    const { userId } = req.user;
    const { seatsRequested } = req.body;

    if (seatsRequested < 1 || seatsRequested > 7)
      return res.status(400).json({ error: 'You can reserve between 1 to 7 seats' });

    const availableSeats = await getAvailableSeats();
    if (availableSeats.length < seatsRequested) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    let reservedSeats = [];
    let rowSeats = [];
    for (let seat of availableSeats) {
        const row = Math.ceil(seat.seat_number / 7);
        if (rowSeats[row]) rowSeats[row].push(seat);
        else rowSeats[row] = [seat];
    }

    for (let row of rowSeats) {
        if (row?.length >= seatsRequested) {
            reservedSeats = row.slice(0, seatsRequested);
            break;
        }
    }

    if (reservedSeats.length === 0) {
        reservedSeats = availableSeats.rows.slice(0, seatsRequested);
    }

    const seatNumbers = reservedSeats.map(seat => seat.seat_number);
    await reserveSeats(seatNumbers, userId);

    res.status(200).json({ message: 'Seats reserved successfully', seatNumbers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const cancelReservation = async (req, res) => {
  try {
    const seats = await getSeats()  

    res.status(200).json({ message: 'Seats cancelled successfully', seats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
};

const getAllSeats = async (req, res) => {
  try {
    const seats = await getSeats()

    res.status(200).json({ message: 'Seats fetched successfully', seats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
};

module.exports = { reserve, cancelReservation, getAllSeats };
