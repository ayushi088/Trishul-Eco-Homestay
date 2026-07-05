import mongoose from 'mongoose'

const homestaySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  guests: { type: Number, required: true },
  location: { type: String, required: true },
  availability: { type: String, default: 'AVAILABLE' },
  bedrooms: { type: Number, default: 2 },
  bathrooms: { type: Number, default: 1 },
  type: { type: String, required: true },
  amenities: [{ type: String }]
}, {
  id: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id
      return ret
    }
  }
})

const Homestay = mongoose.model('Homestay', homestaySchema)

class HomestayModel {
  static async getAll() {
    return await Homestay.find({})
  }

  static async getById(id) {
    return await Homestay.findById(id)
  }

  static async create(data) {
    const id = data.id || Math.random().toString(36).substring(2, 9)
    const newHomestay = new Homestay({ _id: id, ...data })
    return await newHomestay.save()
  }

  static async update(id, data) {
    return await Homestay.findByIdAndUpdate(id, data, { new: true })
  }

  static async delete(id) {
    const res = await Homestay.findByIdAndDelete(id)
    return !!res
  }

  static async search(query) {
    if (!query) return await Homestay.find({})
    const term = query.toLowerCase()
    return await Homestay.find({
      $or: [
        { title: { $regex: term, $options: 'i' } },
        { location: { $regex: term, $options: 'i' } },
        { type: { $regex: term, $options: 'i' } }
      ]
    })
  }
}

export default HomestayModel
