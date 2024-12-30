const express = require('express');
const { reserve, cancelReservation, getAllSeats } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/reserve', authMiddleware, reserve);
router.post('/cancel', authMiddleware, cancelReservation);
router.get('/get-seats', authMiddleware, getAllSeats);


module.exports = router;
