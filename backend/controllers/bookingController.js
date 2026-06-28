import BookingModel from '../models/bookingModel.js'

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public (Simulated Host/Admin)
export async function getBookings(req, res, next) {
  try {
    const bookings = await BookingModel.getAll()
    res.status(200).json(bookings)
  } catch (error) {
    next(error)
  }
}

// @desc    Create a new booking reservation
// @route   POST /api/bookings
// @access  Public
export async function createBooking(req, res, next) {
  try {
    const { guestName, guestEmail, guestPhone, homestayId, homestayName, checkIn, checkOut, guests, totalPrice } = req.body
    
    const newBooking = await BookingModel.create({
      guestName,
      guestEmail,
      guestPhone,
      homestayId,
      homestayName,
      checkIn,
      checkOut,
      guests,
      totalPrice
    })

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    })
  } catch (error) {
    res.status(400)
    next(error)
  }
}
