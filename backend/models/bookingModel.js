import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: { type: String, required: true },
  homestayId: { type: String, required: true },
  homestayName: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  guests: { type: Number, default: 2 },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now }
}, {
  id: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id
      return ret
    }
  }
})

const Booking = mongoose.model('Booking', bookingSchema)

class BookingModel {
  static async getAll() {
    return await Booking.find({}).sort({ createdAt: -1 })
  }

  static async create(data) {
    if (!data.guestName || !data.guestEmail || !data.guestPhone || !data.checkIn || !data.checkOut) {
      throw new Error('Missing required booking parameters: guestName, guestEmail, guestPhone, checkIn, and checkOut are required')
    }
    const id = data.id || Math.random().toString(36).substring(2, 9)
    const newBooking = new Booking({ _id: id, ...data })
    return await newBooking.save()
  }
}

export default BookingModel
