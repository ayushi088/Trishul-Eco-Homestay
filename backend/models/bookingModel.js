import path from 'url'
import { fileURLToPath } from 'url'
import pathLib from 'path'
import { readJSONFile, writeJSONFile } from '../utils/fileHelper.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = pathLib.dirname(__filename)
const DB_FILE = pathLib.join(__dirname, '../data/bookings.json')

class BookingModel {
  static async getAll() {
    return await readJSONFile(DB_FILE)
  }

  static async create(data) {
    const bookings = await this.getAll()

    if (!data.guestName || !data.guestEmail || !data.guestPhone || !data.checkIn || !data.checkOut) {
      throw new Error('Missing required booking parameters: guestName, guestEmail, guestPhone, checkIn, and checkOut are required')
    }

    const newBooking = {
      id: Math.random().toString(36).substring(2, 9),
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      homestayId: data.homestayId || '1',
      homestayName: data.homestayName || 'Mountain View Villa',
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: Number(data.guests) || 2,
      totalPrice: Number(data.totalPrice) || 2500,
      status: data.status || 'Confirmed',
      createdAt: new Date().toISOString()
    }

    bookings.push(newBooking)
    await writeJSONFile(DB_FILE, bookings)
    return newBooking
  }
}

export default BookingModel
