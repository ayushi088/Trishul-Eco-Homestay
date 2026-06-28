import express from 'express'
import { getBookings, createBooking } from '../controllers/bookingController.js'

const router = express.Router()

router.route('/')
  .get(getBookings)
  .post(createBooking)

export default router
