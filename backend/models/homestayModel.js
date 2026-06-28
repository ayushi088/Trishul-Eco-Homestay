import path from 'path'
import { fileURLToPath } from 'url'
import { readJSONFile, writeJSONFile } from '../utils/fileHelper.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_FILE = path.join(__dirname, '../data/homestays.json')

class HomestayModel {
  static async getAll() {
    return await readJSONFile(DB_FILE)
  }

  static async getById(id) {
    const homestays = await this.getAll()
    return homestays.find(h => h.id === id)
  }

  static async create(data) {
    const homestays = await this.getAll()

    // Validation checks
    if (!data.title || !data.location || !data.price || !data.guests || !data.type) {
      throw new Error('Missing required fields: title, location, price, guests, and type are required')
    }

    if (isNaN(data.price) || data.price <= 0) {
      throw new Error('Invalid price: price must be a number greater than 0')
    }

    if (isNaN(data.guests) || data.guests <= 0) {
      throw new Error('Invalid guests count: guests limit must be a positive number')
    }

    // Default values
    const newHomestay = {
      id: data.id || Math.random().toString(36).substring(2, 9),
      title: data.title,
      image: data.image || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      price: Number(data.price),
      rating: Number(data.rating) || 4.5,
      reviews: Number(data.reviews) || 0,
      guests: Number(data.guests),
      location: data.location,
      availability: data.availability || 'AVAILABLE',
      bedrooms: Number(data.bedrooms) || 2,
      bathrooms: Number(data.bathrooms) || 1,
      type: data.type,
      amenities: Array.isArray(data.amenities) ? data.amenities : []
    }

    homestays.push(newHomestay)
    await writeJSONFile(DB_FILE, homestays)
    return newHomestay
  }

  static async update(id, data) {
    const homestays = await this.getAll()
    const index = homestays.findIndex(h => h.id === id)
    
    if (index === -1) {
      return null
    }

    // Validate if fields are updated
    if (data.price && (isNaN(data.price) || data.price <= 0)) {
      throw new Error('Invalid price: price must be a number greater than 0')
    }
    if (data.guests && (isNaN(data.guests) || data.guests <= 0)) {
      throw new Error('Invalid guests count: guests limit must be a positive number')
    }

    const updated = {
      ...homestays[index],
      title: data.title !== undefined ? data.title : homestays[index].title,
      location: data.location !== undefined ? data.location : homestays[index].location,
      image: data.image !== undefined ? data.image : homestays[index].image,
      price: data.price !== undefined ? Number(data.price) : homestays[index].price,
      rating: data.rating !== undefined ? Number(data.rating) : homestays[index].rating,
      reviews: data.reviews !== undefined ? Number(data.reviews) : homestays[index].reviews,
      guests: data.guests !== undefined ? Number(data.guests) : homestays[index].guests,
      availability: data.availability !== undefined ? data.availability : homestays[index].availability,
      bedrooms: data.bedrooms !== undefined ? Number(data.bedrooms) : homestays[index].bedrooms,
      bathrooms: data.bathrooms !== undefined ? Number(data.bathrooms) : homestays[index].bathrooms,
      type: data.type !== undefined ? data.type : homestays[index].type,
      amenities: data.amenities !== undefined ? (Array.isArray(data.amenities) ? data.amenities : []) : homestays[index].amenities
    }

    homestays[index] = updated
    await writeJSONFile(DB_FILE, homestays)
    return updated
  }

  static async delete(id) {
    const homestays = await this.getAll()
    const exists = homestays.some(h => h.id === id)
    if (!exists) {
      return false
    }

    const filtered = homestays.filter(h => h.id !== id)
    await writeJSONFile(DB_FILE, filtered)
    return true
  }

  static async search(query) {
    const homestays = await this.getAll()
    if (!query) return homestays
    
    const term = query.toLowerCase()
    return homestays.filter(
      h =>
        h.title.toLowerCase().includes(term) ||
        h.location.toLowerCase().includes(term) ||
        h.type.toLowerCase().includes(term)
    )
  }
}

export default HomestayModel
